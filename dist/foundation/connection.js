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
const constants_1 = require("../constants");
const mysql = require('mysql');
class Connection {
    constructor() {
        this.connection = mysql.createConnection({
            host: constants_1.SQL.HOST,
            user: constants_1.SQL.USER,
            password: constants_1.SQL.PASSWORD,
            database: constants_1.SQL.DATABASE,
        });
    }
    close() {
        // this.connection
    }
    execute(fst) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response;
                const sql = fst.prepare();
                const values = fst.toArray();
                console.log(values);
                const query = new Promise((resolve, reject) => {
                    this.connection.query(sql, values, (err, res) => {
                        if (err) {
                            return reject(err.message);
                        }
                        response = JSON.parse(JSON.stringify(res));
                        resolve();
                    });
                });
                yield query;
                return response;
            }
            finally {
                if (this.connection && this.connection.end) {
                    this.connection.end();
                }
            }
        });
    }
}
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map