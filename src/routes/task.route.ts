import { Router } from "express";
import { TasksController } from "../controllers/task.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/tarefas", TasksController.criar);
router.get("/tarefas", TasksController.listar);
router.get("/tarefas/:id", TasksController.buscarPorId);
router.put("/tarefas/:id", TasksController.atualizar);
router.delete("/tarefas/:id", TasksController.deletar);

export default router;