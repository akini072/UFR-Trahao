import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeServiceComponent } from './visualize-service.component';

describe('VisualizeServiceComponent', () => {
  let component: VisualizeServiceComponent;
  let fixture: ComponentFixture<VisualizeServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizeServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
