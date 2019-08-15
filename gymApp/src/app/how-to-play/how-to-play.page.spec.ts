import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToPlayPage } from './how-to-play.page';

describe('HowToPlayPage', () => {
  let component: HowToPlayPage;
  let fixture: ComponentFixture<HowToPlayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToPlayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToPlayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
