import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtractPage } from './subtract.page';

describe('SubtractPage', () => {
  let component: SubtractPage;
  let fixture: ComponentFixture<SubtractPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtractPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
