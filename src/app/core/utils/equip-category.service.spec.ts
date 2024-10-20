import { TestBed } from '@angular/core/testing';

import { EquipCategoryService } from './equip-category.service';

describe('EquipCategoryService', () => {
  let service: EquipCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
