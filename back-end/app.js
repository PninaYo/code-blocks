const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const apiRouter = require("./routes/api");
const connectDB = require("./config/db");
const { initSocket } = require('./socket');
const cors = require('cors');
const app = express();

const server = http.createServer(app);

// Connecting to the database
connectDB();

// Configuring CORS
const corsOptions = {
    //  frontend url
    origin: [
        'http://127.0.0.1:3000',
        'http://localhost:3000',
    ],
    credentials: true,
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/api', apiRouter);

// Initializing socket
initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
