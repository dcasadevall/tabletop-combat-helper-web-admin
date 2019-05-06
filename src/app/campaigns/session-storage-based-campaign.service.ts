import { EventEmitter, Injectable } from '@angular/core';
import { CampaignService } from './campaign-service';
import { Campaign } from './models/campaign';
import { deserialize } from 'serializr';
import { SerializableCampaign } from './models/serializable-campaign';
import { Observable, of } from 'rxjs';
import { emit } from 'cluster';

/**
 * Implementation of CampaignService that relies on SessionStorage.
 * Should only be used for testing purposes.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionStorageBasedCampaignService implements CampaignService {
  private static CAMPAIGN_STORAGE_KEY = 'campaigns';

  public campaignCreated = new EventEmitter<Campaign>();
  public campaignSaved = new EventEmitter<Campaign>();
  public campaignRemoved = new EventEmitter<string>();

  private _cachedCampaigns: Campaign[];

  public get campaigns(): Observable<Campaign[]> {
    return of(this.campaignsSync);
  }

  private get campaignsSync() {
    if (this._cachedCampaigns == null) {
      let campaigns = JSON.parse(localStorage.getItem(SessionStorageBasedCampaignService.CAMPAIGN_STORAGE_KEY));
      campaigns = campaigns != null ? campaigns : [];
      this._cachedCampaigns = campaigns.map((object) => deserialize(SerializableCampaign, object));
    }

    return this._cachedCampaigns;
  }

  public async createCampaign(name: string): Promise<string> {
    const campaign = new SerializableCampaign(name, Math.random().toString());
    this.campaignsSync.push(campaign);
    localStorage.setItem(SessionStorageBasedCampaignService.CAMPAIGN_STORAGE_KEY, JSON.stringify(this.campaignsSync));

    this.campaignCreated.emit(campaign);
    return Promise.resolve(campaign.campaignId);
  }

  public async saveCampaign(name: string, campaignId: string): Promise<void> {
    const existingCampaign = this.campaignsSync.find((campaignInArray) => campaignInArray.campaignId === campaignId);
    if (existingCampaign === null) {
      throw new Error('Invalid campaignId: ' + campaignId);
    }

    existingCampaign.name = name;
    localStorage.setItem(SessionStorageBasedCampaignService.CAMPAIGN_STORAGE_KEY, JSON.stringify(this.campaignsSync));

    this.campaignSaved.emit(existingCampaign);
    return Promise.resolve();
  }

  public async removeCampaign(campaignId: string): Promise<void> {
    const campaigns = await this.campaigns.toPromise();
    const campaign = campaigns.filter((campaignInList) => campaignInList.campaignId === campaignId).pop();
    if (campaign == null) {
      throw new Error('Invalid campaign id: ' + campaignId);
    }

    const index = campaigns.indexOf(campaign);
    campaigns.splice(index, 1);
    localStorage.setItem(SessionStorageBasedCampaignService.CAMPAIGN_STORAGE_KEY, JSON.stringify(campaigns));
    this._cachedCampaigns = null;

    this.campaignRemoved.emit(campaign.campaignId);
    return Promise.resolve();
  }
}
