import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/usuarios/login';

  login(credentials: { email: string; senhaRaw: string }): Observable<any> {
    const payload = {
      email: credentials.email,
      senha: credentials.senhaRaw
    };

    return this.http.post<{ token: string }>(this.apiUrl, payload).pipe(
      tap((response) => {
        if (response?.token) {
          localStorage.setItem('jwt_token', response.token);
        }
      })
    );
  }
}