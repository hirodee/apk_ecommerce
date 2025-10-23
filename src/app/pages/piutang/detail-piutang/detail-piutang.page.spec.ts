import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPiutangPage } from './detail-piutang.page';

describe('DetailPiutangPage', () => {
  let component: DetailPiutangPage;
  let fixture: ComponentFixture<DetailPiutangPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPiutangPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPiutangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
