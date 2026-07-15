import { TestBed } from '@angular/core/testing';

import { Mytasks } from './mytasks';

describe('Mytasks', () => {
  let service: Mytasks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mytasks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
