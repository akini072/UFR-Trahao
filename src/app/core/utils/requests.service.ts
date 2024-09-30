import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RequestItem } from '../types/request-item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  listRequests(): Observable<RequestItem[]> {
    return this.http.get<{ requests: any[] }>(this.baseUrl + 'requests.json').pipe(
      map((response) => {
        const requestMap: { [key: number]: { createdAt: string; status: string; requestDesc: string; defectDesc: string } } = {};
  
        response.requests.forEach((status) => {
          const { requestId, statusDesc, dateTime, requestDesc, defectDesc } = status;
  
          if (!requestMap[requestId]) {
            requestMap[requestId] = { 
              createdAt: dateTime, 
              status: statusDesc,
              requestDesc,
              defectDesc
            };
          } else {
            if (new Date(dateTime) < new Date(requestMap[requestId].createdAt)) {
              requestMap[requestId].createdAt = dateTime;
            }
            requestMap[requestId].status = statusDesc;
          }
        });
  
        return Object.entries(requestMap).map(([requestId, data]) => ({
          id: Number(requestId),
          title: data.requestDesc,
          description: data.defectDesc,
          status: data.status,
          created_at: data.createdAt,
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg=='
        })) as RequestItem[];
      })
    );
  }  
}