import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-404-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.css'
})
export class Page404Component {

  style = {
    container: 'flex flex-col justify-between h-screen w-full',
    content: 'flex-1 flex flex-col gap-4 justify-center items-center',
    title: 'text-5xl font-bold tracking-tighter',
    info: 'text-md text-gray-600 w-1/2 text-center',
    emoji: 'text-6xl text-primary-7'
  }
}
