import { TestBed } from '@angular/core/testing';

import { ViaCepApiService } from './via-cep-api.service';

describe('ViaCepApiService', () => {
  let service: ViaCepApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViaCepApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
