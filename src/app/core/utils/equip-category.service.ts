import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { EquipCategory } from './../types/equip-category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/utils/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EquipCategoryService {
  private baseUrl: string = environment.baseUrl;
  private authService: AuthService
  constructor(private http: HttpClient) {
    this.authService = new AuthService(http);
  }

  private getEquipCategories(): Observable<EquipCategory[]> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<EquipCategory[]>(this.baseUrl + 'equipment-category', { headers });
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
    const equipCategory = { categoryDesc: description };
    return this.http.post<EquipCategory>(this.baseUrl + 'equipment-category', equipCategory, { headers });
  }

  public updateEquipCategory(equipCategory: EquipCategory): Observable<EquipCategory> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<EquipCategory>(this.baseUrl + 'equipment-category', equipCategory, { headers });
  }

  public deleteEquipCategory(id: number): Observable<any> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(this.baseUrl + 'equipment-category/' + id, { headers });
  }
}
