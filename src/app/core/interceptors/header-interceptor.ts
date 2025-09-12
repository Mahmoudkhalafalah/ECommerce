import { CookieService } from 'ngx-cookie-service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  if (cookieService.check('token')) {
    req = req.clone({
      headers: req.headers.set('token', cookieService.get('token')),
    });
  }
  return next(req);
};
