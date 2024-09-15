import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  text: string;
  color: string;
  size: ButtonSize;
  onClick: () => void;
  textColor: string;
  hoverColor?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  extraClasses?: string;
}

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() props: ButtonProps = {} as ButtonProps;

  getSize(): string {
    switch (this.props.size) {
      case 'small':
        return 'py-1 px-2 text-center items-center text-sm';
      case 'medium':
        return 'py-2 px-4 text-center items-center text-base';
      case 'large':
        return 'py-3 px-6 text-center items-center text-lg';
      default:
        return 'py-2 px-4 text-center items-center text-base';
    }
  }

  getClasses() {
    return [
      `bg-${this.props.color}`,
      `text-${this.props.textColor}`,
      `hover:bg-${this.props.hoverColor}`,
      'rounded',
      `${this.getSize()}`,
      `${this.props.extraClasses}`,
    ].join(' ');
  }
}
