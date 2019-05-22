const Repository = require('../foundation/repository');


exports.create = async (mail, password, name) => {
    const user = {
        mail: mail,
        password: password,
        name: name,
        date: new Date().toISOString()
        //l'ora è indietro di 2 ore... vedere toLocaleString()
    }
    const rep = Repository.loadModules(['user']);
    return await rep.saveUser(user);
};

exports.get = async (id: number) => {
    const rep = Repository.loadModules(['user']);
    const user = await rep.getUser(id);
    delete user.password;
    return user;
};


exports.authenticate = async (mail: string, password: string) => {
    const rep = Repository.loadModules(['user']);
    try {
        const result = await rep.getUserByMail(mail);
        if (result === undefined) {
            return false;
        } else {
            const user = result;
            if (user.password === password) {
                delete user.password;
                return user;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.log(error);
    }

}


exports.changePassword = (id, password, cb) => {
    const rep = Repository.loadModules(['user']);
    rep.update({ id: id }, { password: password }, (err, affected) => {
        if (err) return cb(err)
        cb(null, affected > 0)
    })
}