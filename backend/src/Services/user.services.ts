import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository";
import { NotFoundError } from "../errors/not-found.error";
import { ValidationError } from "../errors/validation.error";
import { pool } from "../controllers/db";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class UserService {
  async buscaTodos() {
    return await userRepository.buscaTodos();
  }

  async buscaPorTermo(termo: string) {
    const users = await userRepository.buscaPorTermo(termo);

    if (users.length === 0) {
      throw new NotFoundError("Usuário não encontrado");
    }

    return users[0];
  }

  async criar(nome: string, email: string, senhaRaw: string) {
    if (!nome || !email || !senhaRaw) {
      throw new ValidationError("Nome, e-mail e senha são obrigatórios");
    }

    // Verifica se e-mail já existe
    const usuarioExistente = await userRepository.buscaPorEmail(email.trim());
    if (usuarioExistente) {
      throw new ValidationError("E-mail já cadastrado");
    }

    // Gera o hash da senha (custo 10)
    const senhaHash = await bcrypt.hash(senhaRaw, 10);

    return await userRepository.criar(nome.trim(), email.trim(), senhaHash);
  }

  async login(email: string, senhaRaw: string) {
    if (!email || !senhaRaw) {
      throw new ValidationError("E-mail e senha são obrigatórios");
    }

    const user = await userRepository.buscaPorEmail(email.trim());
    if (!user) {
      throw new ValidationError("E-mail ou senha inválidos");
    }

    const senhaValida = await bcrypt.compare(senhaRaw, user.senha);
    if (!senhaValida) {
      throw new ValidationError("E-mail ou senha inválidos");
    }

    if (!user.ativo) {
      throw new ValidationError("Usuário inativo no sistema");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return {
      user: { id: user.id, nome: user.nome, email: user.email },
      token,
    };
  }

  async alterarStatus(id: number, ativo: boolean) {
    const affectedRows = await userRepository.alterarStatus(id, ativo);
    if (affectedRows === 0) {
      throw new NotFoundError("Usuário não encontrado para alteração de status");
    }
    return true;
  }

async atualizar(id: number, nome: string, email: string, senha?: string): Promise<number> {
    let query = "UPDATE usuarios SET nome = ?, email = ?";
    const params: any[] = [nome, email];

    if (senha && senha.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);
      
      query += ", senha = ?";
      params.push(senhaHash);
    }

    query += " WHERE id = ?";
    params.push(id);

    const [result]: any = await pool.query(query, params);
    return result.affectedRows;
  }

  async deletar(id: number) {
    const affectedRows = await userRepository.deletar(id);

    if (affectedRows === 0) {
      throw new NotFoundError("Usuário não encontrado para deleção");
    }
  }
}

export const userService = new UserService();