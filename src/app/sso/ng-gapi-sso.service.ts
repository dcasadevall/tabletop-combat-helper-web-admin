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
  private authenticatedUsers: ReplaySubject<GoogleUser> = new ReplaySubject(1);

  constructor(private googleAuth: GoogleAuthService) {
    this.googleAuth.getAuth().subscribe(auth => this.authenticatedUsers.next(auth.currentUser.get()));
  }

  public get isSignedIn(): boolean {
    return sessionStorage.getItem(NgGapiSsoService.SESSION_STORAGE_KEY) != null;
  }

  public get signedInWithEmail$(): Observable<string> {
    return this.authenticatedUsers.pipe(first(), map(user => NgGapiSsoService.getEmail(user)));
  }

  private static getEmail(user: GoogleUser): string {
    if (user == null) {
      return null;
    }

    if (user.getBasicProfile() == null) {
      return null;
    }

    return user.getBasicProfile().getEmail();
  }

  public signIn(): Promise<boolean> {
    return this.googleAuth.getAuth().pipe(map(auth => {
      return auth.signIn().then((signedInUser: GoogleUser) => {
        this.authenticatedUsers.next(signedInUser);

        sessionStorage.setItem(
          NgGapiSsoService.SESSION_STORAGE_KEY, signedInUser.getAuthResponse().access_token
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
