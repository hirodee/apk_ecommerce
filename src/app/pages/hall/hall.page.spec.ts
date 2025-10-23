import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallPage } from './hall.page';

describe('HallPage', () => {
  let component: HallPage;
  let fixture: ComponentFixture<HallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});