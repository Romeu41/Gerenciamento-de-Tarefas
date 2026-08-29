"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controllers_1 = require("../controllers/task.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post("/tarefas", task_controllers_1.TasksController.criar);
router.get("/tarefas", task_controllers_1.TasksController.listar);
router.get("/tarefas/:id", task_controllers_1.TasksController.buscarPorId);
router.put("/tarefas/:id", task_controllers_1.TasksController.atualizar);
router.delete("/tarefas/:id", task_controllers_1.TasksController.deletar);
exports.default = router;
//# sourceMappingURL=task.route.js.map