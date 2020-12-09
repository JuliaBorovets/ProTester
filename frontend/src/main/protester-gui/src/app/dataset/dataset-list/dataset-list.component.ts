import {Subscription} from "rxjs";
import { Component, OnDestroy, OnInit } from '@angular/core';
import {DataSet} from "../dataset.model";
import {PageEvent} from "@angular/material/paginator";
import {DatasetService} from "../../services/dataset.service";
import {Router} from "@angular/router";
import {StorageService} from "../../services/auth/storage.service";
import {MatDialog} from "@angular/material/dialog";
import {DataSetFilterModel} from "../dataset-filter.model";
import {DatasetEditComponent} from "../dataset-edit/dataset-edit.component";

@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.css']
})
export class DatasetListComponent implements OnInit, OnDestroy {

  dataSource: DataSet[];
  pageEvent: PageEvent;

  datasetFilter: DataSetFilterModel = new DataSetFilterModel();
  datasetsCount = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  displayedColumns: string[] = ['NAME', 'DESCRIPTION', 'CONF'];
  private subscription: Subscription;

  constructor(private datasetService: DatasetService,
              private router: Router,
              private storageService: StorageService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.searchDataset();
  }

  searchDataset(): void {
    this.subscription = this.datasetService.getAll(this.datasetFilter).subscribe(
      data => {
        this.dataSource = data.list;
        this.datasetsCount = data.totalItems;
      },
      error => console.log('error in initDataSource')
    );
  }

  onPaginateChange(event: PageEvent): void {
    this.datasetFilter.pageNumber = event.pageIndex;
    this.datasetFilter.pageSize = event.pageSize;
    this.datasetFilter.pageNumber = this.datasetFilter.pageNumber + 1;

    this.searchDataset();
  }

  onFilterChange(event: any): void {
    this.searchDataset();
  }

  openEditDialog(id: number): void {
    const editDialogRef = this.dialog.open(DatasetEditComponent, {
      height: 'auto',
      width: '50%',
      data: {id: id}
    });

    this.subscription = editDialogRef.afterClosed().subscribe( () => {
      this.searchDataset();
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
