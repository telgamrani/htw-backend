import { TestBed } from '@angular/core/testing';

import { RobotScrapingUrlService } from './robot-scraping-url.service';

describe('RobotScrapingUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RobotScrapingUrlService = TestBed.get(RobotScrapingUrlService);
    expect(service).toBeTruthy();
  });
});
