import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanKasirPage } from './laporan-kasir.page';

describe('LaporanKasirPage', () => {
  let component: LaporanKasirPage;
  let fixture: ComponentFixture<LaporanKasirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaporanKasirPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanKasirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
