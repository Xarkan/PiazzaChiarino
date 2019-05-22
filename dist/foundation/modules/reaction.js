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
    listReaction: (postid) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('post', postid)];
        const result = yield db.run('reaction', 'select', cond);
        return result;
    }),
    getReaction: (post, user) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('author', user.id),
            new condition_1.Condition('post', post.id)];
        const result = yield db.run('reaction', 'select', cond);
        return result[0];
    }),
    getReactionByAuthor: (user) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('author', user.id)];
        const result = yield db.run('reaction', 'select', cond);
        console.log(result);
        console.log(result[0]);
        return result[0];
    }),
    saveReaction: (reaction) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('author', reaction.user.id),
            new condition_1.Condition('post', reaction.post.id),
            new condition_1.Condition('date', reaction.date)
        ];
        const result = yield db.run('reaction', 'save', cond);
        return result.insertId;
    }),
    countReaction: (pid) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('post', pid)];
        const result = yield db.run('reaction', 'count', cond);
        return result[0]['total'];
    }),
    deleteReaction: (id) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('id', id)];
        const result = yield db.run('reaction', 'delete', cond);
        return result.affectedRows;
    })
});
//# sourceMappingURL=reaction.js.map