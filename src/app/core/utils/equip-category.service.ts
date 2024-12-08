import { Injectable } from '@angular/core';
import { Observable, catchError, lastValueFrom } from 'rxjs';
import { EquipCategory } from './../types/equip-category';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/utils/auth.service';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class EquipCategoryService {
  private baseUrl: string = environment.baseUrl;
  private authService: AuthService
  constructor(private http: HttpClient, private errorHandlingService: ErrorHandlingService) {
    this.authService = new AuthService(http, errorHandlingService);
  }

  private getEquipCategories(): Observable<EquipCategory[]> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<EquipCategory[]>(this.baseUrl + 'equipment-category', { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandlingService.handleErrorResponse(error);
        return new Observable<never>((observer) => observer.error(error));
      })
    );
  }

  async getEquipCategory(id: number): Promise<EquipCategory> {
    let equipCategories = await lastValueFrom(this.getEquipCategories());

    return equipCategories.filter(equipCategory => equipCategory.equipCategoryId === id)[0];
  }

  async getEquipCategoryList(): Promise<EquipCategory[]> {
    return await lastValueFrom(this.getEquipCategories());
  }

  public createEquipCategory(description: string): Observable<EquipCategory> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    const equipCategory = { description: description };
    return this.http.post<EquipCategory>(this.baseUrl + 'equipment-category', equipCategory, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandlingService.handleErrorResponse(error);
        return new Observable<never>((observer) => observer.error(error));
      })
    );
  }

  public updateEquipCategory(equipCategory: EquipCategory): Observable<EquipCategory> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<EquipCategory>(this.baseUrl + 'equipment-category', equipCategory, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandlingService.handleErrorResponse(error);
        return new Observable<never>((observer) => observer.error(error));
      })
    );
  }

  public deleteEquipCategory(id: number): Observable<any> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(this.baseUrl + 'equipment-category/' + id, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandlingService.handleErrorResponse(error);
        return new Observable<never>((observer) => observer.error(error));
      })
    );
  }
}
