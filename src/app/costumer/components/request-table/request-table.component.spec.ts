import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTableComponent } from './request-table.component';

describe('RequestTableComponent', () => {
  let component: RequestTableComponent;
  let fixture: ComponentFixture<RequestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
