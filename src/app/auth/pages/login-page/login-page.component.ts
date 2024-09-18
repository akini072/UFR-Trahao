import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FormTextInputComponent } from '../../../core/components/form-text-input/form-text-input.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../core/components/footer/footer.component";
import { ButtonComponent } from "../../../core/components/button/button.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormTextInputComponent, FooterComponent, ButtonComponent, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {
  constructor(private router: Router) { }

  navigateToSignUp = () => {
    this.router.navigate(['/cadastro']);
  };

  onLogin() {
    //TODO: this.router.navigate(['/customer']);
  }

  signUpSpan = "block text-sm text-gray-500 dark:text-neutral-400 text-center";

}
