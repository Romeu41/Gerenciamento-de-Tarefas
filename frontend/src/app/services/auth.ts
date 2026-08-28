import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; 

login(credentials: { email: string; senha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
  }
}