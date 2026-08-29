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
exports.userRepository = exports.UserRepository = void 0;
const db_1 = require("../controllers/db");
class UserRepository {
    buscaPorEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield db_1.pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
            return rows[0];
        });
    }
    buscaTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield db_1.pool.query("SELECT * FROM usuarios");
            return rows;
        });
    }
    buscaPorTermo(termo) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield db_1.pool.query("SELECT * FROM usuarios WHERE id = ? OR nome LIKE ?", [termo, `%${termo}%`]);
            return rows;
        });
    }
    criar(nome, email, senhaHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.pool.query("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [nome, email, senhaHash]);
            return result.insertId;
        });
    }
    atualizar(id, nome, email, senhaHash) {
        return __awaiter(this, void 0, void 0, function* () {
            if (senhaHash) {
                const [result] = yield db_1.pool.query("UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?", [nome, email, senhaHash, id]);
                return result.affectedRows;
            }
            else {
                const [result] = yield db_1.pool.query("UPDATE usuarios SET nome = ?, email = ? WHERE id = ?", [nome, email, id]);
                return result.affectedRows;
            }
        });
    }
    alterarStatus(id, ativo) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.pool.query("UPDATE usuarios SET ativo = ? WHERE id = ?", [ativo, id]);
            return result.affectedRows;
        });
    }
    deletar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
            return result.affectedRows;
        });
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map