import { Campaign } from './models/campaign';
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';

/**
 * Service providing information about the campaigns created by the current user.
 */
export interface CampaignService {
  /**
   * Returns the list of campaigns created by the current user.
   */
  campaigns: Promise<Campaign[]>;

  /**
   * Adds a new campaign, returning the newly created campaign's UUID if successful, or null otherwise.
   * @param name Name of the new campaign to be created.
   */
  addCampaign(name: string): Promise<UUID>;

  /**
   * Deletes the campaign with the given UUID. Returns true if successful, and false otherwise.
   * @param campaignId A Unique identifier for the campaign to delete.
   */
  deleteCampaign(campaignId: UUID): Promise<boolean>;
}
