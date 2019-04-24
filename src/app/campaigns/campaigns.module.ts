import { InjectionToken, NgModule } from '@angular/core';
import { CampaignService } from './campaign-service';
import { SessionStorageBasedCampaignService } from './session-storage-based-campaign.service';
import { CommonModule } from '@angular/common';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    CampaignListComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule
  ],
  providers: [
    {
      provide: 'CampaignServiceProvider',
      useClass: SessionStorageBasedCampaignService
    }
  ]
})
export class CampaignsModule { }
