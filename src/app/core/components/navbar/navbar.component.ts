import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../auth/utils/auth.service';

interface NavItem {
  name: string;
  route: string;
  login?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLogged: boolean;
  user: string;
  navItems: NavItem[];

  constructor(private router: Router, private auth: AuthService) {
    try {
      const credentials = this.auth.getCurrentUser();
      this.isLogged = true;
      this.user = credentials.name;
      switch (credentials.profile){
        case 'Customer':
          this.navItems = [
            { name: 'Início', route: '/customer', login: true }
          ]
          break;
        case 'Employee':
          this.navItems = [
            { name: 'Início', route: '/pagina-funcionario', login: true },
            { name: 'Solicitações', route: '/solicitacoes', login: true },
            { name: 'Funcionários', route: '/funcionarios', login: true },
            { name: 'Categorias', route: '/categorias', login: true },
            { name: 'Relatório', route: '/relatorio-mensal', login: true }
          ];
          break;
      }
    } catch (Error) {
      this.isLogged = false;
      this.navItems = [
        { name: 'Login', route: '/login' },
        { name: 'Cadastro', route: '/cadastro' },
      ];
      this.user = '';
    }
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  style = {
    navContainer: 'flex flex-1 bg-primary-8 justify-between pt-2 md:h-20 md:pt-0', //Nav
    navDiv: 'flex flex-wrap h-full w-full items-center justify-center md:px-6 md:flex-nowrap md:justify-between', //Div geral
    navData: 'flex flex-wrap gap-2 align-middle justify-center items-center py-2 md:gap-4 md:flex-nowrap', //Div logo+bem-vindo
    navLogo: 'text-3xl font-serif text-white cursor-pointer', //logo texto
    navRow: 'flex gap-2 items-center h-full', //Div botões
    navUserText: 'w-full text-secondary-0 text-center', //bem-vindo
    navList: 'flex h-full w-full align-center justify-center md:gap-2 md:w-auto', //ul botões
    navItem: 'flex h-12 w-full bg-primary-7 hover:bg-primary-6 cursor-pointer text-center align-middle items-center justify-center md:h-full p-px md:w-full md:flex-1 md:bg-primary-8 md:hover:bg-primary-7 md:p-0', //li botão
    navButton: 'inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded', //botão
    navAnchor: 'text-white h-full w-full px-2 content-center shadow-md focus:ring-1 focus:ring-white focus:outline-offset-0 md:shadow-none' //âncora botão
  }

  goToIndex() {
    this.router.navigate(['/']);
  }
}
