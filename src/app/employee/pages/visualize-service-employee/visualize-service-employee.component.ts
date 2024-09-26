import { Component,OnInit } from '@angular/core';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { Request } from '../../../core/types/request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visualize-service-employee',
  standalone: true,
  imports: [ButtonComponent, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './visualize-service-employee.component.html',
  styleUrl: './visualize-service-employee.component.css'
})
export class VisualizeServiceEmployeeComponent {

  open: boolean = false;
  approved: boolean = false;

  ngOnInit(){
    this.checkStatus();
  }

  checkStatus(){
    switch (this.request.status[this.request.status.length-1].category) {
      case 'open':
        this.open = true;
        this.approved = false;
        break;
      case 'approved':
        this.open = false;
        this.approved = true;
        break
      default:
        this.open = false;
        this.approved = false;
        break;
    }

  }

  request: Request = {
    requestId: 1,
    requestDesc: 'Computador travando',
    equipmentDesc: 'Notebook Lenovo velho',
    defectDesc: 'A tela parou de funcionar do nada depois de dar tela azul e eu acidentalmente acertar um soco no computador. Eu não sei o que aconteceu, mas acho que o problema é na tela ou na placa mãe ou a placa de video porque travava toda hora.',
    status: [
      {
        requestStatusId: '0',
        dateTime: new Date(),
        category: 'open', // Replace 'someCategory' with the actual category
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request // Replace with actual request object if needed
      },
      {
        requestStatusId: '1',
        dateTime: new Date(),
        category: 'budgeted', // Replace 'someCategory' with the actual category
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request // Replace with actual request object if needed
      },
      {
        requestStatusId: '2',
        dateTime: new Date(),
        category: 'budgeted', // Replace 'someCategory' with the actual category
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request // Replace with actual request object if needed
      },
      {
        requestStatusId: '3',
        dateTime: new Date(),
        category: 'approved', // Replace 'someCategory' with the actual category
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request // Replace with actual request object if needed
      }
    ],
    budget: 1500.00,
    repairDesc: '',
    customerOrientations: '',
    image: ''
  }

  onFix(){}
    //implementar a lógica para arrumar o componente. deve guardar o funcionario, data e hora
  ;

  onRedirect(){
    //implementar a lógica para passar o concerto para outro funcionario
  };

  onBudget(){
    //implementar lógica de salvar o valor do orçamento e timestamp junto do nome do funcionario
  };
}
