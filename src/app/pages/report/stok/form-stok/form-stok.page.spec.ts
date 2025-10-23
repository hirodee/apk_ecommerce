import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStokPage } from './form-stok.page';

describe('FormStokPage', () => {
  let component: FormStokPage;
  let fixture: ComponentFixture<FormStokPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStokPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStokPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
