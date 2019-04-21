import { Component, Inject, OnInit } from '@angular/core';
import { SSOService } from '../../sso/sso-service';
import { SSOServiceProvider } from '../../sso/sso.module';

@Component({
  selector: 'app-logout',
  template: ``,
  styles: []
})
export class LogoutComponent implements OnInit {
  constructor(@Inject(SSOServiceProvider) private ssoService: SSOService) { }

  public ngOnInit(): void {
    this.logout();
  }

  private logout(): void {
    this.ssoService.signOut();
  }
}
