import 'swiper/css';
import { Swiper } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Component, ViewContainerRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TestimonyCardComponent } from '../../components/testimony-card/testimony-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from "../../components/button/button.component";
import { CommonModule } from '@angular/common';
import { ButtonProps } from '../../components/button/button.component';
import { AuthService } from '../../../auth/utils/auth.service';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    TestimonyCardComponent,
    FooterComponent,
    ButtonComponent,
    CommonModule
  ],
  providers: [AuthService],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(private view: ViewContainerRef, private router: Router, private auth: AuthService) {}

  styles = {
    sectionGradient: 'bg-gradient-to-b from-primary-8 from-20% to-primary-4',
    navbar: 'app-navbar',
    container: 'flex justify-between items-center w-full relative',
    leftColumn: 'flex flex-col px-16 w-1/3 gap-6',
    title: 'text-4xl font-extrabold uppercase text-white text-balance',
    button: 'px-8 py-4 font-bold uppercase bg-secondary-6 text-white flex-none rounded-lg hover:bg-secondary-4',
    swiper: 'swiper mySwiper flex-none',
    sectionGray: 'px-16 p-12 bg-gray-100',
    innerContainer: 'w-2/3 px-16',
    heading: 'text-5xl font-extrabold text-primary-7 text-balance',
    paragraph: 'text-lg text-gray-700 text-balance mt-4',
    testimoniesContainer: 'flex justify-center flex-wrap gap-4 mt-8',
    testimonyCard: 'flex-none w-1/4',
    swiperWrapper:"swiper-wrapper bg-gradient-to-b max-h-min from-primary-8 from-20% to-primary-4",
    swiperImage:"swiper-slide"
  };

/*   <button class="px-8 py-4 font-bold uppercase bg-secondary-6 text-white flex-none rounded-lg hover:bg-secondary-4"
  (click)="openModal()">
  Consulte nossos serviços
  </button> */

  buttonProps: ButtonProps = {
    text: 'Consulte nossos serviços',
    color: 'secondary-6',
    hoverColor: 'secondary-4',
    textColor: 'white',
    size: 'large',
    onClick: () => {
      try {
        if(this.auth.getCurrentUser().profile == 'Customer'){
          this.router.navigate(['/cliente']);
        } else if(this.auth.getCurrentUser().profile == 'Employee'){
          this.router.navigate(['/funcionario']);
        }
      } catch (error) {
        this.router.navigate(['/login']);
      }


    },
  }

  ngOnInit() {
    const swiper = new Swiper('.mySwiper', {
      loop: true,
      spaceBetween: 20,
      centeredSlides: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      modules: [Autoplay],
    });
  }
}
