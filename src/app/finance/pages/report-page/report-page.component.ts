import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { ReportPageService } from './services/report-page.service';
import { DefaultReport, CategoryReport } from './services/report-page.service';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { GlobalTableComponent } from '../../../core/components/global-table/global-table.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-report-page',
  standalone: true,
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css'],
  providers: [ReportPageService],
  imports: [
    NavbarComponent,
    GlobalTableComponent,
    FooterComponent,
    CommonModule,
    HttpClientModule,
  ],
})
export class ReportPageComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number = 1;
  columns: any[] = [];
  reportData: { items: DefaultReport[] | CategoryReport[] } = { items: [] };
  totalRequests: number = 0;
  reportPageService: ReportPageService;
  type: 'default' | 'report' = 'default';

  style = {
    wrapper: 'wrapper-class',
    title: 'title-class',
  };

  constructor(@Inject(ReportPageService) reportPageService: ReportPageService) {
    this.reportPageService = reportPageService;
  }

  ngOnInit(): void {
    this.fetchReportData(this.type);
  }

  async fetchReportData(
    type: 'default' | 'report',
    startDate?: string,
    endDate?: string
  ) {
    try {
      const data = await this.reportPageService.getReportList(
        type,
        "2024-10-22T00:00:00",
        endDate
      );
      this.reportData.items = data;
      this.totalRequests = data.length;
      this.updateTotalPages();
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  }

  updateTotalPages() {
    this.totalPages = Math.ceil(this.totalRequests / 10);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getPaginatedRequests() {
    const startIndex = (this.currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return {
      items: this.reportData.items.slice(startIndex, endIndex),
    };
  }
}
