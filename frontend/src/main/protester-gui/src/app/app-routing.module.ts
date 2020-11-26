import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuard} from "./services/auth/auth.guard";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {PendingPasswordComponent} from "./components/pending-password/pending-password.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {TokenExpiredComponent} from "./components/token-expired/token-expired.component";
import {LibraryMenuComponent} from "./components/library-menu/library-menu.component";
import {LibraryNewComponent} from "./components/library-new/library-new.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
    // canActivate: [AuthGuard],
    // data: {
    //   roles: ['ADMIN']
    // }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN', 'MANAGER', 'ENGINEER']
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'pending-password',
    component: PendingPasswordComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'token-expired',
    component: TokenExpiredComponent
  },
  {
    path: 'library',
    component: LibraryMenuComponent
  },
  {
    path: 'library/new_library',
    component: LibraryNewComponent
  },

  {path: '', redirectTo: 'login', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
