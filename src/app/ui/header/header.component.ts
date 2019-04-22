import { Component, Inject, Input } from '@angular/core';
import { SSOService } from '../../sso/sso-service';
import { SSOServiceProvider } from '../../sso/sso.module';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title: string;
  public get email$(): Observable<string> {
    return this.ssoService.signedInWithEmail$;
  }

  public get isLoggedIn$(): Observable<boolean> {
    return this.ssoService.isSignedIn$;
  }

  constructor(@Inject(SSOServiceProvider) private ssoService: SSOService) {
  }
}
