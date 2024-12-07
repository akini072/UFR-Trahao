import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, catchError } from 'rxjs';
import { Employee } from '../types/employee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/utils/auth.service';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string = environment.baseUrl;
  private authService: AuthService;

  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
    this.authService = new AuthService(this.http, this.errorHandlingService);
  }

  private getEmployees(): Observable<Employee[]> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Employee[]>(this.baseUrl + 'employee', { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandlingService.handleErrorResponse(error);
        return new Observable<never>((observer) => observer.error(error));
      })
    );
  }

  async getEmployeeList(): Promise<Employee[]> {
    return await lastValueFrom(this.getEmployees());
  }

  async getEmployee(id: number): Promise<Employee> {
    let employees = await lastValueFrom(this.getEmployees());

    return employees.filter(employee => employee.id === id)[0];
  }

  public createEmployee(employee: Employee): Observable<Employee> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<Employee>(this.baseUrl + 'employee', employee, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandlingService.handleErrorResponse(error);
        return new Observable<never>((observer) => observer.error(error));
      })
    );
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<Employee>(this.baseUrl + 'employee/'+ employee.id, employee, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandlingService.handleErrorResponse(error);
        return new Observable<never>((observer) => observer.error(error));
      })
    );
  }

  public deleteEmployee(id: number): Observable<any> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(this.baseUrl + 'employee/' + id, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandlingService.handleErrorResponse(error);
        return new Observable<never>((observer) => observer.error(error));
      })
    );
  }
}
