import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes/index";
import { errorHandler } from "./middlewares/errorhandler.middleware";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

routes(app);
pageNotFoundHandler(app);
errorHandler(app);

app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${PORT}`);
});