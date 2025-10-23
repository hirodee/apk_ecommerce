import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KategoriProdukPage } from './kategori-produk.page';

describe('KategoriProdukPage', () => {
  let component: KategoriProdukPage;
  let fixture: ComponentFixture<KategoriProdukPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategoriProdukPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KategoriProdukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
