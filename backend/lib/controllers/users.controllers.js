"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_services_1 = require("../Services/user.services");
class UsersController {
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_services_1.userService.buscaTodos();
                return res.json(users);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static getByTerm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const termo = req.params.termo;
                const user = yield user_services_1.userService.buscaPorTermo(termo);
                return res.json(user);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static criacao(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, email, senha } = req.body;
                const id = yield user_services_1.userService.criar(nome, email, senha);
                return res.status(201).json({
                    message: "Usuário cadastrado com sucesso!",
                    id,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, senha } = req.body;
                const resultado = yield user_services_1.userService.login(email, senha);
                return res.json(Object.assign({ message: "Login realizado com sucesso!" }, resultado));
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nome, email, senha } = req.body;
                yield user_services_1.userService.atualizar(Number(id), nome, email, senha);
                return res.json({ message: "Usuário atualizado com sucesso!" });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield user_services_1.userService.deletar(Number(id));
                return res.json({ message: "Usuário removido com sucesso!" });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static inativar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield user_services_1.userService.alterarStatus(Number(id), false);
                return res.json({ message: "Usuário inativado com sucesso!" });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static ativar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield user_services_1.userService.alterarStatus(Number(id), true);
                return res.json({ message: "Usuário ativado com sucesso!" });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controllers.js.map