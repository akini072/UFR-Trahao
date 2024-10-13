import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../core/components/navbar/navbar.component";
import { FooterComponent } from "../../../core/components/footer/footer.component";
import { FormInputComponent } from "../../../core/components/form-input/form-input.component";

@Component({
  selector: 'app-new-request-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FormInputComponent],
  templateUrl: './new-request-page.component.html',
  styleUrl: './new-request-page.component.css'
})
export class NewRequestPageComponent {
  remainingCharactersEquipamento = 30; 
  remainingCharactersDefeito = 255; 
  remainingCharactersColorText = "";
  

  getRemainingCharacters(limit: number, inputId: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement | HTMLTextAreaElement;
    console.log(inputElement.value.length);
    if (inputElement) {
      const currentLength = inputElement.value.length;
      if (inputId === 'descricao-equipamento') {
        this.remainingCharactersEquipamento = (limit - currentLength > 0) ? (limit - currentLength) : 0;
        this.remainingCharactersColorText = (limit - currentLength > 5) ? "" : this.styles.textRed;
      } else if (inputId === 'descricao-defeito') {
        this.remainingCharactersDefeito = limit - currentLength;
      }
    }
  }

  categories = [
    { value: 'cadeiraErgonomica', label: 'Cadeira ergonômica' },
    { value: 'caixaDeSomBluetooth', label: 'Caixa de som Bluetooth' },
    { value: 'cameraFotograficaProfissional', label: 'Câmera fotográfica profissional' },
    { value: 'fornoEletrico', label: 'Forno elétrico' },
    { value: 'impressoraColorida', label: 'Impressora colorida' },
    { value: 'maquinaDeCafe', label: 'Máquina de café' },
    { value: 'mouseSemFio', label: 'Mouse sem fio' },
    { value: 'notebookGamer', label: 'Notebook gamer' },
    { value: 'projetorDeAltaDefinicao', label: 'Projetor de alta definição' },
    { value: 'roteadorWifi', label: 'Roteador Wi-Fi' },
    { value: 'smartTv4k', label: 'Smart TV 4K' },
    { value: 'tabletComCanetaStylus', label: 'Tablet com caneta stylus' },
    { value: 'tecladoMecanico', label: 'Teclado mecânico' },
    { value: 'ventiladorDeTeto', label: 'Ventilador de teto' }
  ];


  styles = {
    navbar: 'app-navbar',
    title: 'px-4 text-2xl font-bold text-primary-8 my-8 text-center md:text-left',
    categoriaContainer: 'descricao-equipamento max-w-4xl mx-auto p-6 flex flex-col gap-4',
    categoriaLabel: 'text-left ',
    categoriaSelect: 'max-w-min p-2 border-2 border-black rounded bg-transparent',
    descricaoEquipamentoContainer: 'descricao-equipamento max-w-4xl mx-auto p-6',
    formContainer: 'form flex flex-col gap-4 justify-center',
    descricaoEquipamentoLabel: '',
    descricaoEquipamentoInput: 'border-2 border-black rounded p-2 col-span-2',
    remainingCharactersText: 'mt-2',
    descricaoDefeitoContainer: 'descricao-defeito max-w-4xl mx-auto p-6',
    descricaoDefeitoLabel: '',
    descricaoDefeitoTextarea: 'border-2 border-black rounded p-2 col-span-2 h-40 resize-none',
    textRed: 'text-red-600'
  };
}
