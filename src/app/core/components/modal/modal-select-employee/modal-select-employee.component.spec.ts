import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectEmployee } from './modal-select-employee.component';

describe('ModalInputComponent', () => {
  let component: ModalSelectEmployee;
  let fixture: ComponentFixture<ModalSelectEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSelectEmployee]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSelectEmployee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
