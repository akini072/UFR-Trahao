import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  modalFactory(){
    const modal = new ModalComponent();
    return modal.open();
  }
}
