import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Campaign } from '../models/campaign';
import { CampaignService } from '../campaign-service';
import { MzModalComponent, MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-delete-campaign-modal',
  templateUrl: './delete-campaign-modal.component.html',
  styleUrls: ['./delete-campaign-modal.component.css']
})
export class DeleteCampaignModalComponent {
  public modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can't be dismissed by clicking outside of the modal
  };

  @ViewChild('modal')
  public modal: MzModalComponent;

  private _campaignId: string;
  private _campaignName: string;
  public get campaignName(): string {
    return this._campaignName;
  }

  constructor(@Inject('CampaignService') private campaignService: CampaignService, private toastService: MzToastService) { }

  public openModal(campaignId: string, campaignName: string): void {
    this._campaignId = campaignId;
    this._campaignName = campaignName;

    this.modal.openModal();
  }

  public handleDeleteClicked(): void {
    this.campaignService.deleteCampaign(this._campaignId).then(success => {
      if (!success) {
        this.toastService.show('Error deleting campaign.', 4000, 'red');
        return;
      }

      this.modal.closeModal();
    });
  }
}
