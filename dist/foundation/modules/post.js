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
    listPost: (lat, long, range) => __awaiter(this, void 0, void 0, function* () {
        const cond = [];
        console.log(lat + range);
        cond.push(new condition_1.Condition('latitude', lat + range, '<'));
        cond.push(new condition_1.Condition('latitude', lat - range, '>'));
        cond.push(new condition_1.Condition('longitude', long + range, '<'));
        cond.push(new condition_1.Condition('longitude', long - range, '>'));
        const result = yield db.run('post', 'select', cond);
        return result;
    }),
    getPost: (id) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('id', id)];
        const result = yield db.run('post', 'select', cond);
        return result[0];
    }),
    savePost: (post) => __awaiter(this, void 0, void 0, function* () {
        const cond = [new condition_1.Condition('author', post.user.id),
            new condition_1.Condition('latitude', post.latitude),
            new condition_1.Condition('longitude', post.longitude),
            new condition_1.Condition('date', post.date),
            new condition_1.Condition('text', post.body),
            new condition_1.Condition('type', post.type)
        ];
        try {
            const result = yield db.run('post', 'save', cond);
            return result.insertId;
        }
        catch (error) {
            throw error;
        }
    })
});
//# sourceMappingURL=post.js.map