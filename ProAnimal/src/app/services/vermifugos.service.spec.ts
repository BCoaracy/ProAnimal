import { TestBed } from '@angular/core/testing';

import { VermifugosService } from './vermifugos.service';

describe('VermifugosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VermifugosService = TestBed.get(VermifugosService);
    expect(service).toBeTruthy();
  });
});
