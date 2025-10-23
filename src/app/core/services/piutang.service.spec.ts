import { TestBed } from '@angular/core/testing';

import { PiutangService } from './piutang.service';

describe('PiutangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PiutangService = TestBed.get(PiutangService);
    expect(service).toBeTruthy();
  });
});
