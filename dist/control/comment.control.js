"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router(), Comment = require('../model/comment'), auth = require('../middlewares/auth');
router.get('/:id', auth, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const result = yield Comment.list(req.params.id);
    res.send(result);
}));
router.post('/', auth, (req, res) => __awaiter(this, void 0, void 0, function* () {
    req.body.post = { id: 3 }; //da togliere 
    const author = req.user;
    const post = req.body.post;
    const body = req.body.body;
    const saved = yield Comment.create(author, post, body);
    if (saved) {
        res.sendStatus(201);
    }
    else {
        res.sendStatus(400);
    }
}));
router.delete('/:id', auth, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const deleted = yield Comment.delete(req.params.id, req.user);
    if (deleted) {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(400);
    }
}));
module.exports = router;
//# sourceMappingURL=comment.control.js.map