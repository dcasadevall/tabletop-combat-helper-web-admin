import { inject, InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { environment } from '../../environments/environment';
import { AngularXSocialLoginService } from './angular-x-social-login.service';

export const SSOServiceProvider = new InjectionToken(
  'SSOServiceProvider',
  { providedIn: SSOModule, factory: () => new AngularXSocialLoginService(inject(AuthService)) }
);

const config = new AuthServiceConfig([{
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider(environment.googleClientId)
}
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
})
export class SSOModule {
}
