import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {AuthResponse} from "../models/auth/auth-response";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base = '/api/auth'

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string; }) {
    return this.http.post<AuthResponse>(`${this.base}/login`, credentials)
      .pipe(
        tap(res => {
          const token = res.access_token;
          localStorage.setItem('token', token)
          console.log('Token recibido (desde Service):', token);
        })
      );
  }


  register(data: { name: string; email: string; password: string; }) {
    return this.http.post<AuthResponse>(`${this.base}/register`, data)
      .pipe(
        tap(res => {
          const token = res.access_token;
          localStorage.setItem('token', token)}));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn():boolean {
    return !!localStorage.getItem('token');
  }


}
