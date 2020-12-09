import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ActionsListComponent} from '../../actions/actions-list/actions-list.component';
import {TestCaseService} from '../../services/test-case/test-case-service';
import {StorageService} from '../../services/auth/storage.service';
import {TestCaseListComponent} from "../test-case-list/test-case-list.component";
import {TestScenario} from "../../models/test-scenario";
import {TestScenarioService} from "../../services/test-scenario/test-scenario-service";
import {DataSetResponse} from "../../models/data-set-response";

@Component({
  selector: 'app-test-case-update',
  templateUrl: './test-case-update.component.html',
  styleUrls: ['./test-case-update.component.css']
})
export class TestCaseUpdateComponent implements OnInit {
  testCaseUpdateForm: FormGroup;
  testScenario: TestScenario[] = [];
  dataSet: DataSetResponse[] = [];
  scenarioId: number;
  testCaseId: number;
  errorMessage = '';
  submitted = false;
  isSuccessful = false;
  isFailed = false;
  private subscription: Subscription;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private testCaseService: TestCaseService,
              private testScenarioService: TestScenarioService,
              private dialogRef: MatDialogRef<TestCaseListComponent>,
              private storageService: StorageService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.testCaseId = data.id;
  }
  ngOnInit(): void {
    this.testScenarioService.getAll().subscribe( data =>
      data.forEach( elem => this.testScenario.push(elem)));
    this.createTestCaseUpdateForm();
    this.subscription = this.testCaseService.getFilterById(this.testCaseId).subscribe(
      data => {
        console.log(`Changing data` + data.dataSetResponseList.toString());
        this.testCaseUpdateForm.setValue(data);
      },
      error => {
        console.log(error);
        this.isFailed = true;
        this.errorMessage = error;
      });
  }
  get f() {
    return this.testCaseUpdateForm.controls;
  }

  createTestCaseUpdateForm(): void {
    this.testCaseUpdateForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      projectId: [''],
      authorId: [''],
      scenarioId: ['']
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.testCaseUpdateForm.invalid) {
      return;
    }

    console.log('valid');

    const testCaseUpdateResponse = {
      id: this.testCaseId,
      description: this.f.description.value,
      name: this.f.name.value,
      scenarioId: this.f.scenarioId.value,
      projectId: this.f.projectId.value,
      authorId: this.storageService.getUser.id,
      dataSetResponseList: this.f.dataSetResponseList.value
    };


    this.subscription = this.testCaseService.update(testCaseUpdateResponse)
      .subscribe(
        data => {
          this.isSuccessful = true;
          this.dialogRef.close();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isFailed = true;
        }
      );
  }
}
