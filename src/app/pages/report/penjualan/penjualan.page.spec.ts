import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenjualanPage } from './penjualan.page';

describe('PenjualanPage', () => {
  let component: PenjualanPage;
  let fixture: ComponentFixture<PenjualanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenjualanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenjualanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
