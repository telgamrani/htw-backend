import { TestBed } from '@angular/core/testing';

import { UrlUtilService } from './url-util.service';

describe('UrlUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlUtilService = TestBed.get(UrlUtilService);
    expect(service).toBeTruthy();
  });
});
