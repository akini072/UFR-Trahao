import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FormInputComponent } from '../../../core/components/form-input/form-input.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../utils/auth.service';
import { Credentials } from '../../types/credentials';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FormInputComponent,
    FooterComponent,
    ButtonComponent,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ AuthService ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  formGroup: FormGroup;
  email: FormControl;
  password: FormControl;
  error: boolean = false;
  signUpRouterLink: string = '/cadastro';

  constructor(private router: Router, private auth: AuthService) {
    this.formGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
    this.email = this.formGroup.get('email') as FormControl;
    this.password = this.formGroup.get('password') as FormControl;
  }

  onLogin = () => {
    if (this.formGroup.valid) {
      this.auth.login(this.email.value, this.password.value).subscribe({
        next: (credentials: Credentials) =>{
          switch (credentials.profile){
            case 'Employee':
              this.router.navigate(['/funcionario']);
              break;
            case 'Customer':
            default:
              this.router.navigate(['/cliente']);
              break;
          }
        },
        error: (err) => {
          console.error('Erro de login: ',err);
          this.formGroup.setErrors({credentials: true});
          this.error = true;
        },
      });
    } else {
      this.error = true;
    }
  };

  enter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onLogin();
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
    if (this.formGroup.errors?.['credentials']) {
      return 'Usuário ou senha inválidos';
    }
    return 'Informações inválidas';
  }

  style = {
    main: 'flex items-center justify-center bg-gray-100 h-screen',
    form: 'bg-white p-8 rounded shadow-md w-full max-w-sm my-8',
    label: 'block text-gray-700 text-sm font-bold mb-2',
    button:
      'flex items-center justify-between flex-col gap-2 mb-4 flex md:justify-center',
    signUpSpan:
      'block text-sm text-gray-500 dark:text-neutral-400 text-center cursor-default',
    signUpRouter:
      'text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer',
    title: 'text-2xl font-bold mb-6 text-center',
    errorStyle: 'text-red-500 text-sm italic',
    requiredSpan: 'text-red-500 text-sm',
  };
}
