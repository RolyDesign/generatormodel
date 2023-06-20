import { TestBed } from '@angular/core/testing';

import { ModePreferenceService } from './mode-preference.service';

describe('ModePreferenceService', () => {
  let service: ModePreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModePreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
