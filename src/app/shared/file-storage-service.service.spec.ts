import { TestBed } from '@angular/core/testing';

import { FileStorageServiceService } from './file-storage-service.service';

describe('FileStorageServiceService', () => {
  let service: FileStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
