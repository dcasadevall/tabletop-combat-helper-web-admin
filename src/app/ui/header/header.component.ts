import { Component, Inject, Input } from '@angular/core';
import { SSOService } from '../../sso/sso-service';
import { SSOServiceProvider } from '../../sso/sso.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title: string;

  public get name(): string {
    return this.ssoService.name;
  }

  public get email(): string {
    return this.ssoService.email;
  }

  public get imageUrl(): string {
    return this.ssoService.imageUrl;
  }

  public get isLoggedIn(): boolean {
    return this.ssoService.isSignedIn;
  }

  constructor(@Inject(SSOServiceProvider) private ssoService: SSOService) {
  }
}
