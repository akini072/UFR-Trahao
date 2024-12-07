import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Request, RequestItem } from '../types';
import { RequestCreate } from '../types/request-create';
import { requestUpdate } from '../types/request-update';
import { AuthService } from '../../auth/utils/auth.service';
import { ErrorHandlingService } from './error-handling.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private baseUrl: string = environment.baseUrl;
  private authService: AuthService;

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
    this.authService = new AuthService(this.http, this.errorHandlingService);
  }

  // Método assíncrono para listar as requisições com seus detalhes
  listRequests(): Observable<RequestItem[]> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<RequestItem[]>(this.baseUrl + 'requests', { headers })
      .pipe(
        map((requests: RequestItem[]) => {
          for (let request of requests) {
            request.status = request.status.toLowerCase() as any;
            request.image = `assets/images/status/img-${request.status}.svg`;
          }
          return requests;
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorHandlingService.handleErrorResponse(error);
          return new Observable<never>((observer) => observer.error(error));
        })
      );
  }

  getRequestById(requestId: number) {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Request>(this.baseUrl + "requests/" + requestId, { headers })
      .pipe(
        map((request) => {

          for (let status of request.status) {
            status.dateTime = new Date(status.dateTime);
          }

          return request;
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorHandlingService.handleErrorResponse(error);
          return new Observable<never>((observer) => observer.error(error));
        })
      );
  }

  createRequest(request: RequestCreate): Observable<string> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    request.customerId = Number.parseInt(this.authService.getCurrentUser().sub);
    return this.http.post<{ message: string }>(this.baseUrl + "requests", request, { headers }).pipe(
      map((response) => {
        return response.message;
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorHandlingService.handleErrorResponse(error);
        return new Observable<never>((observer) => observer.error(error));
      })
    );
  }

  updateRequestStatus(update: requestUpdate){
    update.userType = this.authService.getCurrentUser().profile;
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<{ message: string }>(this.baseUrl+"requests/"+update.requestId, update, { headers }).pipe(
      map((response) => {
        return response.message;
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorHandlingService.handleErrorResponse(error);
        return new Observable<never>((observer) => observer.error(error));
      })
    );
  }
}