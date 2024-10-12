import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FormInputComponent } from '../../../core/components/form-input/form-input.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-register-page',
  standalone: true,
  imports: [CommonModule,
    NavbarComponent,
    FormInputComponent,
    FooterComponent,
    ButtonComponent,
    RouterModule,
    ReactiveFormsModule],
  templateUrl: './employee-register-page.component.html',
  styleUrl: './employee-register-page.component.css'
})

export class EmployeeRegisterPageComponent {
  formGroup: FormGroup;
  email: FormControl;
  name: FormControl;
  birthDate: FormControl;
  password: FormControl;
  error: boolean = false;
  signUpRouterLink: string = '/cadastro';

  constructor(private router: Router) {
    this.formGroup = new FormGroup({
      email: new FormControl(''),
      name: new FormControl(''),
      birthDate: new FormControl(''),
      password: new FormControl(''),
    });
    this.email = this.formGroup.get('email') as FormControl;
    this.name = this.formGroup.get('name') as FormControl;
    this.birthDate = this.formGroup.get('birthDate') as FormControl;
    this.password = this.formGroup.get('password') as FormControl;
  }

  onCreate = () => {
    if (this.formGroup.valid) {
      console.log({ email: this.email.value });

      this.router.navigate(['/customer']);
    } else {
      this.error = true;
    }
  }

  getErrorMessage() {
    const controls = this.formGroup.controls;
    const hasRequiredError = Object.values(controls).some(
      (control) => control.errors?.['required']
    );

    if (hasRequiredError) {
      return 'Preencha todos os campos obrigatórios';
    }
    return 'Informações inválidas';
  }

  style = {
    main: 'flex items-center justify-center bg-gray-100 h-screen',
    form: 'bg-white p-12 flex flex-col rounded shadow-md w-1/3 my-8',
    label: 'block text-gray-700 text-sm font-bold mb-2',
    button: 'flex items-center justify-between flex-col gap-2 mb-4 flex md:justify-center',
    signUpSpan: 'block text-sm text-gray-500 dark:text-neutral-400 text-center cursor-default',
    signUpRouter: 'text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer',
    title: 'text-2xl font-bold mb-6 text-center',
    errorStyle: 'text-red-500 text-sm italic',
    requiredSpan: 'text-red-500 text-sm',
    bigger: 'flex flex-col w-2/3',
    smaller: 'flex flex-col w-1/2',
    input: 'shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 mb-6 text-gray-700 focus:outline-none focus:shadow-outline',
  };
}
