import { Observable, lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RequestStatus } from '../types/request-status';
import { Request } from '../types/request';
import { RequestItem } from '../types/request-item';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  //private baseUrl: string = environment.baseUrl;
  private baseUrl: string = "assets/mocks/";

  constructor(private http: HttpClient) {}
  
  // Método privado para obter a lista de requisições
  private getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.baseUrl + 'requests.json');
  }
  
  // Método privado para obter os status das requisições
  private getRequestStatuses(): Observable<RequestStatus[]> {
    return this.http.get<RequestStatus[]>(this.baseUrl + 'requestStatuses.json');
  }

  // Método assíncrono para listar as requisições com seus detalhes
  async listRequests(): Promise<RequestItem[]> {
    const requests: Request[] = await lastValueFrom(this.getRequests());
    const statuses: RequestStatus[] = await lastValueFrom(this.getRequestStatuses());
    
    // Mapeia cada requisição para um objeto RequestItem
    const requestItems = requests.map((request: Request) => {
      // Filtra os status que correspondem ao ID da requisição atual
      const statusList = statuses.filter((status) => status.requestId === request.requestId);
      const status = statusList[statusList.length - 1]?.category;
      return {
        id: request.requestId,
        title: request.equipmentDesc,
        description: request.defectDesc,
        status: status,
        client: 'João Maria', // Cliente fixo
        created_at: `${statusList[0]?.dateTime}`,
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg==', // Imagem placeholder
      } as RequestItem;
    });
    
    return requestItems;
  }

  async getRequestById(requestId: number){
    const requests: Request[] = await lastValueFrom(this.getRequests());
    const statuses: RequestStatus[] = await lastValueFrom(this.getRequestStatuses());

    const request = requests.filter((req) => req.requestId == requestId)[0];
    request.status = statuses.filter((status) => status.requestId == request.requestId);
    for(let status of request.status){
      status.dateTime = new Date(status.dateTime);
    }

    return request;
  }
}