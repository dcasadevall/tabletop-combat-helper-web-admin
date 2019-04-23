import { inject, InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { GoogleApiModule, GoogleAuthService, NG_GAPI_CONFIG, NgGapiClientConfig } from 'ng-gapi';
import { NgGapiSsoService } from './ng-gapi-sso.service';
import { SSOService } from './sso-service';

const gApiClientConfig: NgGapiClientConfig = {
  client_id: environment.googleClientId,
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gApiClientConfig
    }),
  ]
})

export class SSOModule {
}

export const SSOServiceProvider = new InjectionToken<SSOService>(
  'SSOServiceProvider',
  { providedIn: SSOModule, factory: () => new NgGapiSsoService(inject(GoogleAuthService)) }
);
