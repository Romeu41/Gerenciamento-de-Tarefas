import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); 

  email = '';
  senhaRaw = '';
  errorMessage = '';
  isLoading = false;

onSubmit(): void {
    console.log('Botão Entrar clicado!', { email: this.email, senha: this.senhaRaw });

    if (!this.email || !this.senhaRaw) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, senhaRaw: this.senhaRaw }).subscribe({
      next: (res: any) => {
        console.log('Sucesso no login:', res);
        
        // SALVA O TOKEN PARA O AUTHGUARD PERMITIR A ENTRADA
        if (res && res.token) {
          localStorage.setItem('token', res.token);
        }

        this.isLoading = false;
        this.router.navigate(['/tarefas']);
      },
      error: (err: any) => {
        console.error('Erro capturado no login:', err);
        this.isLoading = false; 
        this.errorMessage = err?.error?.message || 'E-mail ou senha incorretos.';
        this.cdr.detectChanges();
      }
    });
  }
}