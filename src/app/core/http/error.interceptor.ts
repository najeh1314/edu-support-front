import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!req.url.includes('/i18n/')) {
        if (error.status === 401) {
          authService.logout();
          router.navigateByUrl('/login');
        } else if (error.status === 403) {
          router.navigateByUrl('/error/403');
        } else if (error.status >= 500) {
          router.navigateByUrl('/error/500');
        }
      }

      return throwError(() => error);
    })
  );
};
