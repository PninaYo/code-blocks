const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const apiRouter = require("./routes/api");
const connectDB = require("./config/db");
const { initSocket } = require('./socket');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const app = express();
const server = http.createServer(app);

// Use CORS middleware with the options defined
app.use(cors(corsOptions));

// Connecting to the database
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);

// Initializing socket
initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;