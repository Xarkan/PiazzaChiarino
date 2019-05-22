"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const session = require('express-session');
const helmet = require('helmet');
const app = express_1.default();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(body_parser_1.default.json()); // to support JSON-encoded bodies
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(helmet());
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 's3Cur3',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false,
}));
app.use(express_1.default.static(__dirname + '/public'));
app.use(require('./middlewares/user.mid'));
app.use('/api', require('./control'));
server.listen(5000);
app.listen(constants_1.PORT, () => {
    console.log('Server listening on port ' + constants_1.PORT);
});
io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
module.exports = app;
//# sourceMappingURL=app.js.map