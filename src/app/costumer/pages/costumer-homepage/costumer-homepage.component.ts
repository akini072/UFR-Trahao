import { Component } from '@angular/core';
import { NavbarComponent } from "../../../core/components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceRequestTableComponent } from '../../components/service-request-table/service-request-table.component';
import { ButtonStatusComponent } from '../../../core/components/button-status/button-status.component';
import { RequestCardComponent } from "../../components/request-card/request-card.component";
import { Request } from '../../../core/types/request';
@Component({
  selector: 'app-costumer-homepage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ServiceRequestTableComponent, RouterModule, ButtonStatusComponent, RequestCardComponent],
  templateUrl: './costumer-homepage.component.html',
  styleUrl: './costumer-homepage.component.css'
})
export class CustomerHomepageComponent {
  requestList: Request[] = [
    { 
      id: 1,
      title: 'Serviço 1',
      description: 'Descrição do serviço 1',
      status: 'pending',
      created_at: '2021-06-01'
    },
    {
      id: 2,
      title: 'Serviço 2',
      description: 'Descrição do serviço 2',
      status: 'approved',
      created_at: '2021-06-02'
    },
    {
      id: 3,
      title: 'Serviço 3',
      description: 'Descrição do serviço 3',
      status: 'rejected',
      created_at: '2021-06-03'
    },
    {
      id: 4,
      title: 'Serviço 4',
      description: 'Descrição do serviço 4',
      status: 'paid',
      created_at: '2021-06-04'
    },
    {
      id: 5,
      title: 'Serviço 5',
      description: 'Descrição do serviço 5',
      status: 'canceled',
      created_at: '2021-06-05'
    }
  ];
}
