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
exports.taskService = exports.TaskService = void 0;
const task_repository_1 = require("../repositories/task.repository");
const validation_error_1 = require("../errors/validation.error");
const not_found_error_1 = require("../errors/not-found.error");
class TaskService {
    criar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.titulo || data.titulo.trim() === "") {
                throw new validation_error_1.ValidationError("O título da tarefa é obrigatório.");
            }
            const id = yield task_repository_1.taskRepository.criar({
                titulo: data.titulo.trim(),
                descricao: data.descricao,
                status_id: data.status_id || 1,
                data_vencimento: data.data_vencimento,
                usuario_id: data.usuario_id,
            });
            return Object.assign(Object.assign({ id }, data), { status_id: data.status_id || 1 });
        });
    }
    listar(usuario_id, status_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_repository_1.taskRepository.listarPorUsuario(usuario_id, status_id);
        });
    }
    buscarPorId(id, usuario_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield task_repository_1.taskRepository.buscarPorId(id, usuario_id);
            if (!task) {
                throw new not_found_error_1.NotFoundError("Tarefa não encontrada.");
            }
            return task;
        });
    }
    atualizar(id, usuario_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buscarPorId(id, usuario_id);
            if (data.status_id && ![1, 2, 3, 4].includes(data.status_id)) {
                throw new validation_error_1.ValidationError("Status inválido. Escolha um status válido (1: Pendente, 2: Em Andamento, 3: Concluída, 4: Cancelada).");
            }
            yield task_repository_1.taskRepository.atualizar(id, usuario_id, data);
            return { message: "Tarefa atualizada com sucesso!" };
        });
    }
    deletar(id, usuario_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buscarPorId(id, usuario_id);
            yield task_repository_1.taskRepository.deletar(id, usuario_id);
            return { message: "Tarefa removida com sucesso!" };
        });
    }
}
exports.TaskService = TaskService;
exports.taskService = new TaskService();
//# sourceMappingURL=task.services.js.map