import {NextFunction, Request, Response} from "express";
import { pool } from "./db";
import { ValidationError } from "../errors/validation.error";
import { NotFoundError } from "../errors/not-found.error";

export class UsersController {

    static async getAll(req: Request, res: Response, next: NextFunction) {
      try{
        const [rows] = await pool.query("SELECT * FROM usuarioss");
        return res.json(rows);
      }
      catch (error) {
        return next(error);
      }
    }

    static async getByTerm(req: Request, res: Response, next: NextFunction) {
      try {
           const { termo } = req.params;

           const parsedId = Number(termo);
           const isNumber = !isNaN(parsedId);

           let query: string;
           let params: any[];

        if (isNumber) {
            query = "SELECT * FROM usuarios WHERE id = ?";
            params = [parsedId];
        } else {

            query = "SELECT * FROM usuarios WHERE nome LIKE ?";
            params = [`%${termo}%`];
        }

        const [rows]: any = await pool.query(query, params);

        if (rows.length === 0) {
             throw new NotFoundError("Usuário não encontrado");
       }
        return res.json(isNumber ? rows[0] : rows);
    } catch (error) {
       return next(error);
    }
    }

    static async criacao(req: Request, res: Response, next: NextFunction) {
     try{   
        const { nome, email } = req.body;

        if (!nome || !email || !nome.trim() || !email.trim()) {
            throw new ValidationError("Nome e email são obrigatórios");
        }

        const [result] = await pool.query("INSERT INTO usuarios (nome, email) VALUES (?, ?)", [nome, email]);

        return res.status(201).json({message: "Usuário adicionado com sucesso!",id: (result as any).insertId})
     }
     catch (error) {
        return next(error);
     }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params;
        const { nome, email } = req.body;

        if (!nome || !email || !nome.trim() || !email.trim()) {
            throw new ValidationError("Nome e email não podem ser vazios");
        }

        const [result]: any = await pool.query(
          "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?",[nome, email, id]);

        if (result.affectedRows === 0) {
            throw new NotFoundError("Usuário não encontrado");
        }

        return res.json({
         message: "Usuário atualizado com sucesso!",
         user: { id: Number(id), nome, email }});
        } catch (error) {
            return next(error);
        }
  }

    static async delete(req: Request, res: Response, next: NextFunction) {
         try {
          const { id } = req.params;

          const [result]: any = await pool.query("DELETE FROM usuarios WHERE id = ?",[id]);

        if (result.affectedRows === 0) {
            throw new NotFoundError("Usuário não encontrado");
        }

        return res.json({ message: "Usuário excluído com sucesso!" });
    } catch (error) {
        return next(error);
    }
}
}