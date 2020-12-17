import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {AuthInterceptor} from "./services/auth/auth.interceptor";
import {MatIconRegistry} from '@angular/material/icon';
import {MaterialModule} from "./services/material.module";
import {HeaderComponent} from './components/header/header.component';
import {ProfileComponent} from './components/profile/profile.component';
import {UsersListComponent} from './components/users-list/users-list.component';
import {ActionsListComponent} from "./actions/actions-list/actions-list.component";
import {ActionUpdateComponent} from "./actions/action-update/action-update.component";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {ViewUserComponent} from "./components/view-user/view-user.component";
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TestCaseAnalyzeModule} from './test-case-analyze/test-case-analyze.module';
import {ScrollingModule} from "@angular/cdk/scrolling";
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import {
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS
} from "@angular/material/bottom-sheet";
import {MatTabsModule} from "@angular/material/tabs";
import { CompoundSearchComponent } from './components/compound-search/compound-search.component';
import { CompoundNewComponent } from './components/compound-new/compound-new.component';
import {SharedModule} from "./shared/shared.module";
import {ProjectsMenuModule} from "./projects-menu/projects-menu.module";
import {LibrariesMenuModule} from "./libraries-menu/libraries-menu.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    ActionsListComponent,
    ActionUpdateComponent,
    UsersListComponent,
    ViewUserComponent,
    EditUserComponent,
    ViewUserComponent,
    EditUserComponent,
    BottomSheetComponent,
    CompoundSearchComponent,
    CompoundNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMatSelectSearchModule,
    MatCheckboxModule,
    TestCaseAnalyzeModule,
    NgxMatSelectSearchModule,
    ScrollingModule,
    MatTabsModule,
    SharedModule,
    ProjectsMenuModule,
    LibrariesMenuModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}} , MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule {
}
