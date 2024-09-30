import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  styles = {
    footerContainer: 'flex flex-1 bg-primary-8 text-white px-16 py-8 relative',
  };
}
