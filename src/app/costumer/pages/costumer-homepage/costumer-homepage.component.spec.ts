import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaHomecostumerComponent } from './costumer-homepage.component';

describe('TelaHomecostumerComponent', () => {
  let component: TelaHomecostumerComponent;
  let fixture: ComponentFixture<TelaHomecostumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaHomecostumerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelaHomecostumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
