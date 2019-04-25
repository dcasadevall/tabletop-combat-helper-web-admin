import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SSOModule } from '../sso/sso.module';
import { MzNavbarModule, MzSidenavModule } from 'ngx-materialize';

@NgModule({
  imports: [
    CommonModule,
    MzNavbarModule,
    MzSidenavModule,
    RouterModule,
    SSOModule
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  exports: [LayoutComponent]
})
export class UiModule { }
