const User = require('../model/user')

//carica l'utente che sta facendo la richiesta
module.exports = async(req, res, next) => {
    if (req.session && req.session.user) {
        const user = await User.get(req.session.user.id); 
            if (user) {
                req.user = user
            } else {
                delete req.user
                delete req.session.user
            }
            next()
    } else {
        next()
    }
}