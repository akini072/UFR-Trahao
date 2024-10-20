import { Component, Renderer2, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { ButtonComponent, ButtonProps } from '../../../core/components/button/button.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RequestsService } from '../../../core/utils/requests.service';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { FormInputComponent } from '../../../core/components/form-input/form-input.component';
import { ModalService } from '../../../core/utils/modal.service';
import { ModalType } from '../../../core/types/modal-type';
import { ModalResponse } from '../../../core/types/modal-response';
import { Title } from '@angular/platform-browser';

export interface EmployeeItem {
  id: number;
  name: string;
  email: string;
  date: string;
}
@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
    EmployeeTableComponent,
    FormInputComponent,
  ],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.css',
})
export class EmployeeManagementComponent {
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;
  resizeListener!: () => void;
  searchQuery: string | undefined;
  activeFilters: { filter: string; value?: string }[] = [];
  displayTable: boolean = false;


  employeeList: EmployeeItem[] = [
    {
      id: 1,
      name: 'Alisson Santos',
      email: 'alisson.santos@ufpr.br',
      date: '10/08/2000',
    },
    {
      id: 2,
      name: 'Gabriel Troni',
      email: 'gabriel.troni@ufpr.br',
      date: '10/08/2000',
    },
    {
      id: 3,
      name: 'Leonardo Salgado',
      email: 'leonardo.salgado@ufpr.br',
      date: '10/08/2000',
    },
    {
      id: 4,
      name: 'Matheus Bazan',
      email: 'matheus.bazan@ufpr.br',
      date: '10/08/2000',
    },
    {
      id: 5,
      name: 'Pedro Souza',
      email: 'pedro.souza@ufpr.br',
      date: '10/08/2000',
    },
    {
      id: 6,
      name: 'Raul Bana',
      email: 'raul.bana@ufpr.br',
      date: '10/08/2000',
    },
  ];

  activeEmployeeList: EmployeeItem[] = [];

  style = {
    navbar: '',
    titleContainer: 'flex justify-between px-16 items-center',
    title: 'px-4 text-2xl font-bold text-primary-8 my-8',
    container: 'flex w-full px-4 my-8 mx-auto',
    innerContainer: 'flex justify-end  gap-4',
    searchContainer: 'flex flex-1 justify-end px-16 mb-8 gap-2',
    paginationControl: 'w-10/12 m-auto flex justify-end my-4 items-center text-center',
    pageText: 'border p-2 text-sm',
    pageTopContainer: 'flex justify-between w-full items-center px-16',
    tableDisplay: 'flex justify-center m-auto rounded-lg w-3/4',
    filterContainer: 'flex place-items-end',
    switchContainer: 'h-8',
    wrapper: 'min-h-screen py-4 bg-gray-100',
  };
  constructor(
    private modal: ModalService,
    private view: ViewContainerRef,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.updateTotalPages();
    this.updateItemsPerPage(window.innerWidth);
  }

  ngOnInit(): void {
    this.activeEmployeeList = this.employeeList;
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
    const filteredList = this.employeeList.filter((item) => {
      return this.activeFilters.every(
        (f) => item[f.filter as keyof EmployeeItem] === f.value
      );
    });

    this.activeEmployeeList = filteredList.filter((item) => {
      return Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchQuery)
      );
    });

    this.updateTotalPages();
  }

  onAddEmployee = () => {
    /* this.modal
      .open(this.view, ModalType.INPUT, {
        title: 'Adicionar categoria',
        message: 'Digite o nome da nova categoria',
        label: 'Salvar',
      })
      .subscribe((value) => {
        if (value.assert) {
          this.activeEmployeeList = [
            ...this.activeEmployeeList,
            {
              id: this.employeeList.length + 1,
              name: value.message || '',
              email: value.message || '',
              date: value.message || '',
            },
          ];
          this.updateTotalPages();
        }
      }); */
    this.router.navigate(['/funcionario/cadastro']);
  };

  updateTotalPages() {
    this.totalPages =
      Math.ceil(this.activeEmployeeList.length / this.itemsPerPage) || 1;
  }

  getPaginatedRequests(searchQuery?: string): EmployeeItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    let list = this.activeEmployeeList;

    if (searchQuery) {
      list = list.filter((item) =>
        item.name.toLocaleLowerCase().includes(searchQuery)
      );
    }

    this.activeEmployeeList = list;

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

    this.activeEmployeeList = this.employeeList.filter((item) => {
      return this.activeFilters.every(
        (f) => item[f.filter as keyof EmployeeItem] === f.value
      );
    });
  };

  onEdit = (id: number) => {
    this.router.navigate(['/funcionario/cadastro', id]);
  };

  onDelete = (id: number) => {
    if (this.activeEmployeeList.length == 1) {
      const data = {
        title: 'Ação Impossível',
        message: 'Não é permitido deletar o último funcionário',
        label: 'Ok',
      };
      this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value) => {

      });
      return;
    }
    this.modal
      .open(this.view, ModalType.CONFIRM, {
        title: 'Remover categoria',
        message: 'Tem certeza que deseja remover a categoria?',
        label: 'Remover',
      })
      .subscribe((value) => {
        if (value.assert) {
          const newActiveList = this.activeEmployeeList.filter(
            (item) => item.id !== id
          );
          this.activeEmployeeList = newActiveList as EmployeeItem[];
        }
      });
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

  newEmployeeButtonProp: ButtonProps = {
    text: 'Adicionar Funcionário',
    color: 'primary-8',
    size: 'medium',
    textColor: 'white',
    hoverColor: 'primary-6',
    onClick: this.onAddEmployee,
  };
}
