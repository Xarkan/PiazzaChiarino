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
const condition_1 = require("../condition");
const db = require('../dbmanager');
exports.methods = () => ({
    getUser: (id) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('id', id)];
        const result = yield db.run('user', 'select', cond);
        return result[0];
    }),
    getUserByMail: (mail) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('mail', mail)];
        const result = yield db.run('user', 'select', cond);
        return result[0];
    }),
    saveUser: (user) => __awaiter(this, void 0, void 0, function* () {
        console.log('Saving user...');
        var cond = [new condition_1.Condition('mail', user.mail)];
        const result = yield db.run('user', 'select', cond);
        console.log(result);
        if (result.length === 0) {
            console.log('Mail available...');
            cond = [new condition_1.Condition('mail', user.mail),
                new condition_1.Condition('password', user.password),
                new condition_1.Condition('name', user.name),
                new condition_1.Condition('date', user.date)
            ];
            return yield db.run('user', 'save', cond);
        }
        else {
            console.log('Mail already exists');
            return false; //la mail esiste già
        }
    })
});
//# sourceMappingURL=user.js.map