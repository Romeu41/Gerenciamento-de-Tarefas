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
exports.TasksController = void 0;
const task_services_1 = require("../Services/task.services");
class TasksController {
    static criar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario_id = req.user.id;
                const { titulo, descricao, status_id, data_vencimento } = req.body;
                const tarefa = yield task_services_1.taskService.criar({
                    titulo,
                    descricao,
                    status_id,
                    data_vencimento,
                    usuario_id,
                });
                return res.status(201).json(tarefa);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static listar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario_id = req.user.id;
                const { status_id } = req.query;
                const tarefas = yield task_services_1.taskService.listar(usuario_id, status_id ? Number(status_id) : undefined);
                return res.json(tarefas);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static buscarPorId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario_id = req.user.id;
                const { id } = req.params;
                const tarefa = yield task_services_1.taskService.buscarPorId(Number(id), usuario_id);
                return res.json(tarefa);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static atualizar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario_id = req.user.id;
                const { id } = req.params;
                const resultado = yield task_services_1.taskService.atualizar(Number(id), usuario_id, req.body);
                return res.json(resultado);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static deletar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario_id = req.user.id;
                const { id } = req.params;
                yield task_services_1.taskService.deletar(Number(id), usuario_id);
                return res.status(204).send();
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.TasksController = TasksController;
//# sourceMappingURL=task.controllers.js.map