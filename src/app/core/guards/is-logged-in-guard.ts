import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const isLoggedInGuard: CanMatchFn = (route, segments) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  
  if (cookieService.check('token')) {
    return router.parseUrl('/home');
  }
  return true;
};
