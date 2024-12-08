import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandlingService } from './core/utils/error-handling.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'FED-WEB2-UFPR-Trabalho-Final';

  constructor(private errorHandlingService: ErrorHandlingService, private view: ViewContainerRef) {};

  ngOnInit() {
    initFlowbite();
    this.errorHandlingService.setView(this.view);
  }
}
