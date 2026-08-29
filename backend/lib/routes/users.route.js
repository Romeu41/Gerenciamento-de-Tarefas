"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post("/usuarios", users_controllers_1.UsersController.criacao);
router.post("/usuarios/login", users_controllers_1.UsersController.login);
router.get("/usuarios", auth_middleware_1.authMiddleware, users_controllers_1.UsersController.getAll);
router.get("/usuarios/:termo", auth_middleware_1.authMiddleware, users_controllers_1.UsersController.getByTerm);
router.put("/usuarios/:id", auth_middleware_1.authMiddleware, users_controllers_1.UsersController.update);
router.delete("/usuarios/:id", auth_middleware_1.authMiddleware, users_controllers_1.UsersController.delete);
router.patch("/usuarios/:id/inativar", auth_middleware_1.authMiddleware, users_controllers_1.UsersController.inativar);
router.patch("/usuarios/:id/ativar", auth_middleware_1.authMiddleware, users_controllers_1.UsersController.ativar);
exports.default = router;
//# sourceMappingURL=users.route.js.map