import { Routes } from '@angular/router';
import { LandingPageComponent } from './core/pages/landing-page/landing-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { SignupPageComponent } from './auth/pages/signup-page/signup-page.component';
import { CustomerHomepageComponent } from './customer/pages/customer-homepage/customer-homepage.component';
import { NewRequestPageComponent } from './customer/pages/new-request-page/new-request-page.component';
import { VisualizeServiceComponent } from './customer/pages/visualize-service/visualize-service.component';
import { EmployeePageComponent } from './employee/pages/employee-page/employee-page.component';
import { SolicitationsPageComponent } from './employee/pages/solicitations-page/solicitations-page.component';
import { CategoryManagementComponent } from './employee/pages/category-management/category-management.component';
import { EmployeeManagementComponent } from './employee/pages/employee-management/employee-management.component';
import { EmployeeRegisterPageComponent } from './employee/pages/employee-register-page/employee-register-page.component';
import { VisualizeServiceEmployeeComponent } from './employee/pages/visualize-service-employee/visualize-service-employee.component';
import { ReportPageComponent } from './finance/pages/report-page/report-page.component';
import { Page404Component } from './core/pages/page404/page404.component';
import { AuthGuard } from './auth/utils/auth.guard';
import { Page403Component } from './core/pages/page403/page403.component';
import { Page500Component } from './core/pages/page500/page500.component';

export const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'cadastro', component: SignupPageComponent },
  { path: 'cliente',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CustomerHomepageComponent },
      { path: 'nova-solicitacao', component: NewRequestPageComponent },
      { path: 'visualizar-servico/:id', component: VisualizeServiceComponent },
    ],
  },
  { path: 'funcionario',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EmployeePageComponent },
      { path: 'solicitacoes', component: SolicitationsPageComponent },
      { path: 'categorias', component: CategoryManagementComponent },
      { path: 'funcionarios', component: EmployeeManagementComponent },
      { path: 'cadastro/:id', component: EmployeeRegisterPageComponent },
      { path: 'cadastro', component: EmployeeRegisterPageComponent },
      { path: 'visualizar-servico/:id', component: VisualizeServiceEmployeeComponent },
      { path: 'relatorio-mensal', component: ReportPageComponent },
    ],
  },
  { path: 'forbidden', component: Page403Component },
  { path: 'internal-error', component: Page500Component },
  { path: '**', component: Page404Component }

];
