import { Component, OnInit } from '@angular/core';
import {AuthService, GoogleLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-logout',
  template: ``,
  styles: []
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.authService.signOut();
  }
}
