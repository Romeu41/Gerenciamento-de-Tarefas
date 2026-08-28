import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class Usuarios implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  usuarios: any[] = [];
  nome = '';
  email = '';
  senha = '';
  editandoId: number | null = null;
  
  private apiUrl = 'http://localhost:3000/usuarios';
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;

    if (this.isLoggedIn) {
      this.carregarUsuarios();
    }
  }

  carregarUsuarios(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (dados) => {
        this.usuarios = dados;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao buscar usuários:', err)
    });
  }

salvarUsuario(): void {
    // Monta o payload inicial apenas com nome e email
    const payload: any = { 
      nome: this.nome, 
      email: this.email 
    };

    // Adiciona a senha ao payload APENAS se o usuário digitou algo novo no input
    if (this.senha && this.senha.trim() !== '') {
      payload.senha = this.senha;
    }

    if (this.editandoId) {
      // Alteração (PUT)
      this.http.put(`${this.apiUrl}/${this.editandoId}`, payload).subscribe({
        next: () => {
          this.limparFormulario();
          this.carregarUsuarios();
        },
        error: (err) => console.error('Erro ao atualizar usuário:', err)
      });
    } else {
      // Inclusão (POST) - Na criação, a senha é obrigatória
      this.http.post(this.apiUrl, payload).subscribe({
        next: () => {
          this.limparFormulario();
          this.carregarUsuarios();
        },
        error: (err) => console.error('Erro ao criar usuário:', err)
      });
    }
  }

  carregarParaEdicao(u: any): void {
    this.editandoId = u.id;
    this.nome = u.nome;
    this.email = u.email;
    this.senha = '';
    this.cdr.detectChanges();
  }

  cancelarEdicao(): void {
    this.limparFormulario();
  }

  deletarUsuario(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao excluir usuário:', err)
    });
  }

  limparFormulario(): void {
    this.editandoId = null;
    this.nome = '';
    this.email = '';
    this.senha = '';
    this.cdr.detectChanges();
  }
}