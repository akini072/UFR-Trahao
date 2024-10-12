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

  styles = {
    navbar: 'app-navbar',
    title: 'px-4 text-2xl font-bold text-primary-8 my-8 text-center md:text-left',
    categoriaContainer: 'categoria grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-20 max-w-4xl mx-auto p-6',
    categoriaLabel: 'text-left md:text-right',
    categoriaSelect: 'md:col-span-2 max-w-min p-2 border-2 border-black rounded bg-transparent',
    descricaoEquipamentoContainer: 'descricao-equipamento max-w-4xl mx-auto p-6',
    formContainer: 'form grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-20 max-w-4xl mx-auto',
    descricaoEquipamentoLabel: 'md:text-right',
    descricaoEquipamentoInput: 'border-2 border-black rounded p-2 col-span-2',
    remainingCharactersText: 'col-span-3 text-right mt-2',
    descricaoDefeitoContainer: 'descricao-defeito max-w-4xl mx-auto p-6',
    descricaoDefeitoLabel: 'md:text-right',
    descricaoDefeitoTextarea: 'border-2 border-black rounded p-2 col-span-2 h-40 resize-none',
    textRed: 'text-red-600'
  };
}
