import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Employee } from '../types/employee';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/utils/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string = environment.baseUrl;
  private authService: AuthService;

  constructor(private http: HttpClient) {
    this.authService = new AuthService(this.http);
  }

  private getEmployees(): Observable<Employee[]> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Employee[]>(this.baseUrl + 'employee', { headers });
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
    return this.http.post<Employee>(this.baseUrl + 'employee', employee, { headers });
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<Employee>(this.baseUrl + 'employee/'+ employee.id, employee, { headers });
  }

  public deleteEmployee(id: number): Observable<any> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(this.baseUrl + 'employee/' + id, { headers });
  }
}
