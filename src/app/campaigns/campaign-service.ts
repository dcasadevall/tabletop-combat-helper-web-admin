import { Campaign } from './models/campaign';
import { Observable } from 'rxjs';

/**
 * Service providing information about the campaigns created by the current user.
 */
export interface CampaignService {
  /**
   * Returns the list of campaigns created by the current user.
   */
  campaigns: Observable<Campaign[]>;

  /**
   * Adds a new campaign, returning the newly created campaign's id if successful, or null otherwise.
   * @param name Name of the new campaign to be created.
   */
  addCampaign(name: string): Promise<string>;

  /**
   * Saves changes to an existing campaign.
   * @param name Newly assigned name.
   * @param campaignId Identifier of the campaign to be saved.
   */
  saveCampaign(name: string, campaignId: string): Promise;

  /**
   * Deletes the campaign with the given UUID. Returns true if successful, and false otherwise.
   * @param campaignId A Unique identifier for the campaign to delete.
   */
  deleteCampaign(campaignId: string): Promise;
}
