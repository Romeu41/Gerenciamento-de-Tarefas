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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../repositories/user.repository");
const not_found_error_1 = require("../errors/not-found.error");
const validation_error_1 = require("../errors/validation.error");
const db_1 = require("../controllers/db");
const JWT_SECRET = process.env.JWT_SECRET;
class UserService {
    buscaTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_repository_1.userRepository.buscaTodos();
        });
    }
    buscaPorTermo(termo) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_repository_1.userRepository.buscaPorTermo(termo);
            if (users.length === 0) {
                throw new not_found_error_1.NotFoundError("Usuário não encontrado");
            }
            return users[0];
        });
    }
    criar(nome, email, senhaRaw) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!nome || !email || !senhaRaw) {
                throw new validation_error_1.ValidationError("Nome, e-mail e senha são obrigatórios");
            }
            // Verifica se e-mail já existe
            const usuarioExistente = yield user_repository_1.userRepository.buscaPorEmail(email.trim());
            if (usuarioExistente) {
                throw new validation_error_1.ValidationError("E-mail já cadastrado");
            }
            // Gera o hash da senha (custo 10)
            const senhaHash = yield bcrypt_1.default.hash(senhaRaw, 10);
            return yield user_repository_1.userRepository.criar(nome.trim(), email.trim(), senhaHash);
        });
    }
    login(email, senhaRaw) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !senhaRaw) {
                throw new validation_error_1.ValidationError("E-mail e senha são obrigatórios");
            }
            const user = yield user_repository_1.userRepository.buscaPorEmail(email.trim());
            if (!user) {
                throw new validation_error_1.ValidationError("E-mail ou senha inválidos");
            }
            const senhaValida = yield bcrypt_1.default.compare(senhaRaw, user.senha);
            if (!senhaValida) {
                throw new validation_error_1.ValidationError("E-mail ou senha inválidos");
            }
            if (!user.ativo) {
                throw new validation_error_1.ValidationError("Usuário inativo no sistema");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "8h" });
            return {
                user: { id: user.id, nome: user.nome, email: user.email },
                token,
            };
        });
    }
    alterarStatus(id, ativo) {
        return __awaiter(this, void 0, void 0, function* () {
            const affectedRows = yield user_repository_1.userRepository.alterarStatus(id, ativo);
            if (affectedRows === 0) {
                throw new not_found_error_1.NotFoundError("Usuário não encontrado para alteração de status");
            }
            return true;
        });
    }
    atualizar(id, nome, email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "UPDATE usuarios SET nome = ?, email = ?";
            const params = [nome, email];
            if (senha && senha.trim() !== "") {
                const salt = yield bcrypt_1.default.genSalt(10);
                const senhaHash = yield bcrypt_1.default.hash(senha, salt);
                query += ", senha = ?";
                params.push(senhaHash);
            }
            query += " WHERE id = ?";
            params.push(id);
            const [result] = yield db_1.pool.query(query, params);
            return result.affectedRows;
        });
    }
    deletar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const affectedRows = yield user_repository_1.userRepository.deletar(id);
            if (affectedRows === 0) {
                throw new not_found_error_1.NotFoundError("Usuário não encontrado para deleção");
            }
        });
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
//# sourceMappingURL=user.services.js.map