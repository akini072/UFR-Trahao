import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EmployeeItem } from '../../employee-management.component';
import { ButtonComponent, ButtonProps } from '../../../../../core/components/button/button.component';
import { GlobalTableComponent } from '../../../../../core/components/global-table/global-table.component';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent, GlobalTableComponent],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
})
export class EmployeeTableComponent implements OnInit {
  @Input() employeesList: EmployeeItem[] = [];
  @Input() onEdit: (id: number) => void = () => {};
  @Input() onDelete: (id: number) => void = () => {};
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() nextPage: () => void = () => {};
  @Input() previousPage: () => void = () => {};

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'NOME' },
    { key: 'email', label: 'E-MAIL' },
    { key: 'date', label: 'DATA DE NASCIMENTO' }
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