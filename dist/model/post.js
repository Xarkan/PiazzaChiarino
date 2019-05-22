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
const Reaction = require('./reaction');
const Comment = require('./comment');
exports.create = (user, latitude, longitude, body, type) => __awaiter(this, void 0, void 0, function* () {
    const post = {
        user: user,
        latitude: latitude,
        longitude: longitude,
        date: new Date().toISOString(),
        body: body,
        type: type
    };
    const rep = Repository.loadModules(['post']);
    return yield rep.savePost(post);
});
exports.get = (id) => __awaiter(this, void 0, void 0, function* () {
    const rep = Repository.loadModules(['post']);
    return yield rep.getPost(id);
});
exports.list = (lat, long, range, user) => __awaiter(this, void 0, void 0, function* () {
    if (range > 10000) {
        range = 10000;
    }
    const degRange = range / 111139;
    const rep = Repository.loadModules(['post']);
    const list = yield rep.listPost(lat, long, degRange);
    return yield Promise.all(list.map((post) => __awaiter(this, void 0, void 0, function* () {
        const author = yield User.get(post.author);
        const reaction = yield Reaction.get(post, user);
        const numReactions = yield Reaction.count(post.id);
        const numComments = yield Comment.count(post.id);
        const comment = yield Comment.get(post, user);
        console.log(reaction);
        if (reaction !== undefined) {
            post.reacted = true;
        }
        else {
            post.reacted = false;
        }
        if (comment !== undefined) {
            post.commented = true;
        }
        else {
            post.commented = false;
        }
        post.numReactions = numReactions;
        post.numComments = numComments;
        post.author = author;
        return post;
    })));
});
/*
export class Post {
    public id: number;
    public author: User;
    public latitude: number;
    public longitude: number;
    public date: Date;
    public body: Body;
    public type: string;

    constructor() {

    }
}*/ 
//# sourceMappingURL=post.js.map