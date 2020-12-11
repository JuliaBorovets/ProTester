import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegistrationComponent} from "./components/registration/registration.component";
import {LoginComponent} from "./components/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {AuthInterceptor} from "./services/auth/auth.interceptor";
import {MatIconRegistry} from '@angular/material/icon';
import {MaterialModule} from "./services/material.module";
import {HeaderComponent} from './components/header/header.component';
import {ProfileComponent} from './components/profile/profile.component';

import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PendingPasswordComponent } from './components/pending-password/pending-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TokenExpiredComponent } from './components/token-expired/token-expired.component';
import {ProjectMenuComponent} from './components/project/project-menu/project-menu.component';
import {ProjectCreateComponent} from './components/project/project-create/project-create.component';
import {ProjectListComponent} from './components/project/project-list/project-list.component';
import {ProjectUpdateComponent} from './components/project/project-update/project-update.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import {ActionsListComponent} from "./actions/actions-list/actions-list.component";
import {ActionUpdateComponent} from "./actions/action-update/action-update.component";
import {TestCaseListComponent} from "./test-case/test-case-list/test-case-list.component";
import {TestCaseUpdateComponent} from "./test-case/test-case-update/test-case-update.component";
import {TestCaseCreateComponent} from "./test-case/test-case-create/test-case-create.component";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { LibraryMenuComponent } from './components/library-menu/library-menu.component';
import { LibraryNewComponent } from './components/library-new/library-new.component';
import { LibrarySearchComponent } from './components/library-search/library-search.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import {
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS
} from "@angular/material/bottom-sheet";
import {MatTabsModule} from "@angular/material/tabs";
import { CompoundSearchComponent } from './components/compound-search/compound-search.component';
import { LibraryEditComponent } from './components/library-edit/library-edit.component';
import { LibraryViewComponent } from './components/library-view/library-view.component';
import { CompoundNewComponent } from './components/compound-new/compound-new.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HeaderComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    PendingPasswordComponent,
    ChangePasswordComponent,
    TokenExpiredComponent,
    ProjectMenuComponent,
    ProjectCreateComponent,
    ProjectListComponent,
    ProjectUpdateComponent,
    ActionsListComponent,
    ActionUpdateComponent,
    UsersListComponent,
    TestCaseListComponent,
    TestCaseUpdateComponent,
    TestCaseCreateComponent,
    LibraryMenuComponent,
    LibraryNewComponent,
    LibrarySearchComponent,
    BottomSheetComponent,
    CompoundSearchComponent,
    LibraryEditComponent,
    LibraryViewComponent,
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
    ScrollingModule,
    MatTabsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}} , MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule {
}
