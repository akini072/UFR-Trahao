import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { EquipCategory } from './../types/equip-category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipCategoryService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  private getEquipCategories(): Observable<EquipCategory[]> {
    return this.http.get<EquipCategory[]>(this.baseUrl + 'equip-categories.json');
  }

  async getEquipCategory(id: number): Promise<EquipCategory> {
    let equipCategories = await lastValueFrom(this.getEquipCategories());

    return equipCategories.filter(equipCategory => equipCategory.equipCategoryId === id)[0];
  }

  async getEquipCategoryList(): Promise<EquipCategory[]> {
    return await lastValueFrom(this.getEquipCategories());
  }
}
