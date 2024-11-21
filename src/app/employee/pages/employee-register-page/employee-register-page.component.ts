import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FormInputComponent } from '../../../core/components/form-input/form-input.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { ButtonComponent, ButtonProps } from '../../../core/components/button/button.component';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from "../../../core/components/date-input/date-input.component";
import { ModalService } from '../../../core/utils/modal.service';
import { ModalType } from '../../../core/types/modal-type';
import { EmployeeService } from '../../../core/utils/employee.service';
import { Employee } from '../../../core/types/employee';

@Component({
  selector: 'app-employee-register-page',
  standalone: true,
  imports: [CommonModule,
    NavbarComponent,
    FormInputComponent,
    FooterComponent,
    ButtonComponent,
    RouterModule,
    ReactiveFormsModule, DateInputComponent],
  providers: [EmployeeService],
  templateUrl: './employee-register-page.component.html',
  styleUrl: './employee-register-page.component.css'
})

export class EmployeeRegisterPageComponent implements OnInit {
  formGroup: FormGroup;
  email: FormControl;
  name: FormControl;
  birthDate: FormControl;
  password: FormControl;
  error: boolean = false;
  private employeeId: number | null = null;
  private employee: Employee = {} as Employee;
  isEditMode: boolean = false;
  modo: string = 'Registro';

  constructor(
    private modal: ModalService,
    private view: ViewContainerRef,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService) {
    this.formGroup = new FormGroup({
      email: new FormControl(''),
      name: new FormControl<string>(''),
      birthDate: new FormControl(''),
      password: new FormControl('')
    });
    this.email = this.formGroup.get('email') as FormControl;
    this.name = this.formGroup.get('name') as FormControl;
    this.birthDate = this.formGroup.get('birthDate') as FormControl;
    this.password = this.formGroup.get('password') as FormControl;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.employeeId = Number.parseInt(params.get("id") || '');
      if (this.employeeId) {
        this.modo = 'Atualização';
        this.employeeService.getEmployee(this.employeeId).then((data) => {
          this.employee = data;
          this.email.setValue(this.employee.email);
          this.name.setValue(this.employee.name + " " + this.employee.surname);
          this.birthDate.setValue(this.employee.birthDate);
          this.password.setValue(this.employee.password);
          this.isEditMode = true;
        });

      }
    });
  }

  onRegister = () => {
    if (this.formGroup.valid) {
      let nomes = this.name.value.split(" "); 
      const employee = {
        id: this.employee.id,
        email: this.email.value,
        name: nomes.shift(),
        surname: nomes.join(" "),
        birthDate: this.birthDate.value,
        password: this.password.value
      };
      this.employeeService.createEmployee(employee).subscribe((response)=>{
        this.modal.open(this.view, ModalType.MESSAGE, {
          title: 'Sucesso', message: 'Empregado criado', label: 'Ok'
        }).subscribe(ok => {
          this.router.navigate(['/funcionario/funcionarios']);
        });
      });
    } else {
      this.error = true;
    }
  }

  onUpdate = () => {
    if (this.formGroup.valid) {
      let nomes = this.name.value.split(" "); 
      const employee = {
        id: this.employee.id,
        email: this.email.value,
        name: nomes.shift(),
        surname: nomes.join(" "),
        birthDate: this.birthDate.value,
        password: this.password.value
      };
      this.employeeService.updateEmployee(employee).subscribe((response)=>{
        this.modal.open(this.view, ModalType.MESSAGE, {
          title: 'Sucesso', message: 'Empregado atualizado', label: 'Ok'
        }).subscribe(ok => {
          this.router.navigate(['/funcionario/funcionarios']);
        });
      });
    } else {
      this.error = true;
    }
  }

  onDelete = () => {
    const data = {
      title: 'Excluir funcionário',
      message: 'Essa ação não pode ser desfeita. Deseja excluir o funcionário?',
      label: 'Ok',
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value) => {
      this.router.navigate(['/funcionario/funcionarios']);
    });
  }

  getErrorMessage() {
    const controls = this.formGroup.controls;
    const hasRequiredError = Object.values(controls).some(
      (control) => control.errors?.['required']
    );

    if (hasRequiredError) {
      return 'Preencha todos os campos obrigatórios';
    }
    return 'Informações inválidas';
  }

  style = {
    main: 'flex items-center justify-center bg-gray-100 h-screen',
    form: 'bg-white p-12 flex flex-col rounded shadow-md w-1/3 my-8',
    label: 'block text-gray-700 text-sm font-bold mb-2',
    button: 'flex flex-row justify-between md:justify-between',
    gap: 'flex flex-row gap-3',
    signUpSpan: 'block text-sm text-gray-500 dark:text-neutral-400 text-center cursor-default',
    signUpRouter: 'text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer',
    title: 'text-2xl font-bold mb-6 text-center',
    errorStyle: 'text-red-500 text-sm italic',
    requiredSpan: 'text-red-500 text-sm',
    bigger: 'flex flex-col w-2/3',
    smaller: 'flex flex-col w-1/2',
    flexRow: 'flex flex-row gap-6',
  };

  onRegisterButton: ButtonProps = {
    text: 'Cadastrar',
    color: 'secondary-4',
    size: 'medium',
    textColor: 'white',
    hoverColor: 'secondary-6',
    onClick: this.onRegister,
    extraClasses: 'font-bold focus:outline-none focus:shadow-outline'
  }

  onUpdateButton: ButtonProps = {
    text: 'Atualizar',
    color: 'secondary-4',
    size: 'medium',
    textColor: 'white',
    hoverColor: 'secondary-6',
    onClick: this.onUpdate,
    extraClasses: 'font-bold focus:outline-none focus:shadow-outline'
  }

  onCancelButton: ButtonProps = {
    text: 'Cancelar',
    color: 'secondary-4',
    size: 'medium',
    textColor: 'white',
    hoverColor: 'secondary-6',
    onClick: () => this.router.navigate(['/funcionario/funcionarios']),
    extraClasses: 'font-bold focus:outline-none focus:shadow-outline'
  }

  onDeleteButton: ButtonProps = {
    text: 'Excluir',
    color: 'red-500',
    size: 'medium',
    textColor: 'white',
    hoverColor: 'red-700',
    onClick: this.onDelete,
    extraClasses: 'font-bold focus:outline-none focus:shadow-outline'
  }
}
