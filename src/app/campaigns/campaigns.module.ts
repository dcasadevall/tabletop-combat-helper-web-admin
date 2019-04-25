import { NgModule } from '@angular/core';
import { SessionStorageBasedCampaignService } from './session-storage-based-campaign.service';
import { CommonModule } from '@angular/common';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  MzButtonModule,
  MzInputModule,
  MzModalModule,
  MzSelectModule,
  MzValidationModule
} from 'ngx-materialize';
import { AddCampaignFormComponent } from './add-campaign-form/add-campaign-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampaignRowsPipe } from './campaign-list/campaign-rows.pipe';

@NgModule({
  declarations: [
    CampaignListComponent,
    CampaignRowsPipe,
    AddCampaignFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MzButtonModule,
    MzInputModule,
    MzSelectModule,
    MzValidationModule,
    MzModalModule,
    NgxDatatableModule
  ],
  providers: [
    {
      provide: 'CampaignService',
      useClass: SessionStorageBasedCampaignService
    }
  ]
})
export class CampaignsModule { }
