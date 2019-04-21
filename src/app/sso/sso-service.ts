import { Injectable } from '@angular/core';
import { SSOModule } from './sso.module';
import { AngularXSocialLoginService } from './angular-x-social-login.service';

@Injectable({providedIn: SSOModule, useClass: AngularXSocialLoginService})
export interface SSOService {
  /**
   * If true, the user has signed in with one of the SSO authentication mechanisms.
   */
  isLoggedIn$: Promise<boolean>;
  /**
   * The email associated with the SSO mechanism used to sign in. This is null if the user has not yet signed in.
   */
  email$: Promise<string>;

  /**
   * Attempts to sign in with the default SSO provider (currently the only implementation of this interface
   * only uses Google).
   */
  signIn(): Promise<boolean>;

  /**
   * Signs out with the currently signed in provider. Returns true if successfully signed out.
   */
  signOut(): Promise<boolean>;
}
