import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {StorageService} from "../../services/auth/storage.service";
import {TestCaseService} from "../../services/test-case/test-case-service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataSetResponse} from "../../models/data-set-response";
import {TestScenario} from "../../models/test-scenario";
import {TestScenarioService} from "../../services/test-scenario/test-scenario-service";
import {TestCaseListComponent} from "../test-case-list/test-case-list.component";

@Component({
  selector: 'app-test-case-create',
  templateUrl: './test-case-create.component.html',
  styleUrls: ['./test-case-create.component.css']
})
export class TestCaseCreateComponent implements OnInit, OnDestroy {

  projectId: number;
  testCaseForm: FormGroup;
  errorMessage = '';
  submitted = false;
  isSuccessful = false;
  isFailed = false;
  testScenario: TestScenario[] = [];
  dataSet: DataSetResponse[] = [];
  private subscription: Subscription;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private storageService: StorageService,
              private testCaseService: TestCaseService,
              private dialogRef: MatDialogRef<TestCaseListComponent>,
              private testScenarioService: TestScenarioService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.projectId = data.id;
    console.log(`project id = ${this.projectId}`);
  }

  ngOnInit(): void {
    this.testCaseService.getAllDataSets().subscribe( data => {
        this.dataSet = data.list;
      }
    );
    this.testScenarioService.getAll().subscribe( data =>
      {
        this.testScenario = data.list; }
    );
    this.createTestCaseCreateForm();
  }

  get f() {
    return this.testCaseForm.controls;
  }

  createTestCaseCreateForm(): void {
    this.testCaseForm = this.formBuilder.group({
      name: [null, Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(50)])
      ],
      description: [null, Validators.compose([
        Validators.required
      ])],
      scenarioId: [null, Validators.compose([
        Validators.required
      ])],
      dataSetResponse: [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.testCaseForm.invalid) {
      return;
    }

    const testCaseCreateResponse = {
      name: this.f.name.value,
      projectId: this.projectId,
      description: this.f.description.value,
      scenarioId: this.f.scenarioId.value,
      authorId: this.storageService.getUser.id,
      dataSetId: this.f.dataSetResponse.value
    };

    this.subscription = this.testCaseService.create(testCaseCreateResponse)
      .subscribe(
        data => {
          this.isSuccessful = true;
          this.dialogRef.close();
          this.router.navigateByUrl(`/test-case-list/${this.projectId}`).then();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isFailed = true;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
