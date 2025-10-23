import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiutangPage } from './piutang.page';

describe('PiutangPage', () => {
  let component: PiutangPage;
  let fixture: ComponentFixture<PiutangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiutangPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiutangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
