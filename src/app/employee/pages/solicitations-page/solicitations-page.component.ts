import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';

import { RequestItem } from '../../../core/types';
import { RequestsService } from '../../../core/utils/requests.service';
import { NavbarComponent, FooterComponent, ButtonProps, LoaderComponent } from '../../../core/components';
import { RequestCardComponent } from '../../components/request-card/request-card.component';
import { FormInputComponent } from '../../../core/components/form-input/form-input.component';
import { ToggleSwitchComponent } from '../../../core/components/toggle-switch/toggle-switch.component';
import { RequestTableComponent } from '../../../customer/components/request-table/request-table.component';
import { FilterSectionComponent } from '../../../customer/components/filter-section/filter-section.component';
import { PaginationControlComponent } from "../../../core/components/pagination-control/pagination-control.component";

@Component({
  selector: 'app-solicitations-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterModule,
    RequestTableComponent,
    RequestCardComponent,
    FormInputComponent,
    FooterComponent,
    FilterSectionComponent,
    ToggleSwitchComponent,
    PaginationControlComponent,
    LoaderComponent
],
  providers: [RequestsService],
  templateUrl: './solicitations-page.component.html',
  styleUrls: ['./solicitations-page.component.css'], // Corrigido para styleUrls
})
export class SolicitationsPageComponent implements OnInit, OnDestroy {
  requestList: RequestItem[] = [];

  style = {
    wrapper: "bg-gray-100",
    navbar: '',
    title: 'px-4 text-2xl font-bold text-primary-8 my-8',
    container: 'flex w-full px-4 my-8 mx-auto',
    innerContainer: 'flex justify-end  gap-4',
    searchContainer: 'flex gap-2',
    requestGrid:
      'grid grid-cols-1 w-10/12 m-auto justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-4 p-4',
    paginationControl:
      'w-10/12 m-auto flex justify-end my-4 items-center text-center',
    pageText: 'border p-2 text-sm',
    pageTopContainer: 'flex justify-between w-full items-center px-16',
    tableDisplay: 'flex justify-center m-auto rounded-lg w-3/4',
    filterContainer: 'flex place-items-end',
    switchContainer: 'h-8',
    emptyText: 'text-center text-lg text-gray-400',
    emptyContainer: 'flex justify-center items-center h-48 md:h-64 lg:h-100',
  };

  activeRequestList: RequestItem[] = this.requestList;
  activeFilters: { filter: string; value?: string }[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;
  resizeListener!: () => void;
  searchQuery: string | undefined;

  displayTable: boolean = false;
  isLoading: boolean = true;
  isEmpty: boolean = true;

  constructor(private router: Router, private renderer: Renderer2, private requestsService: RequestsService) {
    this.updateTotalPages();
    this.updateItemsPerPage(window.innerWidth);
  }

  ngOnInit(): void {
    this.requestsService.listRequests().subscribe((data: RequestItem[]) => {
      this.requestList = data.filter((item) => item.status !== 'open');
      this.activeRequestList = this.requestList;
      this.isLoading = false;
      this.isEmpty = this.requestList.length === 0;
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

  searchKeyboard = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    this.searchQuery = query ? query.toLocaleLowerCase() : '';

    if (this.searchQuery === '') {
      this.activeRequestList = this.requestList;
      this.updateTotalPages();
      this.goToPage(1);
    }
    this.isEmpty = this.activeRequestList.length === 0;
  };

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
    }
  };

  previousPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  };

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  navigateToNewRequest = () => {
    this.router.navigate(['/cliente/nova-solicitacao']);
  };

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
        (f) => item[f.filter as keyof RequestItem] === f.value
      );
    });
    this.isEmpty = this.activeRequestList.length === 0;
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
