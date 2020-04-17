import { TestBed } from '@angular/core/testing';

import { AnimaisService } from './animais.service';

describe('AnimaisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnimaisService = TestBed.get(AnimaisService);
    expect(service).toBeTruthy();
  });
});
