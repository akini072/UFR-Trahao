import { Component } from '@angular/core';
import { ButtonComponent } from '../../../core/components/button/button.component';

@Component({
  selector: 'app-visualize-service-employee',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './visualize-service-employee.component.html',
  styleUrl: './visualize-service-employee.component.css'
})
export class VisualizeServiceEmployeeComponent {

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
