import { Router } from "express";
import { UsersController } from "../controllers/users.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/usuarios", UsersController.criacao);
router.post("/usuarios/login", UsersController.login);

router.get("/usuarios", authMiddleware, UsersController.getAll);
router.get("/usuarios/:termo", authMiddleware, UsersController.getByTerm);
router.put("/usuarios/:id", authMiddleware, UsersController.update);
router.delete("/usuarios/:id", authMiddleware, UsersController.delete);

export default router;