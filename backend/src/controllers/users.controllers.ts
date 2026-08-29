import { Request, Response, NextFunction } from "express";
import { userService } from "../Services/user.services";

export class UsersController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.buscaTodos();
      return res.json(users);
    } catch (error) {
      return next(error);
    }
  }

  static async getByTerm(req: Request, res: Response, next: NextFunction) {
    try {
      const termo = req.params.termo as string;
      const user = await userService.buscaPorTermo(termo);
      return res.json(user);
    } catch (error) {
      return next(error);
    }
  }

   static async criacao(req: Request, res: Response, next: NextFunction) {
    try {
      const { nome, email, senha } = req.body;
      const id = await userService.criar(nome, email, senha);

      return res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        id,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, senha } = req.body;
      const resultado = await userService.login(email, senha);

      return res.json({
        message: "Login realizado com sucesso!",
        ...resultado,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;

      await userService.atualizar(Number(id), nome, email, senha);

      return res.json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await userService.deletar(Number(id));

      return res.json({ message: "Usuário removido com sucesso!" });
    } catch (error) {
      return next(error);
    }
  }

  static async inativar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await userService.alterarStatus(Number(id), false);
      return res.json({ message: "Usuário inativado com sucesso!" });
    } catch (error) {
      return next(error);
    }
  }

  static async ativar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await userService.alterarStatus(Number(id), true);
      return res.json({ message: "Usuário ativado com sucesso!" });
    } catch (error) {
      return next(error);
    }
  }
}