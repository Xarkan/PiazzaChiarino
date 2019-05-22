import {PORT} from './constants';
import bodyParser from 'body-parser';
import express from 'express';
const session = require('express-session');
const helmet = require('helmet');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
}));
app.use(helmet()); 

app.set('trust proxy', 1); // trust first proxy
app.use( session({
    secret : 's3Cur3',
    name : 'sessionId',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(express.static(__dirname + '/public'));
app.use(require('./middlewares/user.mid'));
app.use('/api',require('./control'));

server.listen(5000);

app.listen(PORT, () => {
        console.log('Server listening on port ' + PORT);
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

module.exports = app;

