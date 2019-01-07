import { TestBed } from '@angular/core/testing';

import { LookService } from './look.service';

describe('LookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LookService = TestBed.get(LookService);
    expect(service).toBeTruthy();
  });
});
