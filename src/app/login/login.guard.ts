import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { SSOService } from '../sso/sso-service';
import { SSOServiceProvider } from '../sso/sso.module';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(@Inject(SSOServiceProvider) private ssoService: SSOService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.ssoService.isLoggedIn$) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
