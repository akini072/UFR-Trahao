import { EquipCategoryService } from './../../../core/utils/equip-category.service';
import { Component, Renderer2, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { ButtonComponent, ButtonProps } from '../../../core/components/button/button.component';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { FormInputComponent } from '../../../core/components/form-input/form-input.component';
import { ModalService, ModalType, ModalResponse } from '../../../core/components/modal';
import { EquipCategory } from '../../../core/types/equip-category';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
  ],
  providers: [EquipCategoryService, HttpClientModule],
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

  equipCategoryList: EquipCategory[] = [];
  activeEquipCategoryList: EquipCategory[] = [];

  constructor(
    private modal: ModalService,
    private view: ViewContainerRef,
    private renderer: Renderer2,
    private equipCategoryService: EquipCategoryService,
  ) {
    this.updateTotalPages();
    this.updateItemsPerPage(window.innerWidth);
  }

  ngOnInit(): void {
    this.equipCategoryService.getEquipCategoryList().then((categories) => {
      this.equipCategoryList = categories;
      this.activeEquipCategoryList = this.equipCategoryList;
      this.updateTotalPages();
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

  updateActiveEquipCategoryList = () => {
    this.equipCategoryService.getEquipCategoryList().then((categories) => {
      this.equipCategoryList = categories;
      this.activeEquipCategoryList = this.equipCategoryList;
      this.updateTotalPages();
    });
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
    const filteredList = this.equipCategoryList.filter((item) => {
      return this.activeFilters.every(
        (f) => item[f.filter as keyof EquipCategory] === f.value
      );
    });

    this.activeEquipCategoryList = filteredList.filter((item) => {
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
          this.addCategory(value.message || '');
        }
      });
  };

  addCategory(value: string){
    if (!value) return;
    this.equipCategoryService.createEquipCategory(value).subscribe((category) => {
      this.updateActiveEquipCategoryList();
      this.modal.open(this.view, ModalType.MESSAGE, {
        title: 'Sucesso',
        message: 'Categoria criada',
        label: 'Ok',
      }).subscribe();
    });
  }

  updateTotalPages() {
    this.totalPages =
      Math.ceil(this.activeEquipCategoryList.length / this.itemsPerPage) || 1;
  }

  getPaginatedRequests(): EquipCategory[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.activeEquipCategoryList.slice(startIndex, endIndex);
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

    this.activeEquipCategoryList = this.equipCategoryList.filter((item) => {
      return this.activeFilters.every(
        (f) => item[f.filter as keyof EquipCategory] === f.value
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
          this.editCategory(id, value.message || "");
        }
      });
  };

  editCategory(id: number, value: string){
    if (!value) return;
    const equipCategory = {equipCategoryId: id, description: value, active: true}
    this.equipCategoryService.updateEquipCategory(equipCategory).subscribe((category) =>{
      this.updateActiveEquipCategoryList();
      this.modal.open(this.view, ModalType.MESSAGE, {
        title: 'Sucesso',
        message: 'Categoria editada',
        label: 'Ok',
      }).subscribe();
    })
  }

  onDelete = (id: number) => {
    this.modal
      .open(this.view, ModalType.CONFIRM, {
        title: 'Remover categoria',
        message: 'Tem certeza que deseja remover a categoria?',
        label: 'Remover',
      })
      .subscribe((value) => {
        if (value.assert) {
          this.equipCategoryService.deleteEquipCategory(id).subscribe((category) => {
            this.updateActiveEquipCategoryList();
            this.modal.open(this.view, ModalType.MESSAGE, {
              title: 'Sucesso',
              message: 'Categoria removida',
              label: 'Ok',
            }).subscribe();
          });
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

  style = {
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
    wrapper: 'min-h-screen py-4',
  };
}
