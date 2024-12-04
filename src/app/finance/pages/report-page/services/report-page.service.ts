import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { DefaultReport, CategoryReport } from '../../../../core/types/report';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../auth/utils/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReportPageService {
  private baseUrl: string = 'http://localhost:8080/';
  private authService: AuthService;
  constructor(private http: HttpClient) {
    this.authService = new AuthService(http);
  }

  private getReport(
    startDate?: string,
    endDate?: string
  ): Observable<DefaultReport[]> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };

    if (endDate === undefined) {
      return this.http.get<DefaultReport[]>(
        `${this.baseUrl}requests/report?startDate=${startDate}`,
        { headers }
      );
    } else {
      return this.http.get<DefaultReport[]>(
        `${this.baseUrl}requests/report?startDate=${startDate}&endDate=${endDate}`,
        { headers }
      );
    }
  }

  private getCategoryReport(): Observable<CategoryReport[]> {
    let token = this.authService.getAuthorizationToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<CategoryReport[]>(
      `${this.baseUrl}requests/report/category`,
      { headers: {...headers, },  }
    );
  }

  async getReportList(
    type: 'default' | 'report',
    startDate?: string,
    endDate?: string
  ): Promise<DefaultReport[] | CategoryReport[]> {
    switch (type) {
      case 'default':
        return await lastValueFrom(this.getReport(startDate, endDate));
      case 'report':
        return await lastValueFrom(this.getCategoryReport());
    }
  }
}
export { CategoryReport, DefaultReport };
