import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {BottomSheetComponent} from "../bottom-sheet/bottom-sheet.component";
import {LibraryBottomsheetInteractionService} from "../../services/library/library-bottomsheet-interaction.service";
import {Subscription} from "rxjs";
import {Step} from "../../models/step.model";
import {Router} from "@angular/router";
import {CompoundManageService} from "../../services/compound-manage.service";
import {StepRepresentation} from "../../models/StepRepresentation";

@Component({
  selector: 'app-library-new',
  templateUrl: './compound-new.component.html',
  styleUrls: ['./compound-new.component.css']
})

export class CompoundNewComponent implements OnInit {
  validatorsConfig = {
    name: {
      minLength: 5,
      maxLength: 15
    },
    description: {
      maxLength: 200
    }
  }

  private actionSubscription: Subscription;
  private compoundSubscription: Subscription;
  compoundCreateForm: FormGroup;

  components: Step[] = [];
  step_id: number = 1;
  bottomSheetData = {};
  componentCtx = {
    components: this.components
  }
  url = "";
  clickInput = true;
  temporaryParams = {};

  componentParamsForm: FormGroup;
  compoundCreateRequest = {};

  constructor(
    private formBuilder: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    private compoundService: CompoundManageService,
    private interactionService: LibraryBottomsheetInteractionService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getAllActionsForBottomSheet();
    this.getAllCompoundsForBottomSheet();
    this.updateActionsArray();
    this.updateCompoundsArray();
  }

  createForm(): void {
    this.compoundCreateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(this.validatorsConfig.name.minLength), Validators.maxLength(this.validatorsConfig.name.maxLength)]],
      description: ['', [Validators.required, Validators.maxLength(this.validatorsConfig.description.maxLength)]]
    })
  }

  getComponentsOfSteps(steps) {
    return {array: steps.map(step => step.component)};
  }

  getStepId(step) {
    return step.component.name + '-' + step.id;
  }

  onFilterKeyboard(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
  }

  checkIfParamInterpolated(param: string) {
    if (typeof param !== "undefined" || param !== null) {
    const regex = '${';
    return param.includes(regex);
    }
    else {
      return;
    }
  }

  cleanParam(param: string) {
    let new_param = param.slice(2, param.length - 1);
    return new_param;
  }

  parseDescription(description: string) {
    const regexp = new RegExp('(\\${\\w*})');
    let splitted = description.split(regexp);
    return splitted.map(sub_string => {
      if (sub_string.includes("${")) {
        return {
          text: sub_string.replace('${', '').replace('}', ''),
          input: true
        }
      } else {
        return {
          text: sub_string,
          input: false
        }
      }
    })
  }

  onSubmit(): void {
    const f = this.formControls;

    if (this.compoundCreateForm.invalid) {
      return;
    }

    if (this.components.length === 0) {
      console.error("Set action or compound");
      return;
    }

    this.compoundCreateRequest['description'] = f.description.value;
    this.compoundCreateRequest['name'] = f.name.value;
    this.compoundCreateRequest['steps'] = this.components.map(item => {
      const step: StepRepresentation = {
        id: item.component.id,
        action: item.isAction,
        parameters: item.parameters
      }
      return step;
    });

    this.compoundService.createCompound(this.compoundCreateRequest).subscribe(() => {
        this.router.navigateByUrl('/compound').then();
      },
      () => {
        console.error("Error of creation");
      })
  }

  get formControls() {
    return this.compoundCreateForm.controls;
  }

  updateActionsArray(): void {
    this.actionSubscription = this.interactionService.actionsArrayObserver.subscribe(action => {
      this.componentPrepare(action);
    });
  }

  updateCompoundsArray(): void {
    this.compoundSubscription = this.interactionService.compoundArrayObserver.subscribe(compound => {
      this.componentPrepare(compound);
    });
  }

  componentPrepare(component) {
    let step = new Step();

    step.id = this.step_id++;
    step.isAction = component.type !== 'COMPOUND';
    step.component = component;
    step.parameters = new Map<String, String>();

    component.parameterNames.map(param => {
      step.parameters[param] = "";
    });

    component.parameterNames.forEach(param => {
      this.compoundCreateForm.addControl(step.id + '-' + param, new FormControl('', Validators.required));
    });

    if (component.steps) {
      this.recursiveStepParsing(component.steps);
    }

    console.log(component);

    this.components.push(step);

  }


  // "id": "link_id"
  recursiveStepParsing(steps) {
    steps.forEach(item => {
      item.component.description = this.parseDescription(item.component.description);
      if (Object.keys(item.parameters).length > 0) {
        for (let [key, value] of Object.entries(item.parameters)) {
          if (!this.checkIfParamInterpolated(value.toString())) {
            this.temporaryParams[key] = value;
          }
          else {
            let param = this.cleanParam(value.toString());
            if (this.temporaryParams[param]) {
              item.parameters[key] = this.temporaryParams[param]
            }
          }
        }
      }

      if (item.component.steps) {
        this.recursiveStepParsing(item.component.steps);
      }
    })
  }

  deleteComponentFromArray(components, id): void {
    components.find((component, index, components) => {
      if (component.id === id) {
        components.splice(index, 1);
      }
    })
  }

  getParamFieldFromComponent(param, id) {
    return this.components.find((step) => {
      if (step.id === id) {
        return step.parameters[param];
      }
    })
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent, {
      data: {components: this.bottomSheetData}
    });
  }

  getAllActionsForBottomSheet(): void {
    this.compoundService.getAllActions().subscribe(data => {
      data['list'].forEach(item => {
        item.description = this.parseDescription(item.description);
      })
      this.bottomSheetData['actions'] = data['list'];
    });
  }

  getAllCompoundsForBottomSheet(): void {
    this.compoundService.getAllCompounds().subscribe(data => {
      data['list'].forEach(item => {
        item.description = this.parseDescription(item.description);
      })
      this.bottomSheetData['compounds'] = data['list'];
    });
  }

  ngOnDestroy(): void {
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
    if (this.compoundSubscription) {
      this.compoundSubscription.unsubscribe();
    }
  }

}
