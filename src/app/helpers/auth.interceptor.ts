import {HTTP_INTERCEPTORS, HttpEvent, HttpHandlerFn, HttpInterceptorFn} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'x-access-token';
//replace string with 'Authorization' for Spring Boot back-end

// @Injectable()
export const AuthInterceptor: HttpInterceptorFn = ( req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  const tokenService = inject(TokenStorageService);
  let authReq = req;
  const token = tokenService.getToken();
  if (token != null) {
    authReq = req.clone({
      setHeaders: {
        'x-access-token': token
      }
    });
    return next(authReq);
  } else {
    return next(req);
  }
}

// export const authInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
// ];
