import { Component, Renderer2, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import {
  ButtonComponent,
  ButtonProps,
} from '../../../core/components/button/button.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RequestsService } from '../../../core/utils/requests.service';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { FormInputComponent } from '../../../core/components/form-input/form-input.component';
import { ModalService } from '../../../core/utils/modal.service';
import { ModalType } from '../../../core/types/modal-type';
import { ModalResponse } from '../../../core/types/modal-response';

export interface CategoryItem {
  id: number;
  name: string;
}
@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
    CategoryTableComponent,
    FormInputComponent,
  ],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css',
})
export class CategoryManagementComponent {
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;
  resizeListener!: () => void;
  searchQuery: string | undefined;
  activeFilters: { filter: string; value?: string }[] = [];
  displayTable: boolean = false;

  categoryList: CategoryItem[] = [
    { id: 1, name: 'Placa-Mãe' },
    { id: 2, name: 'Processador' },
    { id: 3, name: 'Memória RAM' },
    { id: 4, name: 'Disco Rígido' },
    { id: 5, name: 'SSD' },
    { id: 6, name: 'Placa de Vídeo' },
    { id: 7, name: 'Fonte de Alimentação' },
    { id: 8, name: 'Gabinete' },
    { id: 9, name: 'Monitor' },
    { id: 10, name: 'Teclado' },
    { id: 11, name: 'Mouse' },
    { id: 12, name: 'Impressora' },
    { id: 13, name: 'Scanner' },
    { id: 14, name: 'Roteador' },
    { id: 15, name: 'Switch' },
  ];

  activeCategoryList: CategoryItem[] = [];

  style = {
    navbar: '',
    titleContainer: 'flex justify-between px-16 items-center',
    title: 'px-4 text-2xl font-bold text-primary-8 my-8',
    container: 'flex w-full px-4 my-8 mx-auto',
    innerContainer: 'flex justify-end  gap-4',
    searchContainer: 'flex flex-1 justify-end px-16 mb-8 gap-2',
    paginationControl:
      'w-10/12 m-auto flex justify-end my-4 items-center text-center',
    pageText: 'border p-2 text-sm',
    pageTopContainer: 'flex justify-between w-full items-center px-16',
    tableDisplay: 'flex justify-center m-auto rounded-lg w-3/4',
    filterContainer: 'flex place-items-end',
    switchContainer: 'h-8',
    wrapper: 'min-h-screen py-4',
  };
  constructor(
    private modal: ModalService,
    private view: ViewContainerRef,
    private renderer: Renderer2
  ) {
    this.updateTotalPages();
    this.updateItemsPerPage(window.innerWidth);
  }

  ngOnInit(): void {
    this.activeCategoryList = this.categoryList;
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
    const filteredList = this.categoryList.filter((item) => {
      return this.activeFilters.every(
        (f) => item[f.filter as keyof CategoryItem] === f.value
      );
    });

    this.activeCategoryList = filteredList.filter((item) => {
      return Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchQuery)
      );
    });

    this.updateTotalPages();
    this.goToPage(1);
  }

  onAddCategory = () => {

    this.modal
      .open(this.view, ModalType.INPUT, {
        title: 'Adicionar categoria',
        message: 'Digite o nome da nova categoria',
        label: 'Salvar',
      })
      .subscribe((value) => {
        if (value.assert) {
          this.activeCategoryList = [
            ...this.activeCategoryList,
            { id: this.activeCategoryList.length + 1, name: value.message || '' },
          ];
          this.updateTotalPages();
        }
      });
  };

  updateTotalPages() {
    this.totalPages =
      Math.ceil(this.activeCategoryList.length / this.itemsPerPage) || 1;
  }

  getPaginatedRequests(searchQuery?: string): CategoryItem[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    let list = this.activeCategoryList;

    if (searchQuery) {
      list = list.filter((item) =>
        item.name.toLocaleLowerCase().includes(searchQuery)
      );
    }

    this.activeCategoryList = list;

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

    this.activeCategoryList = this.categoryList.filter((item) => {
      return this.activeFilters.every(
        (f) => item[f.filter as keyof CategoryItem] === f.value
      );
    });
  };

  onEdit = (id: number) => {
    this.modal
      .open(this.view, ModalType.INPUT, {
        title: 'Editar Categoria',
        message: 'Altere o nome da categoria',
        label: 'Salvar',
      })
      .subscribe((value: ModalResponse) => {
        if (value.assert) {
          const newActiveList = this.activeCategoryList.map((item) => {
            if (item.id === id) {
              return { ...item, name: value.message || '' };
            }
            return item;
          });

          this.activeCategoryList = newActiveList as CategoryItem[];
        }
      });
  };

  onDelete = (id: number) => {
    this.modal
      .open(this.view, ModalType.CONFIRM, {
        title: 'Remover categoria',
        message: 'Tem certeza que deseja remover a categoria?',
        label: 'Remover',
      })
      .subscribe((value) => {
        if (value.assert) {
          const newActiveList = this.activeCategoryList.filter(
            (item) => item.id !== id
          );
          this.activeCategoryList = newActiveList as CategoryItem[];
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

  newCategoryButtonProp: ButtonProps = {
    text: 'Adicionar Categoria',
    color: 'primary-8',
    size: 'medium',
    textColor: 'white',
    hoverColor: 'primary-6',
    onClick: this.onAddCategory,
  };  
}
