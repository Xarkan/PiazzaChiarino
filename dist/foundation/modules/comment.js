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
    listComment: (postid) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('post', postid)];
        const result = yield db.run('comment', 'select', cond);
        return result;
    }),
    getComment: (post, user) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('author', user.id),
            new condition_1.Condition('post', post.id)];
        const result = yield db.run('comment', 'select', cond);
        return result[0];
    }),
    saveComment: (comment) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('author', comment.user.id),
            new condition_1.Condition('post', comment.post.id),
            new condition_1.Condition('date', comment.date),
            new condition_1.Condition('body', comment.body)
        ];
        const result = yield db.run('comment', 'save', cond);
        return result.insertId;
    }),
    countComment: (pid) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('post', pid)];
        const result = yield db.run('comment', 'count', cond);
        return result[0]['total'];
    }),
    deleteComment: (id) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('id', id)];
        const result = yield db.run('comment', 'delete', cond);
        return result.affectedRows;
    })
});
//# sourceMappingURL=comment.js.map