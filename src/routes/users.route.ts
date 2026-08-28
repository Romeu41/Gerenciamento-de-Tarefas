import express from "express";
import { UsersController } from "../controllers/users.controllers"; 

export const userRoutes = express.Router();

userRoutes.get("/usuarios", UsersController.getAll);
userRoutes.get("/usuarios/:termo", UsersController.getByTerm);
userRoutes.post("/usuarios/", UsersController.criacao);
userRoutes.put("/usuarios/:id", UsersController.update);
userRoutes.delete("/usuarios/:id", UsersController.delete);

