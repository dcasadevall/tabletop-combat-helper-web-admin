import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { CampaignService } from '../campaign-service';
import { AddCampaignFormComponent } from '../add-campaign-form/add-campaign-form.component';
import { MzModalComponent } from 'ngx-materialize';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { DeleteCampaignModalComponent } from '../delete-campaign-modal/delete-campaign-modal.component';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent {
  public get rows$(): Observable<Object[]> {
    return this.campaignService.campaigns.pipe(first(),
      map(campaigns => campaigns.map(campaign => new Object({
        'Campaign Name': campaign.name,
        'campaignId': campaign.campaignId
      }))));
  }

  constructor(@Inject('CampaignService') private campaignService: CampaignService) {
  }
}
