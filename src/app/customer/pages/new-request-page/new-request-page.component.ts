import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../core/components/navbar/navbar.component";
import { FooterComponent } from "../../../core/components/footer/footer.component";
import { EquipCategoryService } from './../../../core/utils/equip-category.service';
import { FormInputComponent } from "../../../core/components/form-input/form-input.component";
import { EquipCategory } from '../../../core/types/equip-category';
import { ButtonComponent, ButtonProps } from '../../../core/components/button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-request-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FormInputComponent, HttpClientModule, ButtonComponent],
  providers: [EquipCategoryService],
  templateUrl: './new-request-page.component.html',
  styleUrl: './new-request-page.component.css',
})
export class NewRequestPageComponent {
  remainingCharactersEquipamento = 30;
  remainingCharactersDefeito = 255;
  remainingCharactersColorText = "";
  remainingCharactersColorTextDefect = "";
  categoryList: EquipCategory[] = [];

  constructor(private equipCategoryService: EquipCategoryService, private router: Router) {
    this.equipCategoryService.getEquipCategoryList().then((categoryList) => {
      this.categoryList = categoryList;
    });
  }

  getRemainingCharacters(limit: number, inputId: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement | HTMLTextAreaElement;
    if (inputElement) {
      const currentLength = inputElement.value.length;
      if (inputId === 'descEquip') {
        this.remainingCharactersEquipamento = (limit - currentLength > 0) ? (limit - currentLength) : 0;
        this.remainingCharactersColorText = (limit - currentLength > 5) ? "" : this.styles.textRed;
      } else if (inputId === 'descDefect') {
        this.remainingCharactersDefeito = limit - currentLength;
        this.remainingCharactersColorTextDefect = (limit - currentLength > 5) ? "" : this.styles.textRed;
      }
    }
  }

  submitButtonProps: ButtonProps = {
    text: 'Solicitar Serviço',
    color: 'secondary-4',
    hoverColor: 'secondary-6',
    textColor: 'white',
    size: 'medium',
    onClick: () => {this.navigateToCustomer()},
  }

  cancelButtonProps: ButtonProps = {
    text: 'Cancelar',
    color: 'secondary-4',
    hoverColor: 'secondary-6',
    textColor: 'white',
    size: 'medium',
    onClick: () => {this.navigateToCustomer()},
  }
  navigateToCustomer() {
    this.router.navigate(['/cliente']);
  };

  submitNewRequest(): void {
    // Implementar a lógica de envio do formulário
    this.router.navigate(['/cliente']);
  }

  styles = {
    main: 'flex items-center justify-center bg-gray-100 min-h-screen',
    formContainer: 'bg-white p-8 rounded shadow-md w-full max-w-lg',
    form: 'space-y-6',
    formGroup: 'mb-4',
    label: 'block text-gray-700 text-sm font-bold mb-2',
    select: 'block w-full p-2 border border-gray-300 rounded',
    input: 'block w-full p-2 border border-gray-300 rounded',
    textarea: 'block w-full p-2 border border-gray-300 rounded h-44',
    buttonContainer: 'flex justify-between',
    button: 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700',
    title: 'text-2xl font-bold mb-6 text-center',
    remainingCharacters: 'text-sm mt-1 text-end',
    textRed: 'text-red-500'
  };
}
