import { Injectable } from '@angular/core';
import { SSOService } from './sso-service';
import { GoogleAuthService } from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;
import { first, map } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgGapiSsoService implements SSOService {
  private static SESSION_STORAGE_KEY = 'google-accessToken';
  private static EMAIL_STORAGE_KEY = 'google-email';
  private static NAME_STORAGE_KEY = 'google-name';
  private static IMAGE_URL_STORAGE_KEY = 'google-imageUrl';

  private authenticatedUsers: ReplaySubject<GoogleUser> = new ReplaySubject(1);

  constructor(private googleAuth: GoogleAuthService) {
    this.googleAuth.getAuth().subscribe(auth => this.authenticatedUsers.next(auth.currentUser.get()));
  }

  public get isSignedIn(): boolean {
    return sessionStorage.getItem(NgGapiSsoService.SESSION_STORAGE_KEY) != null;
  }

  public get name(): string {
    return sessionStorage.getItem(NgGapiSsoService.NAME_STORAGE_KEY);
  }

  public get email(): string {
    return sessionStorage.getItem(NgGapiSsoService.EMAIL_STORAGE_KEY);
  }

  public get imageUrl(): string {
    return sessionStorage.getItem(NgGapiSsoService.IMAGE_URL_STORAGE_KEY);
  }

  public signIn(): Promise<boolean> {
    return this.googleAuth.getAuth().pipe(map(auth => {
      return auth.signIn().then((signedInUser: GoogleUser) => {
        this.authenticatedUsers.next(signedInUser);

        sessionStorage.setItem(
          NgGapiSsoService.SESSION_STORAGE_KEY, signedInUser.getAuthResponse().access_token
        );

        sessionStorage.setItem(
          NgGapiSsoService.NAME_STORAGE_KEY, signedInUser.getBasicProfile().getName()
        );

        sessionStorage.setItem(
          NgGapiSsoService.EMAIL_STORAGE_KEY, signedInUser.getBasicProfile().getEmail()
        );

        sessionStorage.setItem(
          NgGapiSsoService.IMAGE_URL_STORAGE_KEY, signedInUser.getBasicProfile().getImageUrl()
        );

        return true;
      });
    })).toPromise();
  }

  public signOut(): Promise<boolean> {
    return this.googleAuth.getAuth().pipe(map(auth => {
      const result = auth.signOut();
      if (result) {
        sessionStorage.removeItem(NgGapiSsoService.SESSION_STORAGE_KEY);
      }

      return result;
    })).toPromise();
  }
}
