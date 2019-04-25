import { Component, ElementRef, ViewChild } from '@angular/core';
import { AddCampaignFormComponent } from '../add-campaign-form/add-campaign-form.component';
import { MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-add-campaign-modal',
  templateUrl: './add-campaign-modal.component.html',
  styleUrls: ['./add-campaign-modal.component.css']
})
export class AddCampaignModalComponent {
  @ViewChild('createCampaignButton')
  public createCampaignButton: ElementRef;

  @ViewChild('modal')
  public modal: MzModalComponent;

  @ViewChild('form')
  public form: AddCampaignFormComponent;

  public openModal(): void {
    this.modal.openModal();
    this.form.form.reset();
  }

  handleCreateCampaignClicked(): void {
    this.createCampaignButton.nativeElement.disabled = true;
    this.form.onSubmit().then(success => {
      this.createCampaignButton.nativeElement.disabled = false;

      if (success) {
        this.modal.closeModal();
      }
    });
  }
}
