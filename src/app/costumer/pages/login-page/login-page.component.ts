import { Component } from '@angular/core';
import { RequestCardComponent } from "../../components/request-card/request-card.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RequestCardComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
