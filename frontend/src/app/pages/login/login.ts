import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  senhaRaw = '';
  errorMessage = '';
  isLoading = false;

  onSubmit(): void {
    if (!this.email || !this.senhaRaw) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, senha: this.senhaRaw }).subscribe({
      next: () => {
        this.isLoading = false;

        this.router.navigate(['/tarefas']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Falha ao realizar login. Verifique suas credenciais.';
      }
    });
  }
}