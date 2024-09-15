import { Component } from '@angular/core';
import { NavbarComponent } from "../../../core/components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceRequestTableComponent } from '../../components/service-request-table/service-request-table.component';
import { RequestTableComponent } from '../../../request-table/request-table.component';
import { RequestCardComponent } from "../../components/request-card/request-card.component";
import { Request } from '../../../core/types/request';
import { ButtonComponent } from "../../../core/components/button/button.component";
import { FormTextInputComponent } from "../../../core/components/form-text-input/form-text-input.component";
@Component({
  selector: 'app-costumer-homepage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ServiceRequestTableComponent, RouterModule, RequestTableComponent, RequestCardComponent, ButtonComponent, FormTextInputComponent],
  templateUrl: './costumer-homepage.component.html',
  styleUrl: './costumer-homepage.component.css'
})
export class CustomerHomepageComponent {

    requestList: Request[] = [
      {
        id: 1,
        title: 'Troca de Disco Rígido',
        description: 'Substituição do disco rígido antigo por um novo SSD para melhorar o desempenho do sistema.',
        status: 'pending',
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
        status: 'canceled',
        created_at: '2024-09-05',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg=='
      },
      {
        id: 6,
        title: 'Configuração de Rede',
        description: 'Configuração de rede local e Wi-Fi para melhor conectividade.',
        status: 'pending',
        created_at: '2024-09-06',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg=='
      },
      {
        id: 7,
        title: 'Reparo de Placa Mãe',
        description: 'Diagnóstico e reparo da placa mãe do desktop.',
        status: 'approved',
        created_at: '2024-09-07',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg=='
      },
      {
        id: 8,
        title: 'Substituição de Fonte de Alimentação',
        description: 'Substituição da fonte de alimentação defeituosa por uma nova.',
        status: 'rejected',
        created_at: '2024-09-08',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAB0lEQVR42mP8/wcAAgAB/AmztHAAAAABJRU5ErkJggg=='
      }
    ];
    searchIcon: string = '<span class="material-icons">search</span>';


    navigateToNewRequest = () => {};
}
