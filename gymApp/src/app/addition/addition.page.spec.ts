import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionPage } from './addition.page';

describe('AdditionPage', () => {
  let component: AdditionPage;
  let fixture: ComponentFixture<AdditionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
