import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const tokenStorage = inject(TokenStorageService);
  const http = inject(HttpClient);

  const accessToken = tokenStorage.getAccessToken();
  let authReq = req;

  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/auth/refresh') && tokenStorage.getResfreshToken()) {
        // try to refresh the token
        const refreshToken = tokenStorage.getResfreshToken();
        return http
          .post<{ access_token: string, refresh_token: string }>(environment.apiUrl + 'auth/refresh', { refreshToken })
          .pipe(
            switchMap(({ access_token, refresh_token }) => {
              tokenStorage.setAccessToken(access_token);
              tokenStorage.setRefreshToken(refresh_token);

              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${access_token}`,
                }
              });

              return next(retryReq);
            }),
            catchError(() => {
              tokenStorage.clear();
              return throwError(() => new Error('Session expired, please log in again.'));
            })
          );
      }

      return throwError(() => new Error(error.message || 'An error occurred'));
    })
  )
};
