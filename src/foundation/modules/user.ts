import { Condition } from "../condition";
const db = require('../dbmanager');

exports.methods = () => ({
    getUser: async (id: number) => {
        const cond = [new Condition('id',id)];
        const result = await db.run('user','select',cond);
        return result[0];
    },

    getUserByMail: async(mail: string) => {
        const cond = [new Condition('mail',mail)];
        const result = await db.run('user','select',cond);
        return result[0];
    },

    saveUser: async(user) => {
        console.log('Saving user...');
        var cond = [new Condition('mail',user.mail)];
        const result = await db.run('user','select',cond);
        console.log(result);
        if(result.length === 0) {
            console.log('Mail available...');
            cond = [  new Condition('mail',user.mail),
                            new Condition('password',user.password),
                            new Condition('name',user.name),
                            new Condition('date',user.date)
                    ];
            return await db.run('user','save',cond);
        } else {
            console.log('Mail already exists');
            return false; //la mail esiste già
        }                   
    }

});