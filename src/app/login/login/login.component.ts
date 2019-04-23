import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SSOService } from '../../sso/sso-service';
import { SSOServiceProvider } from '../../sso/sso.module';

@Component({
  selector: 'app-login-page',
  template: ``,
  styleUrls: []
})
export class LoginComponent implements OnInit {
  constructor(@Inject(SSOServiceProvider) private ssoService: SSOService, private router: Router) {
  }

  public ngOnInit(): void {
    if (this.ssoService.isSignedIn) {
      this.router.navigate(['']);
      return;
    }

    this.ssoService.signIn().then(success => {
      if (success) {
        this.router.navigate(['']);
      }
    });
  }
}
