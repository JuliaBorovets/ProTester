import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompoundsRoutingModule } from './compounds-routing.module';
import { CreateComponent } from "./compound-new/compound-new.component";
import { SearchComponent } from "./compound-search/compound-search.component";
import { ViewComponent } from "./compound-view/compound-view.component";
import { MaterialModule } from "../../../services/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CreateComponent,
    SearchComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    CompoundsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CompoundsModule { }
