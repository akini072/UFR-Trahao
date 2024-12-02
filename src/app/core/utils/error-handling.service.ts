import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/utils/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() {}

  public static handleErrorResponse(error: HttpErrorResponse): void {
    if (error.status === 403) {
      AuthService.logout();
      window.location.href = '/forbidden';
    }
  }
}
