import 'swiper/css';
import { Swiper } from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Component, ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TestimonyCardComponent } from "../../components/testimony-card/testimony-card.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ModalService } from '../../utils/modal.service';
import { ModalType } from '../../types/modal-type';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule, NavbarComponent, TestimonyCardComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  constructor(private modal: ModalService, private view: ViewContainerRef){}

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

  openModal(){
    const data = { title: 'Título do modal', message: 'Mensagem do modal', label: 'Ok' };
    this.modal.open(this.view, ModalType.MESSAGE, data).subscribe((value) => {
      console.log(value);
    });
  }
}
