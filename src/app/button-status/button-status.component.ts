import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

interface ButtStatus{
  name: string;
  route: string;
}

@Component({
  selector: 'app-button-status',
  standalone: true,
  imports: [CommonModule], // Add CommonModule to imports array
  templateUrl: './button-status.component.html',
  styleUrl: './button-status.component.css'
})
export class ButtonStatusComponent {
  buttonVisualize = "flex align-end justify-center bg-primary-2 rounded";
  buttonOrcada = "flex justify-center text-secondary-2 rounded bg-primary-4";
  buttonRejeitada = "flex justify-center text-primary-9 bg-secondary-5";
  buttonPagar = "flex justify-center rounded bg-primary-8 text-secondary-1";

  buttstatus: ButtStatus[] = [
    { name: 'Orçada', route: 'orcamento'},
    { name: 'Visualizar Serviço', route: '/servico'},
    { name: 'Rejeitada', route: '/resgatar'},
    { name: 'Pagamento', route: '/pagamento'}
  ]

 shouldDisplay(item: ButtStatus): boolean {
    // Adicionar a lógica de dependendo do status mostrar um botão ou outro
    // Algo do tipo: If status == Rejeitada:
    return item.name === 'Rejeitada';//status com mesmo nome do botão melhora a lógica
  }

}


