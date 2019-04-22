import { TestBed } from '@angular/core/testing';

import { NgGapiSsoService } from './ng-gapi-sso.service';

describe('NgGapiSsoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgGapiSsoService = TestBed.get(NgGapiSsoService);
    expect(service).toBeTruthy();
  });
});
