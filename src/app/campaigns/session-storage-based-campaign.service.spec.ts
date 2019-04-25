import { TestBed } from '@angular/core/testing';

import { SessionStorageBasedCampaignService } from './session-storage-based-campaign.service';

describe('SessionStorageBasedCampaignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionStorageBasedCampaignService = TestBed.get(SessionStorageBasedCampaignService);
    expect(service).toBeTruthy();
  });
});
