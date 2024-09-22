import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscriber } from 'rxjs';
import { FormTextInputComponent } from '../form-text-input/form-text-input.component';
import { ModalType } from '../../types/modal-type';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormTextInputComponent],
  templateUrl: './modal.component.html',
})
export abstract class ModalComponent {
  title: string;
  message: string;
  label: string;
  lifeCycle!: Subscriber<string>;
  showInput!: boolean;
  showCancel!: boolean;

  screen = 'flex items-center justify-center bg-gray-700/40 z-10 fixed top-0 left-0 w-full h-full';
  modal = 'flex flex-col items-start justify-center gap-2 bg-gray-100 p-6 md:p-6 lg:p-6 xl:p-6 border-2 rounded-lg shadow-md w-full max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-2xl relative';
  header = 'flex justify-between items-center py-4 w-full flex-row-reverse';
  footer = 'flex justify-end items-center w-full gap-4';
  btnClose = 'rounded-sm p-1 hover:border-gray-200 hover:border text-gray-500 flex justify-center items-center';
  btnConfirm = 'bg-secondary-4 hover:bg-secondary-6 self-end text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
  input = 'w-full'
  titleStyle = 'text-lg font-bold';

  constructor(@Inject('data') data: { [key: string]: string }) {
    this.title = data['title'];
    this.message = data['message'];
    this.label = data['label'];
  }

  open(): Observable<string> {
    const meuObservable: Observable<string> = new Observable((observer) => {
      this.lifeCycle = observer;
    });
    return meuObservable;
  }

  close(){
    this.lifeCycle.next('close');
    this.lifeCycle.complete();
  }
  
  abstract checkModal(): { [key: string]: boolean };
  abstract resolve(): any;
}
