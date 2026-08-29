"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRepository = exports.TaskRepository = void 0;
const db_1 = require("../controllers/db");
class TaskRepository {
    criar(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.pool.query("INSERT INTO tarefas (titulo, descricao, status_id, data_vencimento, usuario_id) VALUES (?, ?, ?, ?, ?)", [
                task.titulo,
                task.descricao || null,
                task.status_id || 1, // ID 1 = PENDENTE,ID 2 = EM_ANDAMENTO,ID 3 = CONCLUIDA,ID 4 = CANCELADA
                task.data_vencimento || null,
                task.usuario_id,
            ]);
            return result.insertId;
        });
    }
    listarPorUsuario(usuario_id, status_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT t.id, t.titulo, t.descricao, t.data_vencimento,t.created_at, st.id AS status_id,
                        st.chave AS status_chave,st.nome AS status_nome
                  FROM tarefas t
                       INNER JOIN status_tarefas st ON t.status_id = st.id
                   WHERE t.usuario_id = ?`;
            const params = [usuario_id];
            if (status_id) {
                query += " AND t.status_id = ?";
                params.push(status_id);
            }
            query += " ORDER BY t.created_at DESC";
            const [rows] = yield db_1.pool.query(query, params);
            return rows;
        });
    }
    buscarPorId(id, usuario_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield db_1.pool.query(`SELECT t.id, t.titulo, t.descricao, t.data_vencimento,
                                                 t.created_at, st.id AS status_id, st.chave AS status_chave,
                                                 st.nome AS status_nome
                                           FROM tarefas t
                                                INNER JOIN status_tarefas st ON t.status_id = st.id
                                            WHERE t.id = ? AND t.usuario_id = ?`, [id, usuario_id]);
            return rows.length > 0 ? rows[0] : null;
        });
    }
    atualizar(id, usuario_id, task) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.pool.query(`UPDATE tarefas SET 
        titulo = COALESCE(?, titulo), 
        descricao = COALESCE(?, descricao), 
        status_id = COALESCE(?, status_id), 
        data_vencimento = COALESCE(?, data_vencimento) 
      WHERE id = ? AND usuario_id = ?`, [
                task.titulo || null,
                task.descricao || null,
                task.status_id || null,
                task.data_vencimento || null,
                id,
                usuario_id,
            ]);
            return result.affectedRows;
        });
    }
    deletar(id, usuario_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.pool.query("DELETE FROM tarefas WHERE id = ? AND usuario_id = ?", [id, usuario_id]);
            return result.affectedRows;
        });
    }
}
exports.TaskRepository = TaskRepository;
exports.taskRepository = new TaskRepository();
//# sourceMappingURL=task.repository.js.map