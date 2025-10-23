import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualComponent } from './manual.component';

describe('ManualComponent', () => {
  let component: ManualComponent;
  let fixture: ComponentFixture<ManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
