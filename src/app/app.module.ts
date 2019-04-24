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
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    BrowserModule,
    CampaignsModule,
    NgxDatatableModule,
    UiModule,
    AppRoutingModule,
    LoginModule,
    SSOModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
