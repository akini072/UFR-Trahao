import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  modalFactory(host: ViewContainerRef){
    const lifeCycle: Observable<string> = new Observable((observer) => {
      const modal = host.createComponent<ModalComponent>(ModalComponent);
      const instance = modal.instance.open();
      instance.subscribe((value) => {
        if(value === 'close'){
          modal.destroy();
          observer.complete();
        }
      });
    });
    return lifeCycle;
  }
}
