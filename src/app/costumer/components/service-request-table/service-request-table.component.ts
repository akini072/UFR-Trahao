import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface RequestData {
  id: number;
  equipamento: string;
  descSolicitacao: string;
  dataSolicitacao: string;
  defeito: string;
  status: string;
}

@Component({
  selector: 'app-service-request-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-request-table.component.html',
  styleUrl: './service-request-table.component.css'
})
export class ServiceRequestTableComponent {
  columns = [/* 'ID', */ 'Equipamento', 'Desc. Solicitação', 'Data Solicitação', 'Defeito' , 'Status', 'Ações'];
  data:RequestData[] = [
    { id: 1, equipamento: 'Notebook', descSolicitacao: 'Troca de HD', dataSolicitacao: '01/01/2021', defeito: 'HD com defeito', status: 'Em andamento' },
    { id: 1, equipamento: 'Impressora', descSolicitacao: 'Troca de toner', dataSolicitacao: '2023-01-01', defeito: 'Toner vazio', status: 'Pendente' },
    { id: 2, equipamento: 'Computador', descSolicitacao: 'Atualização de software', dataSolicitacao: '2023-01-02', defeito: 'Software desatualizado', status: 'Em andamento' },
    { id: 3, equipamento: 'Monitor', descSolicitacao: 'Troca de cabo', dataSolicitacao: '2023-01-03', defeito: 'Cabo danificado', status: 'Concluído' },
    { id: 4, equipamento: 'Teclado', descSolicitacao: 'Limpeza', dataSolicitacao: '2023-01-04', defeito: 'Teclas travando', status: 'Pendente' },
    { id: 5, equipamento: 'Mouse', descSolicitacao: 'Troca de bateria', dataSolicitacao: '2023-01-05', defeito: 'Bateria fraca', status: 'Em andamento' },
    { id: 6, equipamento: 'Notebook', descSolicitacao: 'Reparo de tela', dataSolicitacao: '2023-01-06', defeito: 'Tela quebrada', status: 'Concluído' },
    { id: 7, equipamento: 'Servidor', descSolicitacao: 'Manutenção preventiva', dataSolicitacao: '2023-01-07', defeito: 'Nenhum', status: 'Pendente' },
    { id: 8, equipamento: 'Roteador', descSolicitacao: 'Configuração de rede', dataSolicitacao: '2023-01-08', defeito: 'Configuração incorreta', status: 'Em andamento' },
    { id: 9, equipamento: 'Scanner', descSolicitacao: 'Reparo de motor', dataSolicitacao: '2023-01-09', defeito: 'Motor travado', status: 'Concluído' },
    { id: 10, equipamento: 'Projetor', descSolicitacao: 'Troca de lâmpada', dataSolicitacao: '2023-01-10', defeito: 'Lâmpada queimada', status: 'Pendente' }
  ];
}
