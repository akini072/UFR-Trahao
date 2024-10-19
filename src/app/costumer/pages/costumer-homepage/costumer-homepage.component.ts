import {
  Component,
  Renderer2,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { RequestCardComponent } from '../../components/request-card/request-card.component';
import {
  ButtonComponent,
  ButtonProps,
} from '../../../core/components/button/button.component';
import { FormInputComponent } from '../../../core/components/form-input/form-input.component';
import { RequestTableComponent } from '../../components/request-table/request-table.component';
import { FilterSectionComponent } from '../../components/filter-section/filter-section.component';
import { ToggleSwitchComponent } from '../../../core/components/toggle-switch/toggle-switch.component';
import { RequestItem } from '../../../core/types/request-item';
import { RequestsService } from '../../../core/utils/requests.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GlobalTableComponent } from '../../../core/components/global-table/global-table.component';
import { PaginationControlComponent } from '../../../core/components/pagination-control/pagination-control.component';

@Component({
  selector: 'app-costumer-homepage',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterModule,
    RequestCardComponent,
    ButtonComponent,
    FormInputComponent,
    RequestTableComponent,
    FilterSectionComponent,
    ToggleSwitchComponent,
    HttpClientModule,
    GlobalTableComponent,
    PaginationControlComponent,
  ],
  providers: [RequestsService, DatePipe],
  templateUrl: './costumer-homepage.component.html',
  styleUrls: ['./costumer-homepage.component.css'],
})
export class CustomerHomepageComponent implements OnInit, OnDestroy {
  requestList: RequestItem[] = [];

  style = {
    navbar: '',
    title: 'px-4 text-2xl font-bold text-primary-8 my-8',
    container: 'flex w-full px-4 my-8 mx-auto',
    innerContainer: 'flex justify-end  gap-4',
    searchContainer: 'flex gap-2',
    requestGrid:
      'grid grid-cols-1 w-10/12 m-auto justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-4 p-4',
    pageText: 'border p-2 text-sm',
    pageTopContainer: 'flex justify-between w-full items-center px-16',
    tableDisplay: 'flex justify-center m-auto rounded-lg w-3/4',
    filterContainer: 'flex place-items-end',
    switchContainer: 'h-8',
  };

  activeRequestList: RequestItem[] = this.requestList;

  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;
  resizeListener!: () => void;
  searchQuery: string | undefined;
  activeFilters: { filter: string; value?: string }[] = [];
  displayTable: boolean = false;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private requestsService: RequestsService,
    private http: HttpClient,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) {
    this.updateTotalPages();
    this.updateItemsPerPage(window.innerWidth);
  }

  ngOnInit(): void {
    this.requestsService.listRequests().then((data: RequestItem[]) => {
      this.requestList = data;
      this.activeRequestList = this.requestList;
    });
    this.resizeListener = this.renderer.listen('window', 'resize', (event) => {
      this.updateItemsPerPage(event.target.innerWidth);
      this.updateTotalPages();
      this.goToPage(1);
    });
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }

  updateItemsPerPage(width: number) {
    if (width >= 1200) {
      this.itemsPerPage = 9;
    } else if (width >= 992) {
      this.itemsPerPage = 6;
    } else {
      this.itemsPerPage = 3;
    }
    this.updateTotalPages();
  }

  toggleDisplayTable = () => {
    this.displayTable = !this.displayTable;
  };

  searchKeyboard(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredList = this.requestList.filter((item) => {
      return this.activeFilters.every(
        (f) => item[f.filter as keyof RequestItem] === f.value
      );
    });

    this.activeRequestList = filteredList.filter((item) => {
      return Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchQuery)
      );
    });
  }

  updateTotalPages() {
    this.totalPages =
      Math.ceil(this.activeRequestList.length / this.itemsPerPage) || 1;
  }

  getPaginatedRequests(searchQuery?: string): RequestItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    let list = this.activeRequestList;

    if (searchQuery) {
      list = list.filter(
        (item) =>
          item.description.toLocaleLowerCase().includes(searchQuery) ||
          item.title.toLocaleLowerCase().includes(searchQuery)
      );
    }

    this.activeRequestList = list;

    this.updateTotalPages();
    return list.slice(startIndex, endIndex);
  }

  nextPage = () => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.cdr.detectChanges();
    }
  };

  previousPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cdr.detectChanges();
    }
  };

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cdr.detectChanges();
    }
  }

  applyFilter = (filter: string, value?: string) => {
    const key = filter === 'date' ? 'created_at' : filter;

    const existingFilterIndex = this.activeFilters.findIndex(
      (f) => f.filter === key
    );

    if (existingFilterIndex !== -1) {
      if (!value || value === 'all' || value === '') {
        this.activeFilters.splice(existingFilterIndex, 1);
      } else {
        this.activeFilters[existingFilterIndex].value = value;
      }
    } else {
      if (value && value !== 'all' && value !== '') {
        this.activeFilters.push({ filter: key, value });
      }
    }
    
    this.activeRequestList = this.requestList.filter((item) => {
      return this.activeFilters.every(
        (f) => {
          if(key === 'created_at'){
            return this.datePipe.transform(item.created_at, 'yyyy-MM-dd') === f.value;
          }else{
            return item[f.filter as keyof RequestItem] === f.value
          }
        }
      );
    });
    
    this.cdr.detectChanges();

    this.goToPage(1);
  };

  navigateToNewRequest = () => {
    this.router.navigate(['nova-solicitacao']);
  };

  rightButtonProp: ButtonProps = {
    text: '',
    icon: 'chevron_right',
    iconPosition: 'left',
    color: 'white',
    size: 'small',
    textColor: 'black',
    extraClasses: 'border items-center text-center',
    onClick: this.nextPage,
  };
  leftButtonProp: ButtonProps = {
    text: '',
    icon: 'chevron_left',
    iconPosition: 'left',
    color: 'white',
    size: 'small',
    textColor: 'black',
    extraClasses: 'border items-center text-center',
    onClick: this.previousPage,
  };
  newRequestButtonProp: ButtonProps = {
    text: 'Nova Solicitação',
    color: 'primary-8',
    size: 'medium',
    textColor: 'white',
    hoverColor: 'primary-7',
    onClick: this.navigateToNewRequest,
  };
}
