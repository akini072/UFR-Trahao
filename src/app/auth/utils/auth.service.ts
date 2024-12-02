import { Injectable } from '@angular/core';
import { Credentials } from '../types/credentials';
import { Observable, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { CommonResponse } from '../types/commonResponse';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  public getCurrentUser(): Credentials {
    const storedString = sessionStorage.getItem('credentials');
    if (storedString == null) {
      throw Error('Nenhuma sessão ativa');
    }
    const user = JSON.parse(storedString) as Credentials;
    if (user.exp < Date.now() / 1000) {
      throw Error('Sessão expirada');
    }
    return user;
  }

  public getAuthorizationToken(): string {
    const token = sessionStorage.getItem('token');
    if (token == null) {
      throw Error('Nenhuma sessão ativa');
    }
    return token;
  }

  login(email: string, password: string): Observable<Credentials> {
    const params = { email, password };
    return this.http
      .post<Credentials>(`${this.baseUrl}auth/login`, null, {
        params,
      })
      .pipe(
        map((response) => {
          // Salvar o token na sessão
          const token = (response as any).token; // Supondo que o token seja retornado no campo 'token'
          sessionStorage.setItem('token', token);

          // Decodificar o token JWT
          const decodedToken = this.decodeToken(token);

          sessionStorage.setItem('credentials',JSON.stringify(decodedToken));
          return decodedToken;
        })
      );
  }

  signup(
    nome: string,
    sobrenome: string,
    email: string,
    cpf: string,
    telefone: string,
    cep: string,
    logradouro: string,
    cidade: string,
    estado: string,
    numero: number
  ): Observable<CommonResponse> {
    const body = {
      "name": nome, 
      "surname": sobrenome, 
      "email": email, 
      "cpf": cpf, 
      "phone": telefone, 
      "address": {
          "cep": cep, 
          "uf": estado, 
          "city": cidade, 
          "district": '',
          "street": logradouro,
          "number": numero
      }
    };
  
    return this.http.post<CommonResponse>(`${this.baseUrl}auth/register`, body, {observe : 'response'}).pipe(
      map((response) => {
        if(response.status === 201){
          return { message: 'Cadastro realizado com sucesso.', status: 201 };
        } else {
          return { message: 'Erro ao realizar o cadastro.', status: 400 };
        }
      }),
      catchError((error) => {
        console.log('Erro ao realizar o cadastro:', error);
        return of({ message: 'Erro ao realizar o cadastro.', status: 400 });
      })
    );
  }

  private decodeToken(token: string): Credentials {
    try {
      let credentials = jwtDecode(token) as Credentials;
      return credentials; // Decodifica o token JWT
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      throw error;
    }
  }

  public static logout(): void {
    sessionStorage.clear();
  }
}
