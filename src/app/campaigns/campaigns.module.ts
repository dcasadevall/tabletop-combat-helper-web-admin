import { NgModule } from '@angular/core';
import { SessionStorageBasedCampaignService } from './session-storage-based-campaign.service';
import { CommonModule } from '@angular/common';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MzButtonModule } from 'ngx-materialize';

@NgModule({
  declarations: [
    CampaignListComponent
  ],
  imports: [
    CommonModule,
    MzButtonModule,
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
