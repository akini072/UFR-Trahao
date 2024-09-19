import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  // Adiciona OnInit à lista de interfaces implementadas
  type!: string;
  title!: string;
  message!: string;
  button!: string;

  screen = 'flex items-center justify-center min-h-screen bg-gray-500/20';
  aproveModal =
    'flex flex-col items-center justify-center bg-white p-6 md:p-8 lg:p-10 xl:p-12 border-2 border-green-300 rounded shadow-md w-full max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl relative';
  rejectModal =
    'flex flex-col items-center justify-center bg-white p-6 md:p-8 lg:p-10 xl:p-12 border-2 border-red-300 rounded shadow-md w-full max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl relative';
  rescueModal =
    'flex flex-col items-center justify-center bg-white p-6 md:p-8 lg:p-10 xl:p-12 border-2 border-blue-400 rounded shadow-md w-full max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-3xl relative';
  justificationDefault = 'hidden items-center justify-center';
  justificationReject = 'items-center justify-center';
  btnConfirm =
    'm-1 bg-secondary-4 hover:bg-secondary-6 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline';
  textArea =
    'w-1/2 h-3/4 border border-gray-500 shadow-md resize-none p-2 box-border';

  constructor() {
    // O construtor é usado para injeção de dependências, não para inicialização de dados
  }

  ngOnInit() {
    // Código de inicialização que deve ser executado uma vez após a criação do componente
    this.checkModal(); // Chama checkModal quando o componente é inicializado
  }

  checkModal() {
    let ModalType = 'accept'; //usado apenas para teste para visualizar o modal. Alterar depois

    //modal de aceitar
    if (ModalType === 'accept') {
      const modal = document.getElementById('modal');
      const justification = document.getElementById('justificationText');

      if (modal) {
        modal.setAttribute('class', this.aproveModal);
        this.message = 'Serviço aprovado no valor de R$ xxxx';
      } else {
        console.error('Elemento modal não encontrado!');
      }

      if (justification) {
        justification.setAttribute('class', this.justificationDefault);
      } else {
        console.error('Justification não encontrado!');
      }
    }

    //modal de rejeitar
    if (ModalType === 'reject') {
      const modal = document.getElementById('modal');
      const justification = document.getElementById('justificationText');

      if (modal) {
        modal.setAttribute('class', this.rejectModal);
        this.message = 'Motivo da Rejeição:';
      } else {
        console.error('Elemento modal não encontrado!');
      }

      if (justification) {
        justification.setAttribute('class', this.justificationReject);
      } else {
        console.error('Justification não encontrado!');
      }
    }

    //modal de resgatar
    if (ModalType === 'rescue') {
      const modal = document.getElementById('modal');
      const justification = document.getElementById('justificationText');

      if (modal) {
        modal.setAttribute('class', this.rescueModal);
        this.message = 'Resgate de serviço no valor de R$ xxxx';
      } else {
        console.error('Elemento modal não encontrado!');
      }

      if (justification) {
        justification.setAttribute('class', this.justificationDefault);
      } else {
        console.error('Justification não encontrado!');
      }
    }
  }

  open(): Observable<String> {
    const meuObservable: Observable<String> = new Observable((observer) => {
      alert('Modal aberto');
      observer.next('Modal fechado');
      observer.complete();
    });
    return meuObservable;
  }
}
