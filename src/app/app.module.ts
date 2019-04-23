import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HomePageComponent } from './home-page/home-page.component';
import { SSOModule } from './sso/sso.module';
import { CampaignsModule } from './campaigns/campaigns.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    CampaignsModule,
    UiModule,
    AppRoutingModule,
    LoginModule,
    SSOModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
