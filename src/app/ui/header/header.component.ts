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
  public get email$(): Promise<string> {
    return this.ssoService.email$;
  }

  public get isLoggedIn$(): Promise<boolean> {
    return this.ssoService.isLoggedIn$;
  }

  constructor(@Inject(SSOServiceProvider) private ssoService: SSOService) {
  }
}
