import { Injectable, ViewContainerRef, Injector, Type } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { ModalMessageComponent } from '../components/modal/modal-message/modal-message.component';
import { Observable } from 'rxjs';
import { ModalType } from '../types/modal-type';
import { ModalInputComponent } from '../components/modal/modal-input/modal-input.component';
import { ModalConfirmComponent } from '../components/modal/modal-confirm/modal-confirm.component';
import { ModalResponse } from '../types/modal-response';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  type!: ModalType;

  constructor() {}

  open(host: ViewContainerRef, type: ModalType, data: { [key: string]: string }): Observable<ModalResponse> {
    this.type = type;
    const injector = Injector.create({
      providers: [{ provide: 'data', useValue: data }]
    });

    const lifeCycle: Observable<ModalResponse> = new Observable((observer) => {
      const modal = host.createComponent<ModalComponent>(this.modalFactory(), {injector});
      const instance = modal.instance.open();
      instance.subscribe((value) => {
        modal.destroy();
        observer.next(value);
        observer.complete();
      });
    });
    return lifeCycle;
  }

  private modalFactory(): Type<ModalComponent>{
    switch(this.type){
      case ModalType.INPUT:
        return ModalInputComponent;
      case ModalType.CONFIRM:
        return ModalConfirmComponent
      case ModalType.MESSAGE:
      default:
        return ModalMessageComponent;
    }
  }
}
