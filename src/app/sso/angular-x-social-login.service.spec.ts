import { TestBed } from '@angular/core/testing';

import { AngularXSocialLoginService } from './angular-x-social-login.service';

describe('AngularXSocialLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularXSocialLoginService = TestBed.get(AngularXSocialLoginService);
    expect(service).toBeTruthy();
  });
});
