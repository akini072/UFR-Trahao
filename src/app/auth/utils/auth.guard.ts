import { CanActivateFn, Router } from '@angular/router';
import { Credentials } from '../types/credentials';

/**
 * Guard function to protect routes based on user authentication and profile.
 *
 * @param route - The activated route snapshot.
 * @param state - The router state snapshot.
 * @returns A boolean indicating whether the route can be activated.
 *
 * This guard checks if the user is authenticated by retrieving credentials from sessionStorage.
 * If the user is not authenticated, they are redirected to the login page.
 *
 * Depending on the user's profile (Customer or Employee), the guard allows access to specific routes
 * and redirects to the appropriate profile page if the user tries to access an unauthorized route.
 *
 * - If the user is a Customer, they can access routes starting with '/cliente'.
 * - If the user is an Employee, they can access routes starting with '/funcionario'.
 * - If the user has an unknown profile, they are redirected to the login page.
 *
 * In case of any error (e.g., invalid JSON in sessionStorage), the user is redirected to the login page.
 */

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  try {
    const user = sessionStorage.getItem('credentials');
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    const credentials: Credentials = JSON.parse(user);

    const profileRoutes: { [key: string]: string } = {
      'Customer': '/cliente',
      'Employee': '/funcionario'
    };

    const defaultRoute = '/index';

    // Redirecionar usuários autenticados ao tentar acessar login ou cadastro
    if (['/login', '/cadastro'].includes(state.url)) {
      const redirectRoute = profileRoutes[credentials.profile] || defaultRoute;
      router.navigate([redirectRoute]);
      return false;
    }

    const allowedRoute = profileRoutes[credentials.profile];
    if (allowedRoute && state.url.startsWith(allowedRoute)) {
      return true;
    } else {
      router.navigate([allowedRoute || defaultRoute]);
      return false;
    }
  } catch (error) {
    router.navigate(['/login']);
    return false;
  }
};
