import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSatuanProdukPage } from './form-satuan-produk.page';

describe('FormSatuanProdukPage', () => {
  let component: FormSatuanProdukPage;
  let fixture: ComponentFixture<FormSatuanProdukPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSatuanProdukPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSatuanProdukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
