import { Observable, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
    const requests$ = this.http.get<{ requests: any[] }>(this.baseUrl + 'requests.json');
    const statuses$ = this.http.get<{ statuses: any[] }>(this.baseUrl + 'requestStatuses.json');
  
    return forkJoin([requests$, statuses$]).pipe(
      map(([requestsResponse, statusesResponse]) => {
        const requestMap: { [key: number]: { createdAt: string; status: string; requestDesc: string; defectDesc: string } } = {};
        requestsResponse.requests.forEach((request) => {
          const { requestId, statusDesc, dateTime, requestDesc, defectDesc } = request;
  
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
  
        statusesResponse.statuses.forEach((status) => {
          const { requestId, statusDesc } = status;
          if (requestMap[requestId]) {
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