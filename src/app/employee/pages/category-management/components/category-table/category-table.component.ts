import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CategoryItem } from '../../category-management.component';
import {
  ButtonComponent,
  ButtonProps,
} from '../../../../../core/components/button/button.component';

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css',
})
export class CategoryTableComponent implements OnInit {
  @Input() categoriesList: CategoryItem[] = [];
  @Input() onEdit: (id: number) => void = () => {};
  @Input() onDelete: (id: number) => void = () => {};

  ngOnInit(): void {
    console.log(this.onDelete);
    console.log(this.onEdit);
  }

  style = {
    table:
      'table-auto border min-w-full border-gray-400 rounded-lg divide-gray-400 shadow',
    head: 'bg-gray-50',
    col: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
    body: 'bg-white divide-y divide-gray-200',
    idRow: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900',
    commomRow: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
    actionsContainer: 'flex gap-4 items-center justify-between',
  };

  getButtonProps = (id: number, type: 'delete' | 'edit') => {
    if (type === 'delete') {
      return {
        ...this.deleteButtonProps,
        onClick: () => this.onDelete(id),
      };
    } else {
      return {
        ...this.editButtonProps,
        onClick: () => this.onEdit(id),
      };
    }
  };

  editButtonProps: ButtonProps = {
    text: '',
    icon: 'edit',
    color: 'primary-6',
    hoverColor: 'primary-4',
    textColor: 'white',
    size: 'small',
    iconPosition: 'right',
    onClick: () => {},
  };

  deleteButtonProps: ButtonProps = {
    text: '',
    icon: 'delete',
    color: 'red-500',
    hoverColor: 'red-700',
    textColor: 'white',
    size: 'small',
    iconPosition: 'right',
    onClick: () => {},
  };
}
