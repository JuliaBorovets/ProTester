import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {StorageService} from "../../services/auth/storage.service";
import {AuthService} from "../../services/auth/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  image = 'assets/logo.png';
  isWhiteTheme = true;
  user: User;
  subscription: Subscription;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) {
    this.subscription = this.storageService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {

  }

  changeTheme(): void {
    this.isWhiteTheme = !this.isWhiteTheme;
    //change theme
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login').then();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
