import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from '../campaign-service';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { EditCampaignModalComponent } from '../edit-campaign-modal/edit-campaign-modal.component';
import { Campaign } from '../models/campaign';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  constructor(@Inject('CampaignService') private campaignService: CampaignService) {
  }

  @ViewChild('editCampaignModal')
  public editCampaignModal: EditCampaignModalComponent;

  public rows: Object[];

  private static mapCampaignRow(campaign: Campaign): Object {
    return new Object({
      'campaign': campaign
    });
  }

  public ngOnInit(): void {
    this.campaignService.campaigns.subscribe(campaigns => {
      this.rows = campaigns.map(CampaignListComponent.mapCampaignRow);
    });

    this.campaignService.campaignCreated.subscribe(campaign => {
      this.rows = this.rows.concat(CampaignListComponent.mapCampaignRow(campaign));
    });

    this.campaignService.campaignSaved.subscribe(campaign => {
      this.rows = this.rows.map(row => row['campaign'].campaignId === campaign.campaignId ?
        CampaignListComponent.mapCampaignRow(campaign) :
        row);
    });

    this.campaignService.campaignRemoved.subscribe(campaignId => {
      this.rows = this.rows.filter(row => row['campaign'].campaignId !== campaignId);
    });
  }

  public handleRowActivated(event: any) {
    if (event.type !== 'click') {
      return;
    }

    // See https://github.com/swimlane/ngx-datatable/issues/471
    // for the bug that forces us to this workaround.
    if (event.cellIndex === 2) {
      return;
    }

    event.event.stopPropagation();
    this.editCampaignModal.openModal(event.row['campaign']);
  }
}
