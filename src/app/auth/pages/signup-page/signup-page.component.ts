import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NavbarComponent } from "../../../core/components/navbar/navbar.component";
import { FooterComponent } from "../../../core/components/footer/footer.component";
import { CpfMaskPipe } from '../../../core/utils/pipes/cpfMask/cpf-mask.pipe';
import { CepMaskPipe } from '../../../core/utils/pipes/cepMask/cep-mask.pipe';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [HttpClientModule, NavbarComponent, FooterComponent, CpfMaskPipe, CepMaskPipe],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  screen =
    'flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 md:px-8 lg:px-16';
  signInBox =
    'bg-white p-6 md:p-8 lg:p-10 xl:p-12 rounded shadow-md w-full max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl relative';
  title = 'text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center';
  lable =
    'text-gray-700 text-sm md:text-base text-center p-1 m-2 font-bold mb-2';
  input =
    'shadow appearance-none border rounded w-full md:w-2/3 lg:w-1/2 my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  inputBlocked =
    'shadow appearance-none border rounded w-full md:w-2/3 lg:w-1/2 my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100';
  button =
    'bg-secondary-4 hover:bg-secondary-6 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline';
  sectionT1 = 'flex flex-col md:flex-row md:justify-between w-full';
  sectionT2 = 'flex flex-col md:flex-row md:justify-center w-full';

  @ViewChild('cpfInput') cpfInput!: ElementRef;
  @ViewChild('cepInput') cepInput!: ElementRef;
  @ViewChild('errorMessage') errorMessage!: ElementRef;
  @ViewChild('cepErrorMessage') cepErrorMessage!: ElementRef;
  @ViewChild('emailErrorMessage') emailErrorMessage!: ElementRef;

  private cepSubject = new Subject<string>();
  public cpf: string = '';
  public cep: string = '';
  private cpfMaskPipe = new CpfMaskPipe();
  private cepMaskPipe = new CepMaskPipe();

  constructor(private http: HttpClient) {
    // Configura o pipeline para buscar o endereço usando o CEP
    this.cepSubject
      .pipe(
        debounceTime(300), // Aguarda 300ms após o último evento antes de realizar a requisição
        switchMap((cep) => this.getAddress(cep)) // Faz a requisição para obter o endereço
      )
      .subscribe(
        (address) => {
          if (address && address.logradouro) {
            // Preenche os campos de endereço se a resposta for válida
            (document.getElementById('place') as HTMLInputElement).value =
              address.logradouro;
            (document.getElementById('city') as HTMLInputElement).value =
              address.localidade;
            (document.getElementById('state') as HTMLInputElement).value =
              address.uf;
            this.removeCepError(); // Remove a mensagem de erro do CEP se for válido
          } else {
            this.showCepError(); // Mostra a mensagem de erro se o CEP for inválido
          }
        },
        () => {
          this.showCepError(); // Mostra a mensagem de erro se houver um erro na requisição
        }
      );
  }

  // Função chamada quando o foco sai do campo CEP
  onCepBlur() {
    const cleanedValue = this.cleanInput(
      (this.cepInput.nativeElement as HTMLInputElement).value
    );
    if (cleanedValue.length === 8) {
      this.cepSubject.next(cleanedValue); // Envia o CEP limpo para o Subject
    } else {
      this.showCepError(); // Exibe a mensagem de erro se o CEP não tiver 8 dígitos
    }
  }

  // Função chamada quando o foco sai do campo CPF
  onCpfBlur() {
    const cleanedValue = this.cleanInput(
      (this.cpfInput.nativeElement as HTMLInputElement).value
    );
    if (this.validateCpf(cleanedValue)) {
      this.removeError(); // Remove a mensagem de erro e reseta o estilo da borda
    } else {
      this.showError(); // Exibe a mensagem de erro e altera o estilo da borda
    }
  }

  // Função chamada quando o foco sai do campo de e-mail
  onEmailBlur() {
    const emailValue = (document.getElementById('email') as HTMLInputElement)
      .value;
    if (this.validateEmail(emailValue)) {
      this.removeEmailError(); // Remove a mensagem de erro se o e-mail for válido
    } else {
      this.showEmailError(); // Exibe a mensagem de erro se o e-mail for inválido
    }
  }

  // Função chamada durante a digitação no campo CPF
  onCpfInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = this.cpfMaskPipe.transform(input.value); // Atualiza o valor do campo com a máscara

    const newCursorPosition = this.calculateCursorPosition(input.value);
    input.setSelectionRange(newCursorPosition, newCursorPosition); // Restabelece a posição do cursor
  }

  // Função chamada durante a digitação no campo CEP
  onCepInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = this.cepMaskPipe.transform(input.value); // Atualiza o valor do campo com a máscara

    const newCursorPosition = this.calculateCursorPosition(input.value);
    input.setSelectionRange(newCursorPosition, newCursorPosition); // Restabelece a posição do cursor
  }

  // Remove caracteres não numéricos do valor de entrada
  private cleanInput(value: string): string {
    return value.replace(/\D/g, '');
  }

  // Função para validar CPF
  private validateCpf(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    const digits = cpf.split('').map(Number);

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== digits[9]) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += digits[i] * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== digits[10]) return false;

    return true;
  }

  // Função para validar e-mail
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Função para mostrar a mensagem de erro do CPF e alterar o estilo da borda
  private showError() {
    const cpfInputElement = this.cpfInput.nativeElement as HTMLInputElement;
    cpfInputElement.style.borderColor = 'red';
    this.errorMessage.nativeElement.style.display = 'block';
  }

  // Função para remover a mensagem de erro do CPF e resetar o estilo da borda
  private removeError() {
    const cpfInputElement = this.cpfInput.nativeElement as HTMLInputElement;
    cpfInputElement.style.borderColor = '';
    this.errorMessage.nativeElement.style.display = 'none';
  }

  // Função para mostrar a mensagem de erro do e-mail e alterar o estilo da borda
  private showEmailError() {
    const emailInputElement = document.getElementById(
      'email'
    ) as HTMLInputElement;
    emailInputElement.style.borderColor = 'red';
    this.emailErrorMessage.nativeElement.style.display = 'block';
  }

  // Função para remover a mensagem de erro do e-mail e resetar o estilo da borda
  private removeEmailError() {
    const emailInputElement = document.getElementById(
      'email'
    ) as HTMLInputElement;
    emailInputElement.style.borderColor = '';
    this.emailErrorMessage.nativeElement.style.display = 'none';
  }

  // Função para mostrar a mensagem de erro do CEP e limpar os campos de endereço
  private showCepError() {
    const cepInputElement = this.cepInput.nativeElement as HTMLInputElement;
    cepInputElement.style.borderColor = 'red';
    this.cepErrorMessage.nativeElement.style.display = 'block';
    (document.getElementById('place') as HTMLInputElement).value = '';
    (document.getElementById('city') as HTMLInputElement).value = '';
    (document.getElementById('state') as HTMLInputElement).value = '';
  }

  // Função para remover a mensagem de erro do CEP e resetar o estilo da borda
  private removeCepError() {
    const cepInputElement = this.cepInput.nativeElement as HTMLInputElement;
    cepInputElement.style.borderColor = '';
    this.cepErrorMessage.nativeElement.style.display = 'none';
  }

  // Função para fazer a requisição HTTP e obter o endereço pelo CEP
  private getAddress(cep: string) {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  private calculateCursorPosition(maskedValue: string): number {
    let newPosition = 0;
  
    // Encontra a posição do último dígito numérico
    for (let i = 0; i < maskedValue.length; i++) {
      if (/\d/.test(maskedValue[i])) { // Verifica se é um dígito
        newPosition = i+1;
      }
    }
  
    return newPosition; // Retorna a nova posição
  }
}
