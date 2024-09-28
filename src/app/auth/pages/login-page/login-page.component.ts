import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FormInputComponent } from '../../../core/components/form-input/form-input.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../core/components/footer/footer.component";
import { ButtonComponent } from "../../../core/components/button/button.component";
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormInputComponent, FooterComponent, ButtonComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {
  formGroup: FormGroup;
  email: FormControl;
  password: FormControl;
  error: boolean = false;
  signUpRouterLink: string = "/cadastro"

  constructor(private router: Router) {
    this.formGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
    this.email = this.formGroup.get('email') as FormControl;
    this.password = this.formGroup.get('password') as FormControl;
  }


  onLogin = () => {
    if (this.formGroup.valid) {
      console.log({'email': this.email.value, 'password': this.password.value});
      this.router.navigate(['/customer']);
    } else {
      this.error = true;
    }
  }

  getErrorMessage() {
    const controls = this.formGroup.controls;
    const hasRequiredError = Object.values(controls).some(control => control.errors?.['required']);
  
    if (hasRequiredError) {
      return "Preencha todos os campos obrigatórios";
    }
    return "Informações inválidas";
  }

  main: string = "flex items-center justify-center bg-gray-100"
  form: string = "bg-white p-8 rounded shadow-md w-full max-w-sm my-8";
  label: string = "block text-gray-700 text-sm font-bold mb-2";
  button: string = "flex items-center justify-between flex-col gap-2 mb-4 flex md:justify-center";
  signUpSpan: string = "block text-sm text-gray-500 dark:text-neutral-400 text-center cursor-default";
  signUpRouter: string = "text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer";
  title: string = "text-2xl font-bold mb-6 text-center";
  errorStyle: string = "text-red-500 text-sm italic";
}
