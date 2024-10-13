import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {
  cpfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpf = control.value?.replace(/\D/g, '');
      if (!cpf) {
        return null;
      }
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return { invalidCpf: true };
      }

      const digits = cpf.split('').map(Number);

      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += digits[i] * (10 - i);
      }
      let remainder = (sum * 10) % 11;
      if (remainder === 10) remainder = 0;
      if (remainder !== digits[9]) {
        return { invalidCpf: true };
      }

      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += digits[i] * (11 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10) remainder = 0;
      if (remainder !== digits[10]) {
        return { invalidCpf: true };
      }

      return null;
    };
  }

  cepValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cep = control.value?.replace(/\D/g, '');
      if (!cep) {
        return null;
      }
      if (cep.length !== 8) {
        return { invalidCep: true };
      }
      return null;
    };
  }

  ageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = control.value;
      if (!date) {
        return null;
      }
      const parsedDate = Date.parse(date);
      if (isNaN(parsedDate)) {
        return { invalidDate: true };
      }
      const dateObj = new Date(parsedDate);
      const currentDate = new Date();
      const minAgeDate = new Date();
      minAgeDate.setFullYear(currentDate.getFullYear() - 14);
      const maxAgeDate = new Date();
      maxAgeDate.setFullYear(currentDate.getFullYear() - 120);

      if (dateObj > minAgeDate || dateObj < maxAgeDate) {
        return { invalidDate: true };
      }

      return null;
    };
  }

}
