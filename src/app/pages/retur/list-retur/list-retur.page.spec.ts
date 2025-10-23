import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReturPage } from './list-retur.page';

describe('ListReturPage', () => {
  let component: ListReturPage;
  let fixture: ComponentFixture<ListReturPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReturPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReturPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
