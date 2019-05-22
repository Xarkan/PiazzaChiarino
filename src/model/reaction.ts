export {};
const Repository = require('../foundation/repository');
const User = require('./user');


exports.create = async (user, post) => {
    const reaction = {
        user: user,
        post: post,
        date: new Date().toISOString()  
    }
    const rep = Repository.loadModules(['reaction']);
    const result = await rep.getReactionByAuthor(user);
    if(result === undefined) {
        return await rep.saveReaction(reaction);
    } else {
        if(result.author !== user.id ) {
            return await rep.saveReaction(reaction);
        } else {
            return false;
        }
    }
};

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

exports.list = async (id: number) => {
    const rep = Repository.loadModules(['reaction']);
    return await rep.listReaction(id);
};   

exports.get = async (post,user) => {
    const rep = Repository.loadModules(['reaction']);
    return await rep.getReaction(post,user);
};

exports.count = async (id: number) => {
    const rep = Repository.loadModules(['reaction']);
    return await rep.countReaction(id);
};

exports.delete = async (id: number, user) => {
    const rep = Repository.loadModules(['reaction']);
    const reaction = rep.getReaction(id);
    if(reaction.author === user.id) {
        return await rep.deleteReaction(id);
    } else {
        return false;
    }
}

/*export class Reaction {
    public id: number;
    public author: User;
    public date: Date;
}*/
