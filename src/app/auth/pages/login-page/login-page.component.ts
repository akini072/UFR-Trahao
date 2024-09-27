import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FormInputComponent } from '../../../core/components/form-input/form-input.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../core/components/footer/footer.component";
import { ButtonComponent } from "../../../core/components/button/button.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormInputComponent, FooterComponent, ButtonComponent, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {
  constructor(private router: Router) { }
  signUpRouterLink: string = "/cadastro"

  onLogin() {
    //TODO: this.router.navigate(['/customer']);
  }

  main: string = "flex items-center justify-center min-h-screen bg-gray-100"
  form: string = "bg-white p-8 rounded shadow-md w-full max-w-sm";
  label: string = "block text-gray-700 text-sm font-bold mb-2";
  button: string = "flex items-center justify-between mb-4 flex md:justify-center";
  signUpSpan: string = "block text-sm text-gray-500 dark:text-neutral-400 text-center cursor-default";
  signUpRouter: string = "text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer";
  title: string = "text-2xl font-bold mb-6 text-center";
}
