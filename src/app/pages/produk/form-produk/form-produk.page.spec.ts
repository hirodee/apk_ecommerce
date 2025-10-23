import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProdukPage } from './form-produk.page';

describe('FormProdukPage', () => {
  let component: FormProdukPage;
  let fixture: ComponentFixture<FormProdukPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProdukPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProdukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
