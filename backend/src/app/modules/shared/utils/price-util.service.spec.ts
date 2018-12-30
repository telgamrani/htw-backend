import { TestBed } from '@angular/core/testing';

import { PriceUtilService } from './price-util.service';

describe('PriceUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceUtilService = TestBed.get(PriceUtilService);
    expect(service).toBeTruthy();
  });
});
