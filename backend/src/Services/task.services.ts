import { taskRepository } from "../repositories/task.repository";
import { ITask } from "../types/task.type";
import { ValidationError } from "../errors/validation.error";
import { NotFoundError } from "../errors/not-found.error";

export class TaskService {
  async criar(data: { titulo: string; descricao?: string; status_id?: number; data_vencimento?: string; usuario_id: number }) {
    if (!data.titulo || data.titulo.trim() === "") {
      throw new ValidationError("O título da tarefa é obrigatório.");
    }

    const id = await taskRepository.criar({
      titulo: data.titulo.trim(),
      descricao: data.descricao,
      status_id: data.status_id || 1,
      data_vencimento: data.data_vencimento,
      usuario_id: data.usuario_id,
    });

    return { id, ...data, status_id: data.status_id || 1 };
  }

  async listar(usuario_id: number, status_id?: number) {
    return await taskRepository.listarPorUsuario(usuario_id, status_id);
  }

  async buscarPorId(id: number, usuario_id: number) {
    const task = await taskRepository.buscarPorId(id, usuario_id);
    if (!task) {
      throw new NotFoundError("Tarefa não encontrada.");
    }
    return task;
  }

async atualizar(id: number, usuario_id: number, data: Partial<ITask>) {
  await this.buscarPorId(id, usuario_id);

  if (data.status_id && ![1, 2, 3, 4].includes(data.status_id)) {
    throw new ValidationError("Status inválido. Escolha um status válido (1: Pendente, 2: Em Andamento, 3: Concluída, 4: Cancelada).");
  }

  await taskRepository.atualizar(id, usuario_id, data);
  return { message: "Tarefa atualizada com sucesso!" };
}

  async deletar(id: number, usuario_id: number) {
    await this.buscarPorId(id, usuario_id);
    await taskRepository.deletar(id, usuario_id);
    return { message: "Tarefa removida com sucesso!" };
  }
}

export const taskService = new TaskService();