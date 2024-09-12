import { Component } from '@angular/core';
import { NavbarComponent } from "../../../core/components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceRequestTableComponent } from '../../components/service-request-table/service-request-table.component';

@Component({
  selector: 'app-costumer-homepage',
  standalone: true,
  imports: [CommonModule, NavbarComponent,ServiceRequestTableComponent, RouterModule],
  templateUrl: './costumer-homepage.component.html',
  styleUrl: './costumer-homepage.component.css'
})
export class CustomerHomepageComponent {

}
