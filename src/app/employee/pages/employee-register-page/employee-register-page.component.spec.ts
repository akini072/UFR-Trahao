import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegisterPageComponent } from './employee-register-page.component';

describe('EmployeeRegisterPageComponent', () => {
  let component: EmployeeRegisterPageComponent;
  let fixture: ComponentFixture<EmployeeRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeRegisterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
