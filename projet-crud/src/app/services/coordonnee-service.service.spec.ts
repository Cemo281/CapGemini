import { TestBed } from '@angular/core/testing';

import { CoordonneeService } from './coordonnee-service.service';

describe('CoordonneeService', () => {
  let service: CoordonneeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoordonneeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
