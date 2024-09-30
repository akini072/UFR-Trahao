import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationsPageComponent } from './solicitations-page.component';

describe('SolicitationsPageComponent', () => {
  let component: SolicitationsPageComponent;
  let fixture: ComponentFixture<SolicitationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitationsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
