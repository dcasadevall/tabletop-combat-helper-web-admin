import {Component, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  template: ``,
  styleUrls: []
})
export class LoginComponent implements OnInit {
  private user: Promise<SocialUser>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log('init');
    this.user = this.signInIfNecessary();
    if (this.user != null) {
      this.router.navigate(['']);
    }
  }

  async signInIfNecessary(): Promise<SocialUser> {
    const user = await this.authService.authState.toPromise();
    console.log(user);
    if (user != null) {
      return user;
    }

    return await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
