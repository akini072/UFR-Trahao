import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { Customer } from '../types/customer';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + 'customers.json');
  }

  async getCustomer(id: number): Promise<Customer> {
    let customers = await lastValueFrom(this.getCustomers());

    return customers.filter(customer => customer.id === id)[0];
  }
}
