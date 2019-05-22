
export { };
const Repository = require('../foundation/repository');
const User = require('./user');
const Reaction = require('./reaction');
const Comment = require('./comment');


exports.create = async (user, latitude: number, longitude: number, body: any, type: string) => {
    const post = {
        user: user,
        latitude: latitude,
        longitude: longitude,
        date: new Date().toISOString(),
        body: body,
        type: type
    }
    const rep = Repository.loadModules(['post']);
    return await rep.savePost(post);
};

exports.get = async (id: number) => {
    const rep = Repository.loadModules(['post']);
    return await rep.getPost(id);
};

exports.list = async (lat: number, long: number, range: number, user) => {
    if (range > 10000) {
        range = 10000;
    }
    const degRange = range / 111139;
    const rep = Repository.loadModules(['post']);
    const list: any[] = await rep.listPost(lat, long, degRange);
    return await Promise.all(list.map(async (post) => {
        const author = await User.get(post.author);
        const reaction = await Reaction.get(post, user);
        const numReactions = await Reaction.count(post.id);
        const numComments = await Comment.count(post.id);
        const comment = await Comment.get(post, user);
        console.log(reaction);
        if(reaction !== undefined) {
            post.reacted = true;
        }else {
            post.reacted = false;
        }
        if (comment !== undefined) {
            post.commented = true;
        } else {
            post.commented = false;
        }
        post.numReactions = numReactions;
        post.numComments = numComments;
        post.author = author;
        return post;
    })
    )
}


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