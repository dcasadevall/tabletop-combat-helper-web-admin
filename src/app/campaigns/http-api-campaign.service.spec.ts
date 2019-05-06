import { TestBed } from '@angular/core/testing';

import { HttpApiCampaignService } from './http-api-campaign.service';

describe('HttpApiCampaignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpApiCampaignService = TestBed.get(HttpApiCampaignService);
    expect(service).toBeTruthy();
  });
});
