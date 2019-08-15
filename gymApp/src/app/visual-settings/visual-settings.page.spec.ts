import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualSettingsPage } from './visual-settings.page';

describe('VisualSettingsPage', () => {
  let component: VisualSettingsPage;
  let fixture: ComponentFixture<VisualSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualSettingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
