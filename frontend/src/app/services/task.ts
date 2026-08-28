import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/tarefas'; 

  getTarefas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  criarTarefa(tarefa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tarefa);
  }

  atualizarTarefa(id: number, tarefa: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, tarefa);
  }

deletarTarefa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}