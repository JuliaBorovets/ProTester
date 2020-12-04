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


import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {PendingPasswordComponent} from './components/pending-password/pending-password.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {TokenExpiredComponent} from './components/token-expired/token-expired.component';
import {ManageActionComponent} from './components/manage-action/manage-action.component';
import {ActionsListComponent} from './actions/actions-list/actions-list.component';
import {ActionUpdateComponent} from './actions/action-update/action-update.component';
import { TestCaseUpdateComponent } from './test-case/test-case-update/test-case-update.component';
import {TestCaseCreateComponent} from './test-case/test-case-create/test-case-create.component';
import {TestCaseListComponent} from './test-case/test-case-list/test-case-list.component';
import {ProjectMenuComponent} from "./components/project/project-menu/project-menu.component";
import {ProjectCreateComponent} from "./components/project/project-create/project-create.component";
import {ProjectListComponent} from "./components/project/project-list/project-list.component";
import {ProjectUpdateComponent} from "./components/project/project-update/project-update.component";

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
    ManageActionComponent,
    TestCaseListComponent,
    ActionsListComponent,
    ActionUpdateComponent,
    TestCaseUpdateComponent,
    TestCaseCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule {
}
