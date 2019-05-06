import { EventEmitter, Injectable } from '@angular/core';
import { CampaignService } from './campaign-service';
import { Observable } from 'rxjs';
import { Campaign } from './models/campaign';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { SerializableCampaign } from './models/serializable-campaign';

@Injectable({
  providedIn: 'root'
})
export class HttpApiCampaignService implements CampaignService {
  public campaignCreated = new EventEmitter<Campaign>();
  public campaignSaved = new EventEmitter<Campaign>();
  public campaignRemoved = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  public get campaigns(): Observable<Campaign[]> {
    return this.http.post(environment.apiUrl + '/campaigns/list', {}).pipe(tap(), map(response => {
      if (response == null || !response['success'] || !response['data']) {
        throw new Error('Error listing campaigns. Response: ' + JSON.stringify(response));
      }

      return response['data'].map(HttpApiCampaignService.parseCampaign);
    }));
  }

  private static parseCampaign(jsonCampaign: object): Campaign {
    return new SerializableCampaign(jsonCampaign['name'], jsonCampaign['id']);
  }

  public createCampaign(name: string): Promise<string> {
    return this.http.post(environment.apiUrl + '/campaigns/create', {
      name: name
    }).pipe(map(response => {
      if (response == null || !response['success']) {
        throw new Error('Error create campaign. Response: ' + JSON.stringify(response));
      }

      const campaignId = response['data']['id'];
      this.campaignCreated.emit(new SerializableCampaign(name, campaignId));
      return campaignId;
    })).toPromise();
  }

  public removeCampaign(campaignId: string): Promise<void> {
    return this.http.post(environment.apiUrl + '/campaigns/remove/' + campaignId, {}).pipe(map(response => {
      if (response == null || !response['success']) {
        throw new Error('Error removing campaign. Response: ' + JSON.stringify(response));
      }

      this.campaignRemoved.emit(campaignId);
      return response['data'];
    })).toPromise();
  }

  public saveCampaign(name: string, campaignId: string): Promise<void> {
    return this.http.post(environment.apiUrl + '/campaigns/save', {
      id: campaignId,
      name: name
    }).pipe(map(response => {
      if (response == null || !response['success']) {
        throw new Error('Error saving campaign. Response: ' + JSON.stringify(response));
      }

      this.campaignSaved.emit(new SerializableCampaign(name, campaignId));
    })).toPromise();
  }
}
