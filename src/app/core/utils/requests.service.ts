import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  listRequests(): Observable<Object> {
    return this.http.get(this.baseUrl + 'Requests.json');
  }
}
