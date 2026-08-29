import { ErrorBase } from "./base.error";

export class InternalServerError extends ErrorBase {
    constructor(message: string = "Erro Interno do Servidor") {
        super(500, message);
    }
}