import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { NavbarComponent, FooterComponent, ButtonComponent } from '../../../core/components';
import { ViaCepApiService } from '../../utils/via-cep-api.service';
import { FormInputComponent } from '../../../core/components/form-input/form-input.component';
import { ModalService, ModalType } from '../../../core/components/modal';
import { AuthService } from '../../utils/auth.service';
import { CommonResponse } from '../../types/commonResponse';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
    HttpClientModule,
    CommonModule,
    FormInputComponent,
    ReactiveFormsModule,
  ],
  providers: [ViaCepApiService, AuthService],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  formGroup: FormGroup;
  nome: FormControl;
  sobrenome: FormControl;
  email: FormControl;
  telefone: FormControl;
  cpf: FormControl;
  cep: FormControl;
  logradouro: FormControl;
  cidade: FormControl;
  estado: FormControl;
  numero: FormControl;
  error: boolean = false;
  private cepSubject = new Subject<string>();

  constructor(
    private serviceAPI: ViaCepApiService,
    private modal: ModalService,
    private view: ViewContainerRef,
    private auth: AuthService
  ) {
    this.formGroup = new FormGroup({
      nome: new FormControl(''),
      sobrenome: new FormControl(''),
      email: new FormControl(''),
      cpf: new FormControl(''),
      telefone: new FormControl(''),
      cep: new FormControl(''),
      logradouro: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      numero: new FormControl(''),
    });
    this.nome = this.formGroup.get('nome') as FormControl;
    this.sobrenome = this.formGroup.get('sobrenome') as FormControl;
    this.email = this.formGroup.get('email') as FormControl;
    this.cpf = this.formGroup.get('cpf') as FormControl;
    this.telefone = this.formGroup.get('telefone') as FormControl;
    this.cep = this.formGroup.get('cep') as FormControl;
    this.logradouro = this.formGroup.get('logradouro') as FormControl;
    this.cidade = this.formGroup.get('cidade') as FormControl;
    this.estado = this.formGroup.get('estado') as FormControl;
    this.numero = this.formGroup.get('numero') as FormControl;

    this.cep.valueChanges.subscribe(() => {
      // Recupera o valor do CEP e remove caracteres não numéricos
      const cep = this.cep.value.replace(/\D/g, '');
      // Verifica se o CEP é válido
      if (cep && cep.length === 8) {
        // Envia o valor do CEP para o pipeline
        this.cepSubject.next(cep);
      }
    });

    // Configura o pipeline para buscar o endereço usando o CEP
    this.cepSubject
      .pipe(
        debounceTime(300), // Aguarda 300ms após o último evento antes de realizar a requisição
        switchMap((cep) => serviceAPI.getAddress(cep)) // Faz a requisição para obter o endereço
      )
      .subscribe((address) => {
        if (address && address.logradouro) {
          // Preenche os campos de endereço se a resposta for válida
          this.logradouro.setValue(address.logradouro);
          (document.getElementById('place') as HTMLInputElement).value =
            address.logradouro;
          this.cidade.setValue(address.localidade);
          (document.getElementById('city') as HTMLInputElement).value =
            address.localidade;
          this.estado.setValue(address.uf);
          (document.getElementById('state') as HTMLInputElement).value =
            address.uf;
        }
      });
  }

  onSignUp = () => {
    if (this.formGroup.valid) {
      this.auth.signup(
        this.nome.value,
        this.sobrenome.value,
        this.email.value,
        this.cpf.value.replace(/\D/g, ''),
        this.telefone.value,
        this.cep.value.replace(/\D/g, ''),
        this.logradouro.value,
        this.cidade.value,
        this.estado.value,
        parseInt(this.numero.value)
      ).subscribe({
        next: (response: CommonResponse) => {
          console.log('Response: ' + response.status + ' ' + response);
          if (response.status === 201) {
            // Exibe mensagem de sucesso se status for CREATED
            this.error = false;
            const data = {
              title: 'Cadastro bem-sucedido',
              message: 'Sua senha de 4 dígitos foi enviada por e-email',
              label: 'Ok',
            };
            this.modal.open(this.view, ModalType.MESSAGE, data).subscribe((value) => {});
          } else {
            // Caso o status não seja 201
            this.error = true;
          }
        },
        error: (err) => {
          console.error('Erro ao realizar cadastro: ', err);
          this.error = true;
        },
      });
    } else {
      this.error = true;
    }
  };

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
    screen: 'flex flex-col items-center justify-center bg-gray-100 px-4 md:px-8 lg:px-16 h-screen',
    signInBox: 'bg-white p-6 md:p-6 lg:p-10 xl:p-12 my-8 rounded shadow-md w-full max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl relative',
    title: 'text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center',
    lable: 'text-gray-700 text-sm md:text-base text-center p-1 m-2 font-bold mb-2',
    input: 'shadow appearance-none border rounded md:w-2/3 lg:w-1/2 my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
    inputBlocked: 'shadow appearance-none border border-gray-300 rounded w-full md:w-2/3 lg:w-1/2 my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100',
    button: 'bg-secondary-4 hover:bg-secondary-6 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline',
    sectionT1: 'flex flex-col md:flex-row md:justify-between w-full',
    sectionT2: 'flex flex-col items-center gap-2 md:justify-center w-full',
    sectionT3: 'flex flex-row items-center gap-2 md:justify-center w-full',
    errorStyle: 'text-red-500 text-sm italic',
    requiredSpan: 'text-red-500 text-sm'
  };
}
