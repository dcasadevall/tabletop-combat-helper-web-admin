import { Campaign } from './models/campaign';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

/**
 * Service providing information about the campaigns created by the current user.
 */
export interface CampaignService {
  campaignCreated: EventEmitter<Campaign>;
  campaignSaved: EventEmitter<Campaign>;
  campaignRemoved: EventEmitter<string>;

  /**
   * Returns the list of campaigns created by the current user.
   */
  campaigns: Observable<Campaign[]>;

  /**
   * Adds a new campaign, returning the newly created campaign's id if successful, or null otherwise.
   * @param name Name of the new campaign to be created.
   */
  createCampaign(name: string): Promise<string>;

  /**
   * Saves changes to an existing campaign.
   * @param name Newly assigned name.
   * @param campaignId Identifier of the campaign to be saved.
   */
  saveCampaign(name: string, campaignId: string): Promise<void>;

  /**
   * Deletes the campaign with the given UUID. Returns true if successful, and false otherwise.
   * @param campaignId A Unique identifier for the campaign to delete.
   */
  removeCampaign(campaignId: string): Promise<void>;
}
