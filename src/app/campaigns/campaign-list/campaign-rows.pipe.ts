import { Pipe, PipeTransform } from '@angular/core';
import { Campaign } from '../models/campaign';
import { from, Observable } from 'rxjs';

@Pipe({name: 'campaignRows'})
export class CampaignRowsPipe implements PipeTransform {
  transform(campaignsPromise: Promise<Campaign[]>): Observable<Object[]> {
    return from(campaignsPromise.then((campaigns) => campaigns.map((campaign) => new Object({'Campaign Name': campaign.name}))));
  }
}
