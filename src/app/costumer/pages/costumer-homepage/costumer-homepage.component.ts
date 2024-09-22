import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { ServiceRequestTableComponent } from '../../components/service-request-table/service-request-table.component';
import { RequestTableComponent } from '../../../request-table/request-table.component';
import { RequestCardComponent } from '../../components/request-card/request-card.component';
import { Request } from '../../../core/types/request';
import { ButtonComponent } from "../../../core/components/button/button.component";
import { FormTextInputComponent } from "../../../core/components/form-text-input/form-text-input.component";

@Component({
  selector: 'app-costumer-homepage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ServiceRequestTableComponent, RouterModule, RequestTableComponent,RequestCardComponent, ButtonComponent, FormTextInputComponent],
  templateUrl: './costumer-homepage.component.html',
  styleUrls: ['./costumer-homepage.component.css'] // Corrigido para styleUrls
})
export class CustomerHomepageComponent implements OnInit, OnDestroy {
  requestList: Request[] = [
    {
      id: 1,
      title: 'Troca de Disco Rígido',
      description: 'Substituição do disco rígido antigo por um novo SSD para melhorar o desempenho do sistema.',
      status: 'open',
      created_at: '2024-09-01',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg=='
    },
    {
      id: 2,
      title: 'Atualização de Software',
      description: 'Atualização do sistema operacional e dos principais aplicativos para a versão mais recente.',
      status: 'approved',
      created_at: '2024-09-02',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg=='
    },
    {
      id: 3,
      title: 'Reparo de Tela',
      description: 'Reparo da tela quebrada do notebook.',
      status: 'rejected',
      created_at: '2024-09-03',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg=='
    },
    {
      id: 4,
      title: 'Limpeza de Sistema',
      description: 'Limpeza completa do sistema para remover poeira e melhorar a ventilação.',
      status: 'paid',
      created_at: '2024-09-04',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg=='
    },
    {
      id: 5,
      title: 'Instalação de Memória RAM',
      description: 'Instalação de memória RAM adicional para melhorar o desempenho do computador.',
      status: 'budgeted',
      created_at: '2024-09-05',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg=='
    },
    {
      id: 6,
      title: 'Configuração de Rede',
      description: 'Configuração de rede local e Wi-Fi para melhor conectividade.',
      status: 'finalized',
      created_at: '2024-09-06',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg=='
    },
    {
      id: 7,
      title: 'Reparo de Placa Mãe',
      description: 'Diagnóstico e reparo da placa mãe do desktop.',
      status: 'fixed',
      created_at: '2024-09-07',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg=='
    },
    {
      id: 8,
      title: 'Substituição de Fonte de Alimentação',
      description: 'Substituição da fonte de alimentação defeituosa por uma nova.',
      status: 'redirected',
      created_at: '2024-09-08',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg=='
    }
  ];

  style = {
    navbar: '',
    title: 'px-4 text-2xl font-bold text-primary-8 my-8',
    container: 'flex w-full px-4 my-8 mx-auto',
    innerContainer: 'flex justify-end  gap-4',
    searchContainer: 'flex gap-2',
    requestGrid: 'grid grid-cols-1 w-10/12 m-auto justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'
  };

  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;
  resizeListener!: () => void;

  constructor(private router: Router, private renderer: Renderer2) {
    this.updateTotalPages();
    this.updateItemsPerPage(window.innerWidth);
  }

  ngOnInit(): void {
    this.resizeListener = this.renderer.listen('window', 'resize', (event) => {
      this.updateItemsPerPage(event.target.innerWidth);
      this.updateTotalPages();
    });
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }

  updateItemsPerPage(width: number) {
    if (width >= 1200) {
      this.itemsPerPage = 9; // 3 colunas
    } else if (width >= 992) {
      this.itemsPerPage = 6; // 2 colunas
    } else {
      this.itemsPerPage = 3; // 1 coluna
    }
    this.updateTotalPages(); // Recalcular total de páginas após atualizar itemsPerPage
  }

  updateTotalPages() {
    this.totalPages = Math.ceil(this.requestList.length / this.itemsPerPage);
  }

  getPaginatedRequests(): Request[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log(`Paginated Requests from ${startIndex} to ${endIndex}`);
    return this.requestList.slice(startIndex, endIndex);
  }

  nextPage() {
    console.log(`Navigated to next page: ${this.currentPage}`);
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    console.log(`Navigated to previous page: ${this.currentPage}`);
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      console.log(`Navigated to page: ${this.currentPage}`);
    }
  }

  navigateToNewRequest = () => {
    this.router.navigate(['nova-solicitacao']);
  }
}