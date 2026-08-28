import { pool } from "../controllers/db";

export class UserRepository {
    async buscaPorEmail(email: string): Promise<any> {
     const [rows]: any = await pool.query(
         "SELECT * FROM usuarios WHERE email = ?", [email]);
    return rows[0];
  }

    
  async buscaTodos(): Promise<any[]> {
    const [rows]: any = await pool.query("SELECT * FROM usuarios");
    return rows;
  }

  async buscaPorTermo(termo: string): Promise<any[]> {
    const [rows]: any = await pool.query(
      "SELECT * FROM usuarios WHERE id = ? OR nome LIKE ?",
      [termo, `%${termo}%`]
    );
    return rows;
  }

  async criar(nome: string, email: string, senhaHash: string): Promise<number> {
    const [result]: any = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senhaHash]
    );
    return result.insertId;
  }

  async atualizar(id: number, nome: string, email: string): Promise<number> {
    const [result]: any = await pool.query(
      "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?",
      [nome, email, id]
    );
    return result.affectedRows;
  }

  async deletar(id: number): Promise<number> {
    const [result]: any = await pool.query(
      "DELETE FROM usuarios WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  }
}

export const userRepository = new UserRepository();