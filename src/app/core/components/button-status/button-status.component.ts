import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RequestCategory } from '../../types/request-category';
interface ButtonStatus{
  type: RequestCategory;
  name: string;
  route: string;
}

@Component({
  selector: 'app-button-status',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './button-status.component.html',
  styleUrl: './button-status.component.css'
})  

export class ButtonStatusComponent {
  @Input() status!: RequestCategory;
  @Input() color: string = 'bg-gray-300';
  
  cardButton = `text-xs p-2 cursor-pointer text-default-black font-semibold rounded`;

  buttonOptions: ButtonStatus[] = [
    { type: 'open', name: 'ABERTA', route: 'AAAA' },
    { type: 'budgeted', name: 'ORÇADA', route: '' },
    { type: 'rejected', name: 'REJEITADA', route: 'AAAA' },
    { type: 'approved', name: 'APROVADA', route: 'AAAA' },
    { type: 'redirected', name: 'REDIRECIONADA', route: '' },
    { type: 'fixed', name: 'ARRUMADA', route: 'AAAA' },
    { type: 'paid', name: 'PAGA', route: '' },
    { type: 'finalized', name: 'FINALIZADA', route: '' },
  ];	

  debugButton(){

  }

  selectButton(status: RequestCategory){
    return this.buttonOptions.find(button=> button.type === status)    
  }

}


