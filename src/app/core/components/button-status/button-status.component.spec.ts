import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonStatusComponent } from './button-status.component';

describe('ButtonStatusComponent', () => {
  let component: ButtonStatusComponent;
  let fixture: ComponentFixture<ButtonStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
