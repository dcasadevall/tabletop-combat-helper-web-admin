import { Component, ElementRef, ViewChild } from '@angular/core';
import { EditCampaignFormComponent } from '../edit-campaign-form/edit-campaign-form.component';
import { MzModalComponent, MzToastService } from 'ngx-materialize';
import { Campaign } from '../models/campaign';

@Component({
  selector: 'app-edit-campaign-modal',
  templateUrl: './edit-campaign-modal.component.html',
  styleUrls: ['./edit-campaign-modal.component.css']
})
export class EditCampaignModalComponent {
  @ViewChild('createCampaignButton')
  public createCampaignButton: ElementRef;

  @ViewChild('modal')
  public modal: MzModalComponent;

  @ViewChild('form')
  public form: EditCampaignFormComponent;

  private _isNewCampaign: boolean;
  public get isNewCampaign(): boolean {
    return this._isNewCampaign;
  }

  public constructor(private toastService: MzToastService) { }

  public openModal(campaign: Campaign | null): void {
    this._isNewCampaign = campaign == null;

    this.form.initialize(campaign);
    this.modal.openModal();
  }

  public handleCreateCampaignClicked(): void {
    this.createCampaignButton.nativeElement.disabled = true;
    this.form.onSubmit().then(() => {
      this.createCampaignButton.nativeElement.disabled = false;
      this.modal.closeModal();
    }).catch(reason => {
      this.createCampaignButton.nativeElement.disabled = false;
      this.toastService.show(reason, 4000, 'red');
    });
  }
}
