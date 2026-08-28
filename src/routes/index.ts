import express from "express";
import  userRoutes from "./users.route";
import taskRoutes from "./task.route";

export const routes = (app: express.Express) => {
  app.use(express.json());
  app.use(userRoutes);
  app.use(taskRoutes);
};