import { TestBed } from '@angular/core/testing';

import { ReturService } from './retur.service';

describe('ReturService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReturService = TestBed.get(ReturService);
    expect(service).toBeTruthy();
  });
});
