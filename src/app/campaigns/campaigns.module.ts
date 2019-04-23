import { InjectionToken, NgModule } from '@angular/core';
import { CampaignService } from './campaign-service';
import { SessionStorageBasedCampaignService } from './session-storage-based-campaign.service';
import { CommonModule } from '@angular/common';
import { CampaignListComponent } from './campaign-list/campaign-list.component';

@NgModule({
  declarations: [
    CampaignListComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: 'CampaignServiceProvider',
      useClass: SessionStorageBasedCampaignService
    }
  ]
})
export class CampaignsModule { }
