import {Injectable, OnInit} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService, SocialUser} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

  private async isLoggedIn(): Promise<boolean> {
    const user = await this.authService.authState;
    console.log('logged in user? ' + user.id);
    return user != null;
  }
}
