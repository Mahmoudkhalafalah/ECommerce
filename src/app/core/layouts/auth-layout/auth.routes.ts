import { Routes } from '@angular/router';
import path from 'path';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },{
  path: 'login',
  loadComponent: () => import('./../../auth/login/login').then(m => m.Login),
 },
{
  path: 'register',
  loadComponent: () => import('./../../auth/signup/signup').then(m => m.Signup)
}];
