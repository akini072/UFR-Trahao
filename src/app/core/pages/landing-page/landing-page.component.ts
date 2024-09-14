import 'swiper/css';
import { Swiper } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  ngOnInit() {
    const swiper = new Swiper(".mySwiper", {
      loop: true,
      spaceBetween: 20,
      centeredSlides: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      modules: [Autoplay]
    });
  }
}
