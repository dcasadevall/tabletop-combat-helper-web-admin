import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { CampaignService } from '../campaign-service';
import { AddCampaignFormComponent } from '../add-campaign-form/add-campaign-form.component';
import { MzModalComponent } from 'ngx-materialize';
import { Observable } from 'rxjs';
import { CampaignRowsPipe } from './campaign-rows.pipe';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
  providers: [CampaignRowsPipe]
})
export class CampaignListComponent {
  @ViewChild('createCampaignButton')
  public createCampaignButton: ElementRef;

  public get rows$(): Observable<Object[]> {
    return this.campaignService.campaigns.pipe(first(),
      map(campaigns => campaigns.map(campaign => new Object({'Campaign Name': campaign.name}))));
  }

  public columns = [
    {prop: 'Campaign Name'},
    {name: 'Packages'},
    {name: ''}
  ];

  constructor(@Inject('CampaignService') private campaignService: CampaignService, private campaignRowsPipe: CampaignRowsPipe) {
  }

  public handleCreateCampaignClicked(form: AddCampaignFormComponent, modal: MzModalComponent): void {
    this.createCampaignButton.nativeElement.disabled = true;
    form.onSubmit().then(success => {
      this.createCampaignButton.nativeElement.disabled = false;

      if (success) {
        modal.closeModal();
      }
    });
  }
}
