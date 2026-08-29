"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const validation_error_1 = require("../errors/validation.error");
const internal_server_error_1 = require("../errors/internal-server.error");
const errorHandler = (app) => {
    app.use((error, req, res, next) => {
        if (error instanceof validation_error_1.ValidationError) {
            error.send(res);
        }
        else if (error instanceof internal_server_error_1.InternalServerError) {
            error.send(res);
        }
        else {
            new internal_server_error_1.InternalServerError().send(res);
        }
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorhandler.middleware.js.map