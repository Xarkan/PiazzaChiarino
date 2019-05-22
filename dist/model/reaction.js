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
exports.create = (user, post) => __awaiter(this, void 0, void 0, function* () {
    const reaction = {
        user: user,
        post: post,
        date: new Date().toISOString()
    };
    const rep = Repository.loadModules(['reaction']);
    const result = yield rep.getReactionByAuthor(user);
    if (result === undefined) {
        return yield rep.saveReaction(reaction);
    }
    else {
        if (result.author !== user.id) {
            return yield rep.saveReaction(reaction);
        }
        else {
            return false;
        }
    }
});
/*exports.list = async (id: number) => {
    const rep = Repository.loadModules(['reaction']);
    const list: any[] = await rep.listReaction(id);
    return await Promise.all(list.map( async (reaction)=>{ //non va bene per la home.. troppe query
        const user = await User.get(reaction.author);
        reaction.author = user;
        return reaction;
    })
    )
};*/
exports.list = (id) => __awaiter(this, void 0, void 0, function* () {
    const rep = Repository.loadModules(['reaction']);
    return yield rep.listReaction(id);
});
exports.get = (post, user) => __awaiter(this, void 0, void 0, function* () {
    const rep = Repository.loadModules(['reaction']);
    return yield rep.getReaction(post, user);
});
exports.count = (id) => __awaiter(this, void 0, void 0, function* () {
    const rep = Repository.loadModules(['reaction']);
    return yield rep.countReaction(id);
});
exports.delete = (id, user) => __awaiter(this, void 0, void 0, function* () {
    const rep = Repository.loadModules(['reaction']);
    const reaction = rep.getReaction(id);
    if (reaction.author === user.id) {
        return yield rep.deleteReaction(id);
    }
    else {
        return false;
    }
});
/*export class Reaction {
    public id: number;
    public author: User;
    public date: Date;
}*/
//# sourceMappingURL=reaction.js.map