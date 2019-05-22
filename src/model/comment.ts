export {};
const Repository = require('../foundation/repository');
const User = require('./user');


exports.create = async (user, post, body) => {
    const comment = {
        user: user,
        post: post,
        date: new Date().toISOString(),
        body: body,    
    }
    const rep = Repository.loadModules(['comment']);
    return await rep.saveComment(comment);
};

exports.list = async (id: number) => {
    const rep = Repository.loadModules(['comment']);
    const list: any[] = await rep.listComment(id);
    return await Promise.all(list.map( async (comment) => {
        const user = User.get(comment.author);
        comment.author = user;
        return comment;
    })
    )
};

exports.get = async (post, user) => {
    const rep = Repository.loadModules(['comment']);
    return await rep.getComment(post, user);
};

exports.count = async (id: number) => {
    const rep = Repository.loadModules(['comment']);
    return await rep.countComment(id);
};

exports.delete = async (id: number, user) => {
    const rep = Repository.loadModules(['comment']);
    const comment = await rep.getComment(id);
    if(comment.author === user.id) {
        return await rep.deleteComment(id);
    } else {
        return false;
    }
};


