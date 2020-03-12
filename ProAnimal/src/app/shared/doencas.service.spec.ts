import { TestBed } from '@angular/core/testing';

import { DoencasService } from './doencas.service';

describe('DoencasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoencasService = TestBed.get(DoencasService);
    expect(service).toBeTruthy();
  });
});
