import { Component, Input } from '@angular/core';
import { Request, RequestStatus } from '../../../core/types/request';
import { CommonModule } from '@angular/common';
import { formatDate } from '../../../core/utils/formatDate';
@Component({
  selector: 'app-request-card',
  standalone: true,
  imports: [CommonModule], // Add RequestStatus to imports array
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.css'
})
export class RequestCardComponent {
  @Input() request: Request = {
    id: 0,
    title: 'Default Title',
    description: 'Default Description',
    status: 'pending',
    created_at: new Date().toISOString()
  };
  formatDate = formatDate;
 
  getColorbyStatus(status: RequestStatus):string {
    console.log('Status recebido:', status); // Log do status recebido

    let color: string;

    switch (status) {
      case 'pending':
        color = 'bg-yellow-300';
        break;
      case 'approved':
        color = 'bg-green-300';
        break;
      case 'rejected':
        color = 'bg-red-300';
        break;
      case 'canceled':
        color = 'bg-gray-300';
        break;
      case 'paid':
        color = 'bg-blue-300';
        break;
      default:
        color = 'bg-gray-300';
    }
    console.log(color);
    return color;
  }

  getStatusText(status: RequestStatus): string {
    switch(status) {
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      case 'canceled':
        return 'Cancelado';
      case 'paid':
        return 'Pago';
      default:
        return 'Indefinido';
    }
  }
  ngOnInit(): void {
    console.log('RequestCardComponent inicializado com request:', this.request);
  }

  ngAfterViewInit(): void {
    console.log('RequestCardComponent renderizado com request:', this.request);
  }
  
  style = {
    cardContainer: "w-72 h-96 border rounded-lg overflow-hidden shadow-md flex flex-col align-middle justify-center items-center",
    cardHeader: `flex w-full items-center justify-between p-3 text-center w-full`,	
    title: "text-lg text-default-black font-bold",	
    statusText: "text-sm text-default-black",
  }
}
