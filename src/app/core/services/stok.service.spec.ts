import { TestBed } from '@angular/core/testing';

import { StokService } from './stok.service';

describe('StokService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StokService = TestBed.get(StokService);
    expect(service).toBeTruthy();
  });
});
