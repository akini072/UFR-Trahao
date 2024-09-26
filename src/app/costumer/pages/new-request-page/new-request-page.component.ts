import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../core/components/navbar/navbar.component";
import { FooterComponent } from "../../../core/components/footer/footer.component";

@Component({
  selector: 'app-new-request-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './new-request-page.component.html',
  styleUrl: './new-request-page.component.css'
})
export class NewRequestPageComponent {
  remainingCharactersEquipamento = 30; //Caracteres restantes para atingir o limite no input de descrição do equipamento
  remainingCharactersDefeito = 255; //Caracteres restantes para atingir o limite no input de descrição do defeito

  /**
 * Atualiza a quantidade de caracteres restantes em um input/textarea cada vez que o conteúdo do campo é alterado
 * 
 * @param limit - O número máximo de caracteres permitidos
 * @param inputId - O ID do elemento de entrada (input ou textarea)
 * 
 * @returns - não retorna nenhum valor
 */
  getRemainingCharacters(limit: number, inputId: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement | HTMLTextAreaElement;
    if (inputElement) {
      const currentLength = inputElement.value.length;
      if (inputId === 'descricao-equipamento') {
        this.remainingCharactersEquipamento = limit - currentLength;
      } else if (inputId === 'descricao-defeito') {
        this.remainingCharactersDefeito = limit - currentLength;
      }
    }
  }
}
