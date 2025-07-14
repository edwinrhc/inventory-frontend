// src/app/core/interceptors/auth.interceptor.ts
import {inject, Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpInterceptorFn
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError(error => {
      // Manejar errores aquí
      return throwError(() => error);
    })
  );
};

