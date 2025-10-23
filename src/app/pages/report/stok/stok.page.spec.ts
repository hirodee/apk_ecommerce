import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StokPage } from './stok.page';

describe('StokPage', () => {
  let component: StokPage;
  let fixture: ComponentFixture<StokPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StokPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StokPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
