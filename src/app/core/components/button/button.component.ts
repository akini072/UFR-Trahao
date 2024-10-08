import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
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
  styleUrl: './button.component.css',
})
export class ButtonComponent implements OnInit {
  @Input() props: ButtonProps = {} as ButtonProps;

  activeProps: ButtonProps = {} as ButtonProps;

  getSize(): string {
    switch (this.activeProps.size) {
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

  ngOnInit(): void {
    this.activeProps = { ...this.props };
  }

  getClasses(): string {
    const baseClasses = `bg-${this.activeProps.color} text-${
      this.activeProps.textColor
    } rounded ${this.getSize()}`;
    const hoverClass = this.activeProps.hoverColor
      ? `hover:bg-${this.activeProps.hoverColor}`
      : '';
    const extraClasses = this.activeProps.extraClasses || '';
    return `${baseClasses} ${hoverClass} ${extraClasses}`.trim();
  }
}
