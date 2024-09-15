import { Routes } from '@angular/router';
import { LandingPageComponent } from './core/pages/landing-page/landing-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { SignInPageComponent } from './auth/pages/signin-page/signin-page.component';
import { CustomerHomepageComponent } from './costumer/pages/costumer-homepage/costumer-homepage.component';
import { NewRequestPageComponent } from './costumer/pages/new-request-page/new-request-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/customer', pathMatch: 'full' },
    { path: 'index', component: LandingPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'cadastro', component: SignInPageComponent },
    { path: 'customer', component: CustomerHomepageComponent },
    { path: 'nova-solicitacao', component: NewRequestPageComponent }
];