"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const users_route_1 = __importDefault(require("./users.route"));
const task_route_1 = __importDefault(require("./task.route"));
const routes = (app) => {
    app.use(express_1.default.json());
    app.use(users_route_1.default);
    app.use(task_route_1.default);
};
exports.routes = routes;
//# sourceMappingURL=index.js.map