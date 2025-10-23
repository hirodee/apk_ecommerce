import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMemberPage } from './form-member.page';

describe('FormMemberPage', () => {
  let component: FormMemberPage;
  let fixture: ComponentFixture<FormMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMemberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
