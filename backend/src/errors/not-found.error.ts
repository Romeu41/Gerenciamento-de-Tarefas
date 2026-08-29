import { ErrorBase } from "./base.error";

export class NotFoundError extends ErrorBase {
    constructor(message: string = "Recurso não encontrado") {
        super(404, message);
    }
}