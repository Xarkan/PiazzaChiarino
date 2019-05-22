var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Repository = require('../foundation/repository');
exports.create = (mail, password, name) => __awaiter(this, void 0, void 0, function* () {
    const user = {
        mail: mail,
        password: password,
        name: name,
        date: new Date().toISOString()
        //l'ora è indietro di 2 ore... vedere toLocaleString()
    };
    const rep = Repository.loadModules(['user']);
    return yield rep.saveUser(user);
});
exports.get = (id) => __awaiter(this, void 0, void 0, function* () {
    const rep = Repository.loadModules(['user']);
    const user = yield rep.getUser(id);
    delete user.password;
    return user;
});
exports.authenticate = (mail, password) => __awaiter(this, void 0, void 0, function* () {
    const rep = Repository.loadModules(['user']);
    try {
        const result = yield rep.getUserByMail(mail);
        if (result === undefined) {
            return false;
        }
        else {
            const user = result;
            if (user.password === password) {
                delete user.password;
                return user;
            }
            else {
                return false;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.changePassword = (id, password, cb) => {
    const rep = Repository.loadModules(['user']);
    rep.update({ id: id }, { password: password }, (err, affected) => {
        if (err)
            return cb(err);
        cb(null, affected > 0);
    });
};
//# sourceMappingURL=user.js.map