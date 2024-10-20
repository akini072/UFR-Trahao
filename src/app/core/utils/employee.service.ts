import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Employee } from '../types/employee';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  private getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'employees.json');
  }

  async getEmployee(id: number): Promise<Employee> {
    let employees = await lastValueFrom(this.getEmployees());

    return employees.filter(employee => employee.id === id)[0];
  }
}
