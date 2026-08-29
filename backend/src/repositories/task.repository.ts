import { pool } from "../controllers/db";
import { ITask } from "../types/task.type";

export class TaskRepository {
  async criar(task: ITask): Promise<number> {
    const [result]: any = await pool.query(
      "INSERT INTO tarefas (titulo, descricao, status_id, data_vencimento, usuario_id) VALUES (?, ?, ?, ?, ?)",
      [
        task.titulo,
        task.descricao || null,
        task.status_id || 1, // ID 1 = PENDENTE,ID 2 = EM_ANDAMENTO,ID 3 = CONCLUIDA,ID 4 = CANCELADA
        task.data_vencimento || null,
        task.usuario_id,
      ]
    );
    return result.insertId;
  }

  async listarPorUsuario(usuario_id: number, status_id?: number): Promise<any[]> {
    let query = `SELECT t.id, t.titulo, t.descricao, t.data_vencimento,t.created_at, st.id AS status_id,
                        st.chave AS status_chave,st.nome AS status_nome
                  FROM tarefas t
                       INNER JOIN status_tarefas st ON t.status_id = st.id
                   WHERE t.usuario_id = ?`;
    const params: any[] = [usuario_id];

    if (status_id) {
      query += " AND t.status_id = ?";
      params.push(status_id);
    }

    query += " ORDER BY t.created_at DESC";

    const [rows]: any = await pool.query(query, params);
    return rows;
  }

  async buscarPorId(id: number, usuario_id: number): Promise<any | null> {
    const [rows]: any = await pool.query(`SELECT t.id, t.titulo, t.descricao, t.data_vencimento,
                                                 t.created_at, st.id AS status_id, st.chave AS status_chave,
                                                 st.nome AS status_nome
                                           FROM tarefas t
                                                INNER JOIN status_tarefas st ON t.status_id = st.id
                                            WHERE t.id = ? AND t.usuario_id = ?`,[id, usuario_id]);
    return rows.length > 0 ? rows[0] : null;
  }

  async atualizar(id: number, usuario_id: number, task: Partial<ITask>): Promise<number> {
    const [result]: any = await pool.query(
      `UPDATE tarefas SET 
        titulo = COALESCE(?, titulo), 
        descricao = COALESCE(?, descricao), 
        status_id = COALESCE(?, status_id), 
        data_vencimento = COALESCE(?, data_vencimento) 
      WHERE id = ? AND usuario_id = ?`,
      [
        task.titulo || null,
        task.descricao || null,
        task.status_id || null,
        task.data_vencimento || null,
        id,
        usuario_id,
      ]
    );
    return result.affectedRows;
  }

  async deletar(id: number, usuario_id: number): Promise<number> {
    const [result]: any = await pool.query(
      "DELETE FROM tarefas WHERE id = ? AND usuario_id = ?",
      [id, usuario_id]
    );
    return result.affectedRows;
  }
}

export const taskRepository = new TaskRepository();