import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKategoriProdukPage } from './form-kategori-produk.page';

describe('FormKategoriProdukPage', () => {
  let component: FormKategoriProdukPage;
  let fixture: ComponentFixture<FormKategoriProdukPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormKategoriProdukPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKategoriProdukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
