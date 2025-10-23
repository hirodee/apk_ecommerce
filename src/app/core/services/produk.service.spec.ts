import { TestBed } from '@angular/core/testing';

import { ProdukService } from './produk.service';

describe('ProdukService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdukService = TestBed.get(ProdukService);
    expect(service).toBeTruthy();
  });
});
