import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { SSOService } from '../sso/sso-service';
import { SSOServiceProvider } from '../sso/sso.module';
import { first, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(@Inject(SSOServiceProvider) private ssoService: SSOService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Tap triggers the side effect if no user is authenticated.
    // Map returns the proper boolean value if email is set or not.
    // First() is necessary because guards need the obeservable to be completed before it can route.
    return this.ssoService.signedInWithEmail$.pipe(first(), tap((email: string) => {
        if (email === null) {
          this.router.navigate(['login']);
        }
      }
    ), map((email: string) => email != null));
  }
}
