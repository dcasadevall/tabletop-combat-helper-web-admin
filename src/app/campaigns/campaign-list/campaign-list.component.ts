import { Component, Inject, OnInit } from '@angular/core';
import { Campaign } from '../models/campaign';
import { CampaignService } from '../campaign-service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  public campaigns: Promise<Campaign[]>;

  constructor(@Inject('CampaignServiceProvider') private campaignService: CampaignService) { }

  ngOnInit(): void {
    this.campaigns = this.campaignService.campaigns;
  }
}
