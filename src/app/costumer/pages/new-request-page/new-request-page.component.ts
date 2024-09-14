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
  remainingCharactersEquipamento = 30;
  remainingCharactersDefeito = 200;

  getRemainingCharacters(limit: number, inputId: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement | HTMLTextAreaElement;
    if (inputElement) {
      const currentLength = inputElement.value.length;
      if (inputId === 'descricaoEquipamento') {
        this.remainingCharactersEquipamento = limit - currentLength;
      } else if (inputId === 'descricaoDefeito') {
        this.remainingCharactersDefeito = limit - currentLength;
      }
    }
  }
}
