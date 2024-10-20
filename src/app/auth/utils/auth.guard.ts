import { CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Credentials } from '../types/credentials';

export const AuthGuard: CanActivateFn = (route, state) => {
  console.log('AuthGuard');
  const router = new Router();
  try {
    const user = sessionStorage.getItem('credentials');
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    const credentials: Credentials = JSON.parse(user);

    switch (credentials.profile) {
      case 'Customer':
        if (state.url.startsWith('/cliente')) {
          return true;
        } else {
          router.navigate(['/cliente']);
          return false;
        }
      case 'Employee':
        if (state.url.startsWith('/funcionario')) {
          return true;
        } else {
          router.navigate(['/funcionario']);
          return false;
        }
      default:
        router.navigate(['/login']);
        return false;
    }
  } catch (error) {
    router.navigate(['/login']);
    return false;
  }
};
