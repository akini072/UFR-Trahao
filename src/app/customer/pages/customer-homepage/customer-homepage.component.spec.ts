import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHomepageComponent } from './customer-homepage.component';

describe('CustomerHomepageComponent', () => {
  let component: CustomerHomepageComponent;
  let fixture: ComponentFixture<CustomerHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
