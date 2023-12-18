let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let app = express();
const http = require('http');
const apiRouter = require("./routes/api");
const connectDB = require("./config/db");
const { Server } = require('socket.io');
const CodeBlock = require("./models/codeBlock")
const server = http.createServer(app);
const io = new Server(server);

//connecting db
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);

// Initialize mentorSocket variable
let mentorSocket = null;

// Socket.io connection handling
io.on('connection', (socket) => {

    // connect as mentor or student
    if (!mentorSocket) {
        mentorSocket = socket;
        mentorSocket.emit('role', 'mentor');
    } else {
        socket.emit('role', 'student');
    }

    // Update code block and notify clients
    socket.on('updateCodeBlock', async (data) => {

         if (socket !== mentorSocket) {
             // Real-time Update: Emit codeBlockUpdated event to updating socket and mentor's socket
            socket.emit('codeBlockUpdated', data);
            mentorSocket.emit('codeBlockUpdated', data);
            try {
                // Code Block Update in Database
                const codeBlock = await CodeBlock.findOneAndUpdate(
                    { title: data.title },
                    { $set: { code: data.code } },
                    { new: true }
                );
                // Check Code Correctness
                if (codeBlock && codeBlock.isCorrect()) {
                    socket.emit('codeCorrect');
                    mentorSocket.emit('codeCorrect');
                }
                else if(codeBlock && !codeBlock.isCorrect()){
                    socket.emit('codeNotCorrect');
                    mentorSocket.emit('codeNotCorrect');
                }
            } catch (err) {
                console.error(err);
            }
         }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('a user disconnected')
        if (socket === mentorSocket) {
            mentorSocket = null;
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;


// Async Case Example
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchData();
