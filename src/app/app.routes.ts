import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadComponent: () => import('./core/layouts/auth-layout/auth-layout').then(m => m.AuthLayout),
  loadChildren: () => import('./core/layouts/auth-layout/auth.routes').then(m => m.routes)
 },
{
  path: '',
  loadComponent: () => import('./core/layouts/main-layout/main-layout').then(m => m.MainLayout),
  loadChildren: () => import('./core/layouts/main-layout/main.routes').then(m => m.routes)
}];
