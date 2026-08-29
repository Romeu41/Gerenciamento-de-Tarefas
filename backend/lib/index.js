"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./routes/index");
const errorhandler_middleware_1 = require("./middlewares/errorhandler.middleware");
const page_not_found_middleware_1 = require("./middlewares/page-not-found.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
(0, index_1.routes)(app);
(0, page_not_found_middleware_1.pageNotFoundHandler)(app);
(0, errorhandler_middleware_1.errorHandler)(app);
app.listen(PORT, () => {
    console.log(`Servidor ativo na porta ${PORT}`);
});
//# sourceMappingURL=index.js.map