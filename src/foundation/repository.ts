
exports.loadModules = (list: Array<string>) => {
        const modules = Object;
        for (const key in list) {
            switch (list[key]) {
                case 'user':
                    const UserManager = require('./modules/user');
                    Object.assign(modules,UserManager.methods());
                    break;
                case 'post':
                    const PostManager = require('./modules/post');
                    Object.assign(modules,PostManager.methods());
                    break;
                case 'comment':
                    const CommentManager = require('./modules/comment');
                    Object.assign(modules,CommentManager.methods());
                    break;
                case 'reaction':
                    const ReactionManager = require('./modules/reaction');
                    Object.assign(modules,ReactionManager.methods());
                    break;    
            }

        }
        return Object.assign( {} , modules );
    }