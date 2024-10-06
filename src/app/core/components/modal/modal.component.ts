import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscriber } from 'rxjs';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalResponse } from '../../types/modal-response';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormInputComponent],
  templateUrl: './modal.component.html',
})
export abstract class ModalComponent {
  title: string;
  message: string;
  label: string;
  showInput: boolean = false;
  showCancel: boolean = false;
  error: boolean = false;
  lifeCycle!: Subscriber<ModalResponse>;
  formGroup!: FormGroup;
  inputControl!: FormControl;

  style = {
    screen: 'flex items-center justify-center bg-gray-700/40 z-10 fixed top-0 left-0 w-full h-full',
    modal: 'flex flex-col items-start justify-center gap-2 bg-gray-100 p-6 md:p-6 lg:p-6 xl:p-6 border-2 rounded-lg shadow-md w-full max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-2xl relative',
    header: 'flex justify-between items-center py-4 w-full flex-row-reverse',
    footer: 'flex justify-end items-center w-full gap-4',
    close: 'rounded-sm p-1 hover:border-gray-200 hover:border text-gray-500 flex justify-center items-center',
    button: 'bg-secondary-4 hover:bg-secondary-6 self-end text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
    input: 'w-full p-0',
    error: 'text-red-500 text-sm italic',
    title: 'text-lg font-bold',
  }

  constructor(@Inject('data') data: { [key: string]: string }) {
    this.title = data['title'];
    this.message = data['message'];
    this.label = data['label'];
  }

  open(): Observable<ModalResponse> {
    const meuObservable: Observable<ModalResponse> = new Observable((observer) => {
      this.lifeCycle = observer;
    });
    return meuObservable;
  }

  close(event: any): void{
    const target = event.target as HTMLElement;
    if (target.id === 'screen' || target.id === 'close') {
      this.lifeCycle.next({ assert: false });
      this.lifeCycle.complete();
    }
  }
  
  cancel(): void{
    this.lifeCycle.next({ assert: false });
    this.lifeCycle.complete();
  }
  
  abstract checkModal(): { [key: string]: boolean };
  abstract resolve(): void;
}
