import { TestBed } from '@angular/core/testing';

import { ValidatorSchemaService } from './validatorschema.service';

describe('ValidatorschemaService', () => {
  let service: ValidatorSchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorSchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
