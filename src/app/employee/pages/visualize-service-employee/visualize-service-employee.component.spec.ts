import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeServiceEmployeeComponent } from './visualize-service-employee.component';

describe('VisualizeServiceEmployeeComponent', () => {
  let component: VisualizeServiceEmployeeComponent;
  let fixture: ComponentFixture<VisualizeServiceEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizeServiceEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizeServiceEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
