import { Routes } from '@angular/router';
import { LandingPageComponent } from './core/pages/landing-page/landing-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { SignupPageComponent } from './auth/pages/signup-page/signup-page.component';
import { CustomerHomepageComponent } from './costumer/pages/costumer-homepage/costumer-homepage.component';
import { NewRequestPageComponent } from './costumer/pages/new-request-page/new-request-page.component';
import { VisualizeServiceEmployeeComponent } from './employee/pages/visualize-service-employee/visualize-service-employee.component';
import { VisualizeServiceComponent } from './costumer/pages/visualize-service/visualize-service.component';
import { EmployeePageComponent } from './employee/pages/employee-page/employee-page.component';
import { SolicitationsPageComponent } from './employee/pages/solicitations-page/solicitations-page.component';
import { CategoryManagementComponent } from './employee/pages/category-management/category-management.component';
import { EmployeeManagementComponent } from './employee/pages/employee-management/employee-management.component';

export const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'cadastro', component: SignupPageComponent },
  { path: 'customer', component: CustomerHomepageComponent },
  { path: 'nova-solicitacao', component: NewRequestPageComponent },
  {
    path: 'visualizar-empregado',
    component: VisualizeServiceEmployeeComponent,
  },
  { path: 'visualizar-servico', component: VisualizeServiceComponent },
  { path: 'pagina-funcionario', component: EmployeePageComponent },
  { path: 'solicitacoes', component: SolicitationsPageComponent },
  { path: 'categorias', component: CategoryManagementComponent },
  { path: 'funcionarios', component: EmployeeManagementComponent },
];
