import { Injectable, ViewContainerRef, Injector, Type } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { ModalMessageComponent } from '../components/modal/modal-message/modal-message.component';
import { Observable } from 'rxjs';
import { ModalType } from '../types/modal-type';
import { ModalInputComponent } from '../components/modal/modal-input/modal-input.component';
import { ModalConfirmComponent } from '../components/modal/modal-confirm/modal-confirm.component';
import { ModalResponse } from '../types/modal-response';
import { ModalSelectEmployee } from '../components/modal/modal-select-employee/modal-select-employee.component';
import { ModalErrorComponent } from '../components/modal/modal-error/modal-error.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  type!: ModalType;

  constructor() {}

  /**
   * Abre um modal do tipo especificado e injeta os dados fornecidos.
   * @param host - O ViewContainerRef onde o modal será criado.
   * @param type - O tipo de modal a ser aberto.
   * @param data - Os dados a serem injetados no modal.
   * @returns Um Observable que emite a resposta do modal.
   */
  open(host: ViewContainerRef, type: ModalType, data: { [key: string]: any }): Observable<ModalResponse> {
    this.type = type;
    const injector = Injector.create({
      providers: [{ provide: 'data', useValue: data }]
    });

    // Cria um observable para gerenciar o ciclo de vida do modal
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

  /**
   * Retorna o tipo de componente modal apropriado com base no tipo de modal.
   * @returns O tipo de componente modal.
   */
  private modalFactory(): Type<ModalComponent> {
    switch(this.type){
      case ModalType.ERROR:
        return ModalErrorComponent;
      case ModalType.SELECT_EMPLOYEE:
        return ModalSelectEmployee;
      case ModalType.INPUT:
        return ModalInputComponent;
      case ModalType.CONFIRM:
        return ModalConfirmComponent;
      case ModalType.MESSAGE:
      default:
        return ModalMessageComponent;
    }
  }
}