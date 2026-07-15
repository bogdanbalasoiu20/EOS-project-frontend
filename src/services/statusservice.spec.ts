import { TestBed } from '@angular/core/testing';

import { Statusservice } from './statusservice';

describe('Statusservice', () => {
  let service: Statusservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Statusservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
