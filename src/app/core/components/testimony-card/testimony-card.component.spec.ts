import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonyCardComponent } from './testimony-card.component';

describe('TestimonyCardComponent', () => {
  let component: TestimonyCardComponent;
  let fixture: ComponentFixture<TestimonyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonyCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestimonyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
