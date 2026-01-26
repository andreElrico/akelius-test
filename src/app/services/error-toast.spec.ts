import { TestBed } from '@angular/core/testing';

import { ErrorToast } from './error-toast';

describe('ErrorToast', () => {
  let service: ErrorToast;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorToast);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
