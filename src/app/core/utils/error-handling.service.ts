import { Injectable, ViewContainerRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth/utils/auth.service';
import { ModalType, ModalService } from '../components/modal';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  private view!: ViewContainerRef;

  constructor(private modal: ModalService) {
    console.log('ErrorHandlingService initialized');
  }

  public setView(view: ViewContainerRef): void {
    this.view = view;
  }

  public handleErrorResponse(error: HttpErrorResponse): void {
    if (error.status === 403) {
      AuthService.logout();
      window.location.href = '/forbidden';
    }
    if (error.status === 500) {
      window.location.href = '/internal-error';
    }
    else {
      this.modal.open(this.view, ModalType.ERROR, {
        title: 'Erro',
        message: error.error.cause || 'Erro inesperado',
        label: 'Fechar'
      }).subscribe();
    }
  }
}
