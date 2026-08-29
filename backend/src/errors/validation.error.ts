import { ErrorBase } from "./base.error";

export class ValidationError extends ErrorBase {
    constructor(message: string = "Erro de Validação") {
        super(400, message);
    }
}