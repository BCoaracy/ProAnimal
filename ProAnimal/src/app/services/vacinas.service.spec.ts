import { TestBed } from '@angular/core/testing';

import { VacinasService } from './vacinas.service';

describe('VacinasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacinasService = TestBed.get(VacinasService);
    expect(service).toBeTruthy();
  });
});
