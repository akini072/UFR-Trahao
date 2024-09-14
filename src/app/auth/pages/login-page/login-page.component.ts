import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FormTextInputComponent } from '../../../core/components/form-text-input/form-text-input.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../core/components/footer/footer.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormTextInputComponent, FooterComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
