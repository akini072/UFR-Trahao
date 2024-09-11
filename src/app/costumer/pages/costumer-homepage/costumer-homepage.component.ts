import { Component } from '@angular/core';
import { NavbarComponent } from "../../../core/components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-costumer-homepage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule],
  templateUrl: './costumer-homepage.component.html',
  styleUrl: './costumer-homepage.component.css'
})
export class CustomerHomepageComponent {

}
