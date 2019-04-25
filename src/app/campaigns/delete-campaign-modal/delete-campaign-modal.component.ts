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

  private _campaign: Campaign;

  public get campaignName(): string {
    if (this._campaign == null) {
      return null;
    }

    return this._campaign.name;
  }

  constructor(@Inject('CampaignService') private campaignService: CampaignService, private toastService: MzToastService) {
  }

  public openModal(campaign: Campaign): void {
    this._campaign = campaign;

    this.modal.openModal();
  }

  public handleDeleteClicked(): void {
    this.campaignService.deleteCampaign(this._campaign.campaignId).then(() => {
      this.modal.closeModal();
    }).catch(reason => this.toastService.show('Error deleting campaign.', 4000, 'red'));
  }
}
