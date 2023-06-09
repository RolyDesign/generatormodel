import { TestBed } from '@angular/core/testing';

import { ActionModalHeaerService } from './action-modal-heaer.service';

describe('ActionModalHeaerService', () => {
  let service: ActionModalHeaerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionModalHeaerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
