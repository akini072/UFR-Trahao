import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

interface NavItem {
  name: string;
  route: string;
  login?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() isLogged: boolean = true;

  constructor(private router: Router) {}

  navContainer =
    'flex flex-1 bg-primary-8 justify-between pt-2 md:h-20 md:pt-0'; //Nav
  navDiv =
    'flex flex-wrap h-full w-full items-center justify-center md:px-6 md:flex-nowrap md:justify-between'; //Div geral
  navData =
    'flex flex-wrap gap-2 align-middle justify-center items-center py-2 md:gap-4 md:flex-nowrap'; //Div logo+bem-vindo
  navLogo = 'text-3xl font-serif text-white cursor-pointer'; //logo texto
  navUserText = 'w-full text-secondary-0 text-center'; //bem-vindo
  navList = 'flex h-full w-full align-center justify-center md:gap-2 md:w-auto'; //ul botões
  navItem =
    'flex h-12 w-full bg-primary-7 hover:bg-primary-6 cursor-pointer text-center align-middle items-center justify-center md:h-full p-px md:w-full md:flex-1 md:bg-primary-8 md:hover:bg-primary-7 md:p-0'; //li botão
  navAnchor =
    'text-white h-full w-full px-2 content-center shadow-md focus:ring-1 focus:ring-white focus:outline-offset-0 md:shadow-none'; //âncora botão

  navItems: NavItem[] = [
    { name: 'Login', route: '/login' },
    { name: 'Cadastro', route: '/cadastro' },
    { name: 'Home', route: '/home', login: true },
    { name: 'Serviços', route: '/about', login: true },
  ];

  goToIndex(){
    this.router.navigate(['/']);
  }
}
