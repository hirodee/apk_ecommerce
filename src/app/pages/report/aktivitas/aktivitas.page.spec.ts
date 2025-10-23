import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AktivitasPage } from './aktivitas.page';

describe('AktivitasPage', () => {
  let component: AktivitasPage;
  let fixture: ComponentFixture<AktivitasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktivitasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktivitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
