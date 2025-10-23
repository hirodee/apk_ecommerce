import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSatuanProdukPage } from './detail-satuan-produk.page';

describe('DetailSatuanProdukPage', () => {
  let component: DetailSatuanProdukPage;
  let fixture: ComponentFixture<DetailSatuanProdukPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSatuanProdukPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSatuanProdukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
