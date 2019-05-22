import { Condition } from "../condition";
const db = require('../dbmanager');

exports.methods = () => ({
    listComment: async (postid) => {
        const cond = [new Condition('post',postid)];   
        const result = await db.run('comment','select',cond);
        return result;
    },

    getComment: async (post,user) => {
        const cond = [new Condition('author',user.id),
                        new Condition('post',post.id)];
        const result = await db.run('comment','select',cond);
        return result[0];
    },

    saveComment: async (comment) => {
        const cond = [  new Condition('author',comment.user.id),
                        new Condition('post',comment.post.id),
                        new Condition('date',comment.date),
                        new Condition('body',comment.body)
                    ];      
        const result = await db.run('comment','save',cond);
        return result.insertId;

    },

    countComment: async (pid: number) => {
        const cond = [new Condition('post',pid)];
        const result = await db.run('comment','count',cond);
        return result[0]['total'];
    },

    deleteComment: async (id: number) => {
        const cond = [new Condition('id',id)];
        const result = await db.run('comment','delete',cond);
        return result.affectedRows;
    }

});