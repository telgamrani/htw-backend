import { TestBed } from '@angular/core/testing';

import { JsonUtilService } from './json-util.service';

describe('JsonUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonUtilService = TestBed.get(JsonUtilService);
    expect(service).toBeTruthy();
  });
});
