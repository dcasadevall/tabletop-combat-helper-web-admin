import { Component, Inject, ViewChild } from '@angular/core';
import { CampaignService } from '../campaign-service';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { EditCampaignModalComponent } from '../edit-campaign-modal/edit-campaign-modal.component';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent {
  @ViewChild('editCampaignModal')
  public editCampaignModal: EditCampaignModalComponent;

  public get rows$(): Observable<Object[]> {
    return this.campaignService.campaigns.pipe(first(),
      map(campaigns => campaigns.map(campaign => new Object({
        'campaign': campaign
      }))));
  }

  constructor(@Inject('CampaignService') private campaignService: CampaignService) {
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
