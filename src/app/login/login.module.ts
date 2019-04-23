import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SSOModule } from '../sso/sso.module';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    SSOModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
