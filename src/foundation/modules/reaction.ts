import { Condition } from "../condition";
const db = require('../dbmanager');

exports.methods = () => ({
    listReaction: async (postid: number) => {
        const cond = [new Condition('post',postid)];   
        const result = await db.run('reaction','select',cond);
        return result;
    },

    getReaction: async (post,user) => {
        const cond = [new Condition('author',user.id),
                        new Condition('post',post.id)];
        const result = await db.run('reaction','select',cond);
        return result[0];
    },

    getReactionByAuthor: async (user) => {
        const cond = [new Condition('author', user.id)];
        const result = await db.run('reaction','select',cond);
        console.log(result);
        console.log(result[0]);
        return result[0];
    },

    saveReaction: async (reaction) => {
        const cond = [  new Condition('author',reaction.user.id),
                        new Condition('post',reaction.post.id),
                        new Condition('date',reaction.date)
                    ];      
        const result = await db.run('reaction','save',cond);
        return result.insertId;
    },

    countReaction: async (pid: number) => {
        const cond = [new Condition('post', pid)];
        const result = await db.run('reaction', 'count',cond);
        return result[0]['total'];
    },

    deleteReaction: async (id: number) => {
        const cond = [new Condition('id',id)];
        const result = await db.run('reaction','delete',cond);
        return result.affectedRows;
    }

});