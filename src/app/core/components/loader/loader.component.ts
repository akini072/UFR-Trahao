import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() isLoading: boolean = false;

  style = {
    loader: "relative flex justify-center w-full p-4 rounded-lg loader bg-gray-100",
    span: "block w-5 h-5 bg-gray-200 rounded-full mx-1 shadow-md even:bg-primary-8 odd:bg-secondary-5"
  }
}
