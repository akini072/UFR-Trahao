import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ViaCepApiService {
  constructor(private http: HttpClient) {}

  // Função para fazer a requisição HTTP e obter o endereço pelo CEP
  public getAddress(cep: string) {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
