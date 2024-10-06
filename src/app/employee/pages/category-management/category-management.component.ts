import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarEmployeeComponent } from '../../components/navbar-employee/navbar-employee.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { ButtonComponent, ButtonProps } from '../../../core/components/button/button.component';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [CommonModule, NavbarEmployeeComponent, FooterComponent, ButtonComponent],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css'
})
export class CategoryManagementComponent {

  style = {
    titleContainer: 'flex justify-between',
    title: 'px-4 text-2xl font-bold text-primary-8 my-8',
    button: 'bg-blue-600 text-white font-semibold py-1 px-3 rounded shadow-md m-5 hover:bg-blue-700 transition duration-200 flex items-center',
    buttonIcon: 'mr-2',
    container: 'h-auto w-4/5 mx-auto bg-white shadow-lg rounded-lg p-6',
    innerContainer: 'h-auto overflow-x-auto',
    table: 'min-w-full h-auto bg-white border border-gray-300 rounded-lg',
    tableHeader: 'w-full',
    tableHeaderRow: 'bg-gray-100 grid grid-cols-6 w-full',
    tableHeaderSmallCell: 'py-2 px-4 border-b col-span-1',
    tableHeaderLargeCell: 'py-2 px-4 border-b col-span-4',
    tableHeaderCellDiv: 'flex flex-col gap-3',
    columnName: 'flex flex-row justify-center gap-3 hover:cursor-pointer',
    arrowIcon: 'h-4 w-4 m-1',
    searchInput: 'border rounded p-1',
    tableBody: 'block min-h-60',
    tableBodyRow: 'grid grid-cols-6 hover:bg-gray-50',
    tableBodyId: 'col-span-1 py-2 px-4 border-b text-center',
    tableBodyDescription: 'col-span-4 py-2 px-4 border-b',
    tableBodyActions: 'flex justify-center gap-4 col-span-1 py-2 px-4 border-b text-center',
    actionIcon: 'inline h-5 w-5 mr-2',
    tableFooter: 'py-2 px-4 border-t text-right font-semibold',
    paginationControl: 'w-10/12 m-auto flex justify-end my-4 items-center text-center',
    pageText: 'border p-2 text-sm'
  };

  rightButtonProp: ButtonProps = {
    text: '',
    icon: 'chevron_right',
    iconPosition: 'left',
    color: 'white',
    size: 'small',
    textColor: 'black',
    extraClasses: 'border items-center text-center',
    onClick: () => {},
  };
  
  leftButtonProp: ButtonProps = {
    text: '',
    icon: 'chevron_left',
    iconPosition: 'left',
    color: 'white',
    size: 'small',
    textColor: 'black',
    extraClasses: 'border items-center text-center',
    onClick: () => {}
  };
}
