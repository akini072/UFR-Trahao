import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.css',
})
export class ToggleSwitchComponent {
  @Input() onToggle: () => void = () => {};
  @Input() label: string = '';

  style = {
    container: 'flex items-center',
    label: 'mr-3 text-primary-6',
    switchContainer: 'relative inline-flex items-center cursor-pointer',
    input: 'sr-only peer',
    switchBackground: 'w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-teal-500 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 dark:bg-gray-700',
    switchThumb: 'absolute left-0 top-0 bottom-0 m-auto w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 ease-in-out transform peer-checked:translate-x-6 peer-checked:border-white dark:border-gray-600'
  };
}
