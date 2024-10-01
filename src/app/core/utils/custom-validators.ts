import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator{
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

}