import { Component, Inject, OnInit } from '@angular/core';
import { CampaignService } from '../campaign-service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  public columns = [
    { prop: 'Campaign Name' },
    { name: 'Packages' },
    { name: '' }
  ];

  public rows = [];

  constructor(@Inject('CampaignServiceProvider') private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.campaignService.campaigns.then(campaigns => {
      this.rows = campaigns.map((campaign) => new Object({ 'Campaign Name' : campaign.name }));
    });
  }
}
