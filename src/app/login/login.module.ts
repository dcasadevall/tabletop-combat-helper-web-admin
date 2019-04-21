import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SocialLoginModule } from 'angularx-social-login';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    SocialLoginModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
