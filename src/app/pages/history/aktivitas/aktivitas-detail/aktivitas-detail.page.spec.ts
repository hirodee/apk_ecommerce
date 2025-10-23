import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AktivitasDetailPage } from './aktivitas-detail.page';

describe('AktivitasDetailPage', () => {
  let component: AktivitasDetailPage;
  let fixture: ComponentFixture<AktivitasDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktivitasDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktivitasDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
