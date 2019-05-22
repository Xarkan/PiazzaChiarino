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
const Repository = require('../foundation/repository');
const User = require('./user');
exports.create = (user, post, body) => __awaiter(this, void 0, void 0, function* () {
    const comment = {
        user: user,
        post: post,
        date: new Date().toISOString(),
        body: body,
    };
    const rep = Repository.loadModules(['comment']);
    return yield rep.saveComment(comment);
});
exports.list = (id) => __awaiter(this, void 0, void 0, function* () {
    const rep = Repository.loadModules(['comment']);
    const list = yield rep.listComment(id);
    return yield Promise.all(list.map((comment) => __awaiter(this, void 0, void 0, function* () {
        const user = User.get(comment.author);
        comment.author = user;
        return comment;
    })));
});
exports.get = (post, user) => __awaiter(this, void 0, void 0, function* () {
    const rep = Repository.loadModules(['comment']);
    return yield rep.getComment(post, user);
});
exports.count = (id) => __awaiter(this, void 0, void 0, function* () {
    const rep = Repository.loadModules(['comment']);
    return yield rep.countComment(id);
});
exports.delete = (id, user) => __awaiter(this, void 0, void 0, function* () {
    const rep = Repository.loadModules(['comment']);
    const comment = yield rep.getComment(id);
    if (comment.author === user.id) {
        return yield rep.deleteComment(id);
    }
    else {
        return false;
    }
});
//# sourceMappingURL=comment.js.map