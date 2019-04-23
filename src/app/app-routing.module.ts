import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginGuard } from './login/login.guard';
import { LoginComponent } from './login/login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LogoutComponent } from './login/logout/logout.component';
import { CampaignListComponent } from './campaigns/campaign-list/campaign-list.component';

const routes: Routes = [
  // Guard base path so it can't be accessed without a valid authentication
  {
    path: '',
    component: HomePageComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'campaigns',
        component: CampaignListComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
