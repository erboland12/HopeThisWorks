import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplicationPage } from './multiplication.page';

describe('MultiplicationPage', () => {
  let component: MultiplicationPage;
  let fixture: ComponentFixture<MultiplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
