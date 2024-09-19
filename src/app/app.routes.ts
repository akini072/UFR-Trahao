import { Routes } from '@angular/router';
import { LandingPageComponent } from './core/pages/landing-page/landing-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { SignupPageComponent } from './auth/pages/signup-page/signup-page.component';
import { CustomerHomepageComponent } from './costumer/pages/costumer-homepage/costumer-homepage.component';
import { NewRequestPageComponent } from './costumer/pages/new-request-page/new-request-page.component';
import { VisualizeServiceComponent } from './visualize-service/visualize-service.component';

export const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: LandingPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'cadastro', component: SignupPageComponent },
    { path: 'customer', component: CustomerHomepageComponent },
    { path: 'nova-solicitacao', component: NewRequestPageComponent },
    { path: 'visualizar-servico', component: VisualizeServiceComponent }
];
