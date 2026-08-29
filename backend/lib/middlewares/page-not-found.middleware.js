"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageNotFoundHandler = void 0;
const not_found_error_1 = require("../errors/not-found.error");
const pageNotFoundHandler = (app) => {
    app.use((req, res, next) => {
        next(new not_found_error_1.NotFoundError("Página não encontrada"));
    });
};
exports.pageNotFoundHandler = pageNotFoundHandler;
//# sourceMappingURL=page-not-found.middleware.js.map