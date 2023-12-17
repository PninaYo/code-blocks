let express = require('express');
const http = require('http'); // Change here to import http
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const apiRouter = require("./routes/api");
const connectDB = require("./config/db");
const { Server } = require('socket.io');

let app = express();
const server = http.createServer(app);
const io = new Server(server);
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

let mentorSocket = null;

io.on('connection', (socket) => {

    console.log('a user connected')

    if (!mentorSocket) {
        mentorSocket = socket;
        mentorSocket.emit('role', 'mentor');
    } else {
        socket.emit('role', 'student');
    }

    socket.on('updateCodeBlock', (data) => {
        if (socket !== mentorSocket) {
            mentorSocket.emit('codeBlockUpdated', data);
            // update database with new code block
        }
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected')
        if (socket === mentorSocket) {
            mentorSocket = null;
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
});

module.exports = app;