import { TestBed } from '@angular/core/testing';

import { FileUtilService } from './file-util.service';

describe('FileUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileUtilService = TestBed.get(FileUtilService);
    expect(service).toBeTruthy();
  });
});
