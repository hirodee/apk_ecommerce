import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatuanProdukPage } from './satuan-produk.page';

describe('SatuanProdukPage', () => {
  let component: SatuanProdukPage;
  let fixture: ComponentFixture<SatuanProdukPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatuanProdukPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatuanProdukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
