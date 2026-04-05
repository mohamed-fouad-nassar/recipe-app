import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (
        error.status === 401 &&
        !req.headers.has('X-Retried') &&
        !req.url.includes('/auth/refresh')
      ) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            const newToken = authService.token();
            if (newToken) {
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`,
                  'X-Retried': 'true',
                },
              });
              return next(newReq);
            }
            return throwError(() => error);
          }),
          catchError(() => {
            authService.logoutLocal();
            return throwError(() => error);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
};
