import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { environment } from '../environments/environment';
import { HomePageComponent } from './home-page/home-page.component';

const config = new AuthServiceConfig([{
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider(environment.googleClientId)
}
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    UiModule,
    AppRoutingModule,
    LoginModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
