import { Condition } from "../condition";
const db = require('../dbmanager');

exports.methods = () => ({
    listPost: async (lat: number, long: number, range: number) => {
        const cond = [];
        console.log(lat + range);
        cond.push(new Condition('latitude',lat + range, '<'));
        cond.push(new Condition('latitude',lat - range, '>'));
        cond.push(new Condition('longitude', long + range, '<'));
        cond.push(new Condition('longitude', long - range, '>'));       
        const result = await db.run('post','select',cond);
        return result;
    },

    getPost: async (id: number) => {
        const cond = [new Condition('id',id)];
        const result = await db.run('post','select',cond);
        return result[0];
    },

    savePost: async (post) => {
        const cond = [  new Condition('author',post.user.id),
                        new Condition('latitude',post.latitude),
                        new Condition('longitude',post.longitude),
                        new Condition('date',post.date),
                        new Condition('text',post.body),
                        new Condition('type',post.type)
                    ];
        try {
            const result = await db.run('post','save',cond);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

});