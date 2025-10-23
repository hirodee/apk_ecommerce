import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKategoriProdukPage } from './detail-kategori-produk.page';

describe('DetailKategoriProdukPage', () => {
  let component: DetailKategoriProdukPage;
  let fixture: ComponentFixture<DetailKategoriProdukPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailKategoriProdukPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailKategoriProdukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
