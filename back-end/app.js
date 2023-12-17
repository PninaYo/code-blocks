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

module.exports = app;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('updateCodeBlock', (data) => {
        console.log('updateCodeBlock:', data);
        socket.broadcast.emit('codeBlockUpdated', data);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log("Server running on port ${PORT}");
});

module.exports = app;