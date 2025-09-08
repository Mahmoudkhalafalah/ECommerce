import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./../../../features/home/home').then((m) => m.Home),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./../../../features/products/products').then((m) => m.Products),
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./../../../features/brands/brands').then((m) => m.Brands),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./../../../features/cart/cart').then((m) => m.Cart),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./../../../features/categories/categories').then(
        (m) => m.Categories
      ),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./../../../features/checkout/checkout').then((m) => m.Checkout),
  },
  {
    path: 'details/:Pid',
    loadComponent: () =>
      import('./../../../features/details/details').then((m) => m.Details),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./../../../features/user-data/user-data').then((m) => m.UserData),
  },
];
