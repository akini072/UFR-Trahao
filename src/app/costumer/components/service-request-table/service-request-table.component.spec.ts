import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestTableComponent } from './service-request-table.component';

describe('ServiceRequestTableComponent', () => {
  let component: ServiceRequestTableComponent;
  let fixture: ComponentFixture<ServiceRequestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRequestTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
