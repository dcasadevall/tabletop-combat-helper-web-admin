import { NgModule } from '@angular/core';
import { SessionStorageBasedCampaignService } from './session-storage-based-campaign.service';
import { CommonModule } from '@angular/common';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  MzButtonModule,
  MzInputModule,
  MzModalModule,
  MzSelectModule, MzToastModule,
  MzValidationModule
} from 'ngx-materialize';
import { EditCampaignFormComponent } from './edit-campaign-form/edit-campaign-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteCampaignModalComponent } from './delete-campaign-modal/delete-campaign-modal.component';
import { EditCampaignModalComponent } from './edit-campaign-modal/edit-campaign-modal.component';

@NgModule({
  declarations: [
    CampaignListComponent,
    EditCampaignFormComponent,
    DeleteCampaignModalComponent,
    EditCampaignModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MzButtonModule,
    MzInputModule,
    MzSelectModule,
    MzToastModule,
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
