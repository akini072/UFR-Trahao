import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-testimony-card',
  standalone: true,
  imports: [],
  templateUrl: './testimony-card.component.html'
})
export class TestimonyCardComponent {
  @Input() testimony!: string;
  @Input() author: string = 'Anônimo';
}
