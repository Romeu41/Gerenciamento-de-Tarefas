import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})
export class Tasks implements OnInit {
  tarefas: any[] = [];
  novoTitulo = '';
  novaDescricao = '';
  novoStatus: number = 1;
  isLoading = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.isLoading = true;
    this.taskService.getTarefas().subscribe({
      next: (dados) => {
        this.tarefas = dados;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

adicionarTarefa(): void {
    if (!this.novoTitulo.trim()) return;

    const nova = {
      titulo: this.novoTitulo,
      descricao: this.novaDescricao,
      status_id: Number(this.novoStatus)
    };

    this.novoTitulo = '';
    this.novaDescricao = '';
    this.novoStatus = 1;

    this.taskService.criarTarefa(nova).subscribe({
      next: () => {
        this.taskService.getTarefas().subscribe((dados) => {
          this.tarefas = dados;
          this.cdr.detectChanges(); 
        });
      },
      error: (err) => {
        console.error('Erro ao criar tarefa:', err);
      }
    });
  }

salvarTodas(): void {
    this.isLoading = true;

    const requisicoes = this.tarefas.map(item => {
      const payload = {
        titulo: item.titulo,
        descricao: item.descricao,
        status_id: Number(item.status_id)
      };
      return this.taskService.atualizarTarefa(item.id, payload);
    });

    Promise.all(requisicoes.map(obs => obs.toPromise()))
      .then(() => {
        this.carregarTarefas();
      })
      .catch(err => {
        console.error('Erro ao salvar tarefas:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }

trackByFn(index: number, item: any): number {
  return item.id;
}

deletarTarefa(id: number): void {
    const idNumerico = Number(id);
    
    this.taskService.deletarTarefa(idNumerico).subscribe({
      next: () => {
        this.tarefas = this.tarefas.filter(t => Number(t.id) !== idNumerico);
        
        this.cdr.detectChanges();
      },
      error: () => {
        this.carregarTarefas();
      }
    });
  }

logout(): void {
    localStorage.removeItem('token'); 
    localStorage.removeItem('usuario'); 
    this.router.navigate(['/login']);
  }
}