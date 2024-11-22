import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { ServiceRequestTableComponent } from '../../components/service-request-table/service-request-table.component';
import { RequestTableComponent } from '../../../customer/components/request-table/request-table.component';
import { RequestCardComponent } from '../../components/request-card/request-card.component';
import { RequestItem } from '../../../core/types/request-item';
import {
  ButtonComponent,
  ButtonProps,
} from '../../../core/components/button/button.component';
import { RequestsService } from '../../../core/utils/requests.service';
import { FormInputComponent } from '../../../core/components/form-input/form-input.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { PaginationControlComponent } from "../../../core/components/pagination-control/pagination-control.component";

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ServiceRequestTableComponent,
    RouterModule,
    RequestTableComponent,
    RequestCardComponent,
    ButtonComponent,
    FormInputComponent,
    FooterComponent,
    PaginationControlComponent
],
  providers: [RequestsService],
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css'], // Corrigido para styleUrls
})
export class EmployeePageComponent implements OnInit, OnDestroy {
  requestList: RequestItem[] = [];

  style = {
    navbar: '',
    title: 'px-4 text-2xl font-bold text-primary-8 my-8',
    container: 'flex w-full px-4 my-8 mx-auto',
    innerContainer: 'flex justify-end gap-4',
    searchContainer: 'flex gap-2',
    requestGrid:
      'grid grid-cols-1 w-10/12 mx-auto my-8 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-4 p-4',
    paginationControl:
      'w-10/12 m-auto flex justify-end my-4 items-center text-center',
    pageText: 'border p-2 text-sm',
    pageTopContainer: 'flex justify-between w-full items-center px-16',
    wrapper: 'flex flex-col min-h-screen',
  };

  activeRequestList: RequestItem[] = this.requestList;

  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;
  resizeListener!: () => void;
  searchQuery: string | undefined;

  constructor(private router: Router, private renderer: Renderer2, private requestsService: RequestsService) {
    this.updateTotalPages();
    this.updateItemsPerPage(window.innerWidth);
  }

  ngOnInit(): void {
    this.requestsService.listRequests().subscribe((data: RequestItem[]) => {
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

  searchKeyboard = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    this.searchQuery = query ? query.toLocaleLowerCase() : '';

    if (this.searchQuery === '') {
      this.activeRequestList = this.requestList.filter(
        (item) => item.status === 'open'
      ); // Filtrar apenas os status 'open'
      this.updateTotalPages();
      this.goToPage(1);
    }
  };

  updateTotalPages() {
    this.totalPages =
      Math.ceil(this.activeRequestList.length / this.itemsPerPage) || 1;
  }

  getPaginatedRequests(searchQuery?: string): RequestItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    let list = this.requestList.filter((item) => item.status === 'open'); // Filtrar apenas os status 'open'

    // Filtrar pela consulta de pesquisa, se especificada
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

  navigateToRequest = (id: number) => {
    this.router.navigate(['/funcionario/visualizar-servico', id]);
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
}
