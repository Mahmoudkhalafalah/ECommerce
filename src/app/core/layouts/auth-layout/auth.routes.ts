import { Routes } from '@angular/router';
import { isLoggedInGuard } from '../../guards/is-logged-in-guard';

export const routes: Routes = [
  {
  path: 'login',
  canMatch: [isLoggedInGuard],
  loadComponent: () => import('./../../auth/login/login').then(m => m.Login),
 },
{
  path: 'register',
  canMatch: [isLoggedInGuard],
  loadComponent: () => import('./../../auth/signup/signup').then(m => m.Signup)
}];
