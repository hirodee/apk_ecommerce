import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanPenjualanPage } from './laporan-penjualan.page';

describe('LaporanPenjualanPage', () => {
  let component: LaporanPenjualanPage;
  let fixture: ComponentFixture<LaporanPenjualanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaporanPenjualanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanPenjualanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
