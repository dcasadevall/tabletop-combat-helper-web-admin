import { Injectable } from '@angular/core';
import { CampaignService } from './campaign-service';
import { Observable, of } from 'rxjs';
import { Campaign } from './models/campaign';
import { deserialize } from 'serializr';
import { SerializableCampaign } from './models/serializable-campaign';
import { UUID } from 'angular2-uuid';

/**
 * Implementation of CampaignService that relies on SessionStorage.
 * Should only be used for testing purposes.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionStorageBasedCampaignService implements CampaignService {
  private static CAMPAIGN_STORAGE_KEY = 'campaigns';

  private _cachedCampaigns: Campaign[];

  public get campaigns(): Promise<Campaign[]> {
    if (this._cachedCampaigns == null) {
      let campaigns = JSON.parse(localStorage.getItem(SessionStorageBasedCampaignService.CAMPAIGN_STORAGE_KEY));
      campaigns = campaigns != null ? campaigns : [];
      this._cachedCampaigns = campaigns.map((object) => deserialize(SerializableCampaign, object));
    }

    return Promise.resolve(this._cachedCampaigns);
  }

  public async addCampaign(name: string): Promise<boolean> {
    const campaigns = await this.campaigns;
    campaigns.push(new SerializableCampaign(name, UUID.UUID()));
    localStorage.setItem(SessionStorageBasedCampaignService.CAMPAIGN_STORAGE_KEY, JSON.stringify(this.campaigns));

    return Promise.resolve(true);
  }

  public async deleteCampaign(campaignId: UUID): Promise<boolean> {
    let campaigns = await this.campaigns;
    const campaign = campaigns.filter((campaignInList) => campaignInList.campaignId === campaignId.toString()).pop();
    if (campaign == null) {
      throw new Error('Invalid campaign id: ' + campaignId);
    }

    const index = campaigns.indexOf(campaign);
    campaigns = campaigns.slice(0, index - 1).concat(campaigns.slice(index + 1));
    localStorage.setItem(SessionStorageBasedCampaignService.CAMPAIGN_STORAGE_KEY, JSON.stringify(campaigns));
    this._cachedCampaigns = null;
  }
}
