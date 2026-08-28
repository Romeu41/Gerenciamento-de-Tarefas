import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository";
import { NotFoundError } from "../errors/not-found.error";
import { ValidationError } from "../errors/validation.error";

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

    // Compara a senha informada com o hash salvo no banco
    const senhaValida = await bcrypt.compare(senhaRaw, user.senha);
    if (!senhaValida) {
      throw new ValidationError("E-mail ou senha inválidos");
    }

    // Gerar token JWT (expira em 8h)
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

  async atualizar(id: number, nome: string, email: string) {
    if (!nome || !email || !nome.trim() || !email.trim()) {
      throw new ValidationError("Nome e email são obrigatórios");
    }

    const affectedRows = await userRepository.atualizar(id, nome.trim(), email.trim());

    if (affectedRows === 0) {
      throw new NotFoundError("Usuário não encontrado para atualização");
    }
  }

  async deletar(id: number) {
    const affectedRows = await userRepository.deletar(id);

    if (affectedRows === 0) {
      throw new NotFoundError("Usuário não encontrado para deleção");
    }
  }
}

export const userService = new UserService();