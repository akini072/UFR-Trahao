import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { ButtonComponent } from '../../../core/components/button/button.component';

@Component({
  selector: 'app-visualize-service',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ButtonComponent, CommonModule],
  templateUrl: './visualize-service.component.html',
  styleUrl: './visualize-service.component.css'
})
export class VisualizeServiceComponent {
  onReject(){
    //Rota para o approval;
  }
  onApprove(){
    //Rota para a reject;
  }

  budgeted = true;
  finalized = false;

  button: string = "flex items-center justify-between mb-4 flex md:justify-center";
}
