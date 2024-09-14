import 'swiper/css';
import { Swiper } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  ngOnInit() {
    const swiper = new Swiper(".mySwiper", {
      loop: true,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      modules: [Autoplay]
    });
  }
}
