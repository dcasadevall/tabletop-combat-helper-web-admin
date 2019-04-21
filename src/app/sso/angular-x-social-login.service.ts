import { SSOService } from './sso-service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SSOModule } from './sso.module';

@Injectable({
  providedIn: SSOModule
})
export class AngularXSocialLoginService implements SSOService {
  constructor(private authService: AuthService) { }

  get email$(): Promise<string> {
    return this.authService.authState.pipe(map(user => {
      return user != null ? user.email : null;
    })).toPromise();
  }

  get isLoggedIn$(): Promise<boolean> {
    return this.authService.authState.pipe(map(user => {
      return user != null;
    })).toPromise();
  }

  public signIn(): Promise<boolean> {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      return user != null;
    });
  }

  public signOut(): Promise<boolean> {
    return this.authService.signOut();
  }
}
