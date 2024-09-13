import { Component } from '@angular/core';
import { ButtonStatusComponent } from '../core/components/button-status/button-status.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-table',
  standalone: true,
  imports: [ButtonStatusComponent, CommonModule],
  templateUrl: './request-table.component.html',
  styleUrl: './request-table.component.css'
})
export class RequestTableComponent {

}
