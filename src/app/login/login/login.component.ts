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

  ngOnInit(): void {
    if (this.signInIfNecessary()) {
      this.router.navigate(['']);
    }
  }

  async signInIfNecessary(): Promise<boolean> {
    const isLoggedIn = await this.ssoService.isSignedIn$;
    if (isLoggedIn) {
      return true;
    }

    return await this.ssoService.signIn();
  }
}
