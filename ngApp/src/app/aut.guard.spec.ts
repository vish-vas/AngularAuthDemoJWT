import { TestBed, async, inject } from '@angular/core/testing';

import { AutGuard } from './aut.guard';

describe('AutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutGuard]
    });
  });

  it('should ...', inject([AutGuard], (guard: AutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
