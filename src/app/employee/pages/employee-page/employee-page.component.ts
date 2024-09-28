import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarEmployeeComponent } from '../../components/navbar-employee/navbar-employee.component';
import { ServiceRequestTableComponent } from '../../components/service-request-table/service-request-table.component';
import { RequestTableComponent } from '../../../request-table/request-table.component';
import { RequestCardComponent } from '../../components/request-card/request-card.component';
import {
  ButtonComponent,
  ButtonProps,
} from '../../../core/components/button/button.component';
import { FormTextInputComponent } from '../../../core/components/form-text-input/form-text-input.component';
import { RequestCategory } from '../../../core/types/request-category';
import { FooterComponent } from '../../../core/components/footer/footer.component';

export interface RequestItem {
  id: number;
  title: string;
  description: string;
  status: RequestCategory;
  created_at: string;
  image: string;
}

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarEmployeeComponent,
    ServiceRequestTableComponent,
    RouterModule,
    RequestTableComponent,
    RequestCardComponent,
    ButtonComponent,
    FormTextInputComponent,
    FooterComponent,
  ],
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css'], // Corrigido para styleUrls
})
export class EmployeePageComponent implements OnInit, OnDestroy {
  requestList: RequestItem[] = [
    {
      id: 1,
      title: 'Troca de Disco Rígido',
      description:
        'Substituição do disco rígido antigo por um novo SSD para melhorar o desempenho do sistema.',
      status: 'open',
      created_at: '2024-09-01',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg==',
    },
    {
      id: 2,
      title: 'Atualização de Software',
      description:
        'Atualização do sistema operacional e dos principais aplicativos para a versão mais recente.',
      status: 'approved',
      created_at: '2024-09-02',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg==',
    },
    {
      id: 3,
      title: 'Reparo de Tela',
      description: 'Reparo da tela quebrada do notebook.',
      status: 'rejected',
      created_at: '2024-09-03',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg==',
    },
    {
      id: 4,
      title: 'Limpeza de Sistema',
      description:
        'Limpeza completa do sistema para remover poeira e melhorar a ventilação.',
      status: 'paid',
      created_at: '2024-09-04',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg==',
    },
    {
      id: 5,
      title: 'Instalação de Memória RAM',
      description:
        'Instalação de memória RAM adicional para melhorar o desempenho do computador.',
      status: 'budgeted',
      created_at: '2024-09-05',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg==',
    },
    {
      id: 6,
      title: 'Configuração de Rede',
      description:
        'Configuração de rede local e Wi-Fi para melhor conectividade.',
      status: 'finalized',
      created_at: '2024-09-06',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg==',
    },
    {
      id: 7,
      title: 'Reparo de Placa Mãe',
      description: 'Diagnóstico e reparo da placa mãe do desktop.',
      status: 'fixed',
      created_at: '2024-09-07',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg==',
    },
    {
      id: 8,
      title: 'Substituição de Fonte de Alimentação',
      description:
        'Substituição da fonte de alimentação defeituosa por uma nova.',
      status: 'redirected',
      created_at: '2024-09-08',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg==',
    },
  ];

  style = {
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
  };

  activeRequestList: RequestItem[] = this.requestList;

  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;
  resizeListener!: () => void;
  searchQuery: string | undefined;

  constructor(private router: Router, private renderer: Renderer2) {
    this.updateTotalPages();
    this.updateItemsPerPage(window.innerWidth);
  }

  ngOnInit(): void {
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
