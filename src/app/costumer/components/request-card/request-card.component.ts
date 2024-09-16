import { Component, Input } from '@angular/core';
import { Request, RequestStatus } from '../../../core/types/request';
import { CommonModule } from '@angular/common';
import { formatDate } from '../../../core/utils/formatDate';
import { getLimitedDescription } from '../../../core/utils/formatDescription';
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
    created_at: '2021-01-01',
    image: 'https://via.placeholder.com/150'
  };
  formatDate = formatDate;
  formatDescription = getLimitedDescription;

  debugRequest(request: Request) {
    console.log('Request:', request);
  }
 
  getColorbyStatus(status: RequestStatus):string {
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
  
  

  style = {
    cardContainer: "w-80 h-96 border rounded-lg overflow-hidden shadow-md flex flex-col align-middle justify-center items-center",
    cardHeader: `flex w-full items-center justify-between p-3 w-full`,	
    title: "text-md text-default-black font-bold",	
    statusText: "text-xs text-default-black",
    cardContentContainer: "flex flex-col w-full justify-between flex-1",
    cardImageContainer: "flex justify-center h-1/2 overflow-hidden",
    cardImage: "h-4/6 ",
    cardDataContainer: "flex flex-col p-4 flex-1 border-t justify-between",
    cardData: "flex flex-col gap-4",
    cardDescription: "text-sm text-default-black",
    cardDate: "text-xs text-default-black font-semibold",
    cardButtonSection: "flex justify-end justify-self-end aling-self-end",
    cardButton: "text-xs p-2 cursor-pointer text-default-black font-semibold rounded",
  }
}
