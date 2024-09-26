import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarEmployeeComponent } from '../../components/navbar-employee/navbar-employee.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';

@Component({
  selector: 'app-solicitations-page',
  standalone: true,
  imports: [RouterModule, NavbarEmployeeComponent, FooterComponent],
  templateUrl: './solicitations-page.component.html',
  styleUrl: './solicitations-page.component.css',
})
export class SolicitationsPageComponent {
  //estilizações da página
  screen = 'w-screen h-screen flex flex-col';
  aroundContainer = 'w-screen h-full flex flex-col items-center';
  title =
    'text-xl font-semibold text-gray-700 text-balance w-full p-4 pb-0 text-start';
  centralContainer = 'flex items-start justify-center w-full flex-1';
  solicitationArea =
    'border-2 border-gray-600 rounded-md shadow-[0px_4px_10px_rgba(0,0,0,0.5)] m-4 w-11/12 h-5/6 overflow-x-auto';
}
