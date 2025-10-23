import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerSettingPage } from './server-setting.page';

describe('ServerSettingPage', () => {
  let component: ServerSettingPage;
  let fixture: ComponentFixture<ServerSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerSettingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
