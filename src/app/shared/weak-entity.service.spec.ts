import { TestBed } from '@angular/core/testing';

import { WeakEntityService } from './weak-entity.service';

describe('WeakEntityService', () => {
  let service: WeakEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeakEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
