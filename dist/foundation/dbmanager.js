"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("./connection");
const statement_1 = require("./statement");
exports.run = (table, type, cond) => __awaiter(this, void 0, void 0, function* () {
    const con = new connection_1.Connection();
    const st = new statement_1.Statement(table, type, cond);
    const result = yield con.execute(st);
    return result;
});
//# sourceMappingURL=dbmanager.js.map