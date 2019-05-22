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
const router = express_1.default.Router(), User = require('../model/user'), auth = require('../middlewares/auth');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + req.session.user.id);
    }
});
const upload = multer({ storage: storage });
router.get('/:id', auth, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = yield User.get(req.params.id);
    res.send(user);
}));
router.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = yield User.authenticate(req.body.mail, req.body.password);
    if (user) {
        req.session.user = user;
        res.sendStatus(200);
    }
    else {
        res.sendStatus(400);
    }
}));
router.post('/signin', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const mail = req.body.mail;
    const password = req.body.password;
    const username = req.body.username;
    const user = yield User.create(mail, password, username);
    if (user) {
        delete user.password;
        req.session.user = user;
        res.sendStatus(200);
    }
    else {
        res.sendStatus(400);
    }
}));
router.post('/logout', auth, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error: ' + err);
        }
        else {
            res.sendStatus(200);
            console.log('session:' + req.session);
        }
    });
});
router.post('/avatar', auth, upload.single('avatar'), (req, res) => {
    res.sendStatus(200);
});
module.exports = router;
//# sourceMappingURL=user.control.js.map