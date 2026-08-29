"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const base_error_1 = require("./base.error");
class ValidationError extends base_error_1.ErrorBase {
    constructor(message = "Erro de Validação") {
        super(400, message);
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=validation.error.js.map