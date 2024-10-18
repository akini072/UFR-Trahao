import { Component, Input, OnInit } from '@angular/core';
import { ButtonProps, ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination-control',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './pagination-control.component.html',
  styleUrl: './pagination-control.component.css'
})
export class PaginationControlComponent implements OnInit {
  @Input() nextPage: () => void = () => {};
  @Input() previousPage: () => void = () => {};
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  style = {
    paginationControl:
    'w-10/12 m-auto flex justify-end my-4 items-center text-center',
    pageText: 'border p-2 text-sm',
  }


  ngOnInit(): void {
    this.rightButtonProp.onClick = this.nextPage;
    this.leftButtonProp.onClick = this.previousPage;
  }

  rightButtonProp: ButtonProps = {
    text: '',
    icon: 'chevron_right',
    iconPosition: 'left',
    color: 'white',
    size: 'small',
    textColor: 'black',
    extraClasses: 'border items-center text-center',
    onClick: ()=>{},	
  };

  leftButtonProp: ButtonProps = {
    text: '',
    icon: 'chevron_left',
    iconPosition: 'left',
    color: 'white',
    size: 'small',
    textColor: 'black',
    extraClasses: 'border items-center text-center',
    onClick: ()=>{},
  };
}
