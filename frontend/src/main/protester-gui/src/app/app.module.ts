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
import { LibraryMenuComponent } from './components/library-menu/library-menu.component';
import { LibraryNewComponent } from './components/library-new/library-new.component';

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
    LibraryMenuComponent,
    LibraryNewComponent
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
