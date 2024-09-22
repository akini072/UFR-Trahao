import { Injectable, ViewContainerRef, Injector, Type } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { ModalMessageComponent } from '../components/modal/modal-message/modal-message.component';
import { Observable } from 'rxjs';
import { ModalType } from '../types/modal-type';
import { ModalInputComponent } from '../components/modal/modal-input/modal-input.component';
import { ModalConfirmComponent } from '../components/modal/modal-confirm/modal-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  open(host: ViewContainerRef, type: ModalType, data: { [key: string]: string }): Observable<string> {
    const injector = Injector.create({
      providers: [{ provide: 'data', useValue: data }]
    });

    const lifeCycle: Observable<string> = new Observable((observer) => {
      const modal = host.createComponent<ModalComponent>(this.modalFactory(type), {injector});
      const instance = modal.instance.open();
      instance.subscribe((value) => {
        modal.destroy();
        if(value === 'close'){
          observer.complete();
        }
      });
    });
    return lifeCycle;
  }

  private modalFactory(type: ModalType): Type<ModalComponent>{
    switch(type){
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
