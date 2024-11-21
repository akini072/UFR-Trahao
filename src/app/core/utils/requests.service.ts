import { Observable, lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Request } from '../types/request';
import { RequestItem } from '../types/request-item';
import { AuthService } from '../../auth/utils/auth.service';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private baseUrl: string = environment.baseUrl;
  private authService: AuthService;
  private employeeService: EmployeeService;

  constructor(private http: HttpClient) {
    this.authService = new AuthService(this.http);
    this.employeeService = new EmployeeService(this.http);
  }

  // Método privado para obter a lista de requisições
  private getRequests(): Observable<Request[]> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Request[]>(this.baseUrl + 'requests', { headers });
  }

  // Método assíncrono para listar as requisições com seus detalhes
  async listRequests(): Promise<RequestItem[]> {

    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    const requests: RequestItem[] = await lastValueFrom(
      this.http.get<RequestItem[]>(this.baseUrl + 'requests', { headers })
    );

    for (let request of requests){
      request.status = request.status.toLowerCase() as any;
      request.image = `assets/images/status/img-${request.status}.svg`;
      request.client = "João Maria"
    }

    return requests;
  }

  async getRequestById(requestId: number) {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    const request: Request = await lastValueFrom(
      this.http.get<Request>(this.baseUrl + "requests/" + requestId, { headers })
    );

    request.status = request.requestStatus;

    console.log(request);

    for (let status of request.status) {
      status.dateTime = new Date(status.dateTime);
      status.inChargeEmployee = (await this.employeeService.getEmployee(status.inChargeEmployeeId || 0)).name;
    }

    return request;
  }
}