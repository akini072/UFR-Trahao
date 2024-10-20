import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSectionComponent } from './filter-section.component';

describe('FilterSectionComponent', () => {
  let component: FilterSectionComponent;
  let fixture: ComponentFixture<FilterSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
