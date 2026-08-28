import { Request, Response, NextFunction } from "express";
import { taskService } from "../Services/task.services";

export class TasksController {
  static async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const usuario_id = (req as any).user.id;
      const { titulo, descricao, status_id, data_vencimento } = req.body;

      const tarefa = await taskService.criar({
        titulo,
        descricao,
        status_id,
        data_vencimento,
        usuario_id,
      });

      return res.status(201).json(tarefa);
    } catch (error) {
      return next(error);
    }
  }

  static async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const usuario_id = (req as any).user.id;
      const { status_id } = req.query;

      const tarefas = await taskService.listar(
        usuario_id, 
        status_id ? Number(status_id) : undefined
      );
      return res.json(tarefas);
    } catch (error) {
      return next(error);
    }
  }

  static async buscarPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const usuario_id = (req as any).user.id;
      const { id } = req.params;

      const tarefa = await taskService.buscarPorId(Number(id), usuario_id);
      return res.json(tarefa);
    } catch (error) {
      return next(error);
    }
  }

  static async atualizar(req: Request, res: Response, next: NextFunction) {
    try {
      const usuario_id = (req as any).user.id;
      const { id } = req.params;

      const resultado = await taskService.atualizar(Number(id), usuario_id, req.body);
      return res.json(resultado);
    } catch (error) {
      return next(error);
    }
  }

  static async deletar(req: Request, res: Response, next: NextFunction) {
    try {
      const usuario_id = (req as any).user.id;
      const { id } = req.params;

      const resultado = await taskService.deletar(Number(id), usuario_id);
      return res.json(resultado);
    } catch (error) {
      return next(error);
    }
  }
}