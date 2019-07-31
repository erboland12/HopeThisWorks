import { TestBed } from '@angular/core/testing';

import { DifficultyService } from './difficulty.service';

describe('DifficultyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DifficultyService = TestBed.get(DifficultyService);
    expect(service).toBeTruthy();
  });
});
