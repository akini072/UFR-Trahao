import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { EquipCategory } from './../../../../../core/types';
import { ButtonComponent, ButtonProps } from '../../../../../core/components';
import { GlobalTableComponent } from '../../../../../core/components/global-table/global-table.component';

@Component({
  selector: 'app-category-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent, GlobalTableComponent],
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css'],
})
export class CategoryTableComponent implements OnInit {
  @Input() categoriesList: EquipCategory[] = [];
  @Input() onEdit: (id: number) => void = () => {};
  @Input() onDelete: (id: number) => void = () => {};
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() nextPage: () => void = () => {};
  @Input() previousPage: () => void = () => {};

  columns = [
    { key: 'equipCategoryId', label: 'ID' },
    { key: 'description', label: 'CATEGORIA EQUIPAMENTO' }
  ];

  @ViewChild('actionTemplate', { static: true }) actionTemplate!: TemplateRef<any>;

  ngOnInit(): void {}

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
    color: 'secondary-6',
    hoverColor: 'secondary-4',
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
