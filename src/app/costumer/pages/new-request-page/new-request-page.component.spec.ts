import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRequestPageComponent } from './new-request-page.component';

describe('NewRequestPageComponent', () => {
  let component: NewRequestPageComponent;
  let fixture: ComponentFixture<NewRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRequestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
