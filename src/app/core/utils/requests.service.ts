import { Observable, lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RequestStatus } from '../types/request-status';
import { Request } from '../types/request';
import { RequestItem } from '../types/request-item';
import { RequestCategory } from '../types/request-category';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}
  
  private getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.baseUrl + 'requests.json');
  }
  
  private getRequestStatuses(): Observable<RequestStatus[]> {
    return this.http.get<RequestStatus[]>(this.baseUrl + 'requestStatuses.json');
  }

  async listRequests(): Promise<RequestItem[]> {
    const requests: Request[] = await lastValueFrom(this.getRequests());
    const statuses: RequestStatus[] = await lastValueFrom(this.getRequestStatuses());
    
    const requestItems = requests.map((request: Request) => {
      const statusList = statuses.filter((status) => status.requestId === request.requestId);
      const status = statusList[statusList.length - 1]?.category;
      return {
        id: request.requestId,
        title: request.equipmentDesc,
        description: request.defectDesc,
        status: status,
        created_at: `${statusList[0]?.dateTime}`,
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg==',
      } as RequestItem;
    });
    
    return requestItems;
  }
}