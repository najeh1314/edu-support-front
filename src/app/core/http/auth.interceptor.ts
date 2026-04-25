import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TranslationService } from '../i18n/translation.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const translationService = inject(TranslationService);
  const token = authService.token();

  if (req.url.includes('/i18n/')) {
    return next(req);
  }

  const headers: Record<string, string> = {
    'Accept-Language': translationService.currentLanguage()
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return next(req.clone({ setHeaders: headers }));
};
