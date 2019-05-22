var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const User = require('../model/user');
//carica l'utente che sta facendo la richiesta
module.exports = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (req.session && req.session.user) {
        const user = yield User.get(req.session.user.id);
        if (user) {
            req.user = user;
        }
        else {
            delete req.user;
            delete req.session.user;
        }
        next();
    }
    else {
        next();
    }
});
//# sourceMappingURL=user.mid.js.map