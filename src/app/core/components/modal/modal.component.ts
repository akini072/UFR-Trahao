import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscriber } from 'rxjs';
import { ModalType } from '../../types/modal-type';
import { FormTextInputComponent } from '../form-text-input/form-text-input.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormTextInputComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  type!: ModalType;
  title!: string;
  message!: string;
  button!: string;
  lifeCycle!: Subscriber<string>;
  showInput: boolean = false;

  screen = 'flex items-center justify-center bg-gray-700/40 z-10 absolute top-0 left-0 w-full h-full';
  modal = 'flex flex-col items-start justify-center gap-2 bg-gray-100 p-6 md:p-8 lg:p-8 xl:p-8 border-2 rounded-lg shadow-md w-full max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-2xl relative';
  btnConfirm = 'bg-secondary-4 hover:bg-secondary-6 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline';
  input = 'w-5/6'
  titleStyle = 'text-lg font-bold';

  constructor() {
    this.title = 'Título padrão';
    this.message = 'Mensagem padrão';
    this.type = ModalType.CONFIRM;
  }

  ngOnInit() {
    this.showInput = this.type === ModalType.INPUT;
    document.body.style.overflow = 'hidden';
  }

  checkModal(): { [key: string]: boolean } {
        switch (this.type) {
      case ModalType.INPUT:
        return { [this.modal]: true, 'border-red-300': true };
      case ModalType.CONFIRM:
        return { [this.modal]: true, 'border-yellow-400': true };
      case ModalType.MESSAGE:
      default:
        return { [this.modal]: true, 'border-green-300': true };
    }
  }

  open(): Observable<string> {
    const meuObservable: Observable<string> = new Observable((observer) => {
      this.lifeCycle = observer;
    });
    return meuObservable;
  }

  close(){
    document.body.style.overflow = 'auto';
    this.lifeCycle.complete();
  }
}
