import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMemberPage } from './detail-member.page';

describe('DetailMemberPage', () => {
  let component: DetailMemberPage;
  let fixture: ComponentFixture<DetailMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailMemberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
