import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInputComponent } from './modal-input.component';

describe('ModalInputComponent', () => {
  let component: ModalInputComponent;
  let fixture: ComponentFixture<ModalInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
