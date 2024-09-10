import { Routes } from '@angular/router';
import { IndexComponent } from './core/pages/index/index.component';
import { LoginPageComponent } from './costumer/pages/login-page/login-page.component';
import { SignInPageComponent } from './costumer/pages/signin-page/signin-page.component';
import { CustomerHomepageComponent } from './costumer/pages/costumer-homepage/costumer-homepage.component';

export const routes: Routes = [
    { path: '', redirectTo: '/customer', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'cadastro', component: SignInPageComponent },
    { path: 'customer', component: CustomerHomepageComponent }
];
