import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Tasks } from './pages/tasks/tasks';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: Login },
  { path: 'register', loadComponent: () => import('./pages/usuarios/usuarios').then(m => m.Usuarios) }, 
  { path: 'tasks', component: Tasks, canActivate: [authGuard] },
  { path: 'tarefas', redirectTo: 'tasks', pathMatch: 'full' }
];