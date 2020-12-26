import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from "./compound-search/compound-search.component";
import {ViewComponent} from "./compound-view/compound-view.component";
import {CreateComponent} from "./compound-new/compound-new.component";
import {CompoundEditComponent} from "./compound-edit/compound-edit.component";
import {EditableColumn} from "primeng/table";

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Compounds'
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        component: SearchComponent
      },
      {
        path: 'new',
        data: {
          breadcrumb: 'Create'
        },
        component: CreateComponent
      },
      {
        path: ':id',
        data: {
          breadcrumb: null
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: 'Compound'
            },
            component: ViewComponent
          },
              {
                path: 'edit',
                data: {
                  breadcrumb: 'Edit'
                },
                component: CompoundEditComponent
              }
            ]


      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompoundsRoutingModule { }
