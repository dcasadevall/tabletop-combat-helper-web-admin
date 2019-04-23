import { Component, Inject, OnInit } from '@angular/core';
import { SSOService } from '../../sso/sso-service';
import { SSOServiceProvider } from '../../sso/sso.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ``,
  styles: []
})
export class LogoutComponent implements OnInit {
  constructor(@Inject(SSOServiceProvider) private ssoService: SSOService, private router: Router) { }

  public ngOnInit(): void {
    this.logout();
  }

  private logout(): void {
    if (this.ssoService.signOut()) {
      this.router.navigate(['login']);
    }
  }
}
