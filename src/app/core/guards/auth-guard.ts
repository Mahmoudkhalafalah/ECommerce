import { CookieService } from 'ngx-cookie-service';
import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, segments) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  if (!cookieService.check('token')) {
    return router.parseUrl('/login');
  }
  return true;
};
