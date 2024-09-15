import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

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
  styleUrls: ['./navbar.component.css'] 
})
export class NavbarComponent {
  @Input() isLogged: boolean = true;

  navContainer = "flex flex-1 bg-primary-8 h-16 justify-between";
  navItem = "flex h-full px-2 hover:bg-primary-7 cursor-pointer text-center align-middle items-center justify-center";
  navList = "flex justify-end gap-2 h-full";
  navDiv = "flex flex-1 items-center px-6 h-full justify-between";
  navLogo = "text-3xl font-serif text-white";
  navUserText = "text-secondary-0";
  navData = "flex gap-4 align-middle justify-center items-center";

  navItems: NavItem[] = [
    { name: 'Login', route: '/login' },
    { name: 'Cadastro', route: '/cadastro' },
    { name: 'Home', route: '/home', login: true },
    { name: 'Serviços', route: '/about', login: true }
  ];
  
}