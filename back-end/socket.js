const { Server } = require('socket.io');
const CodeBlock = require("./models/codeBlock");

let mentorSocket = null;
const initSocket = (server) => {

    try {
        const io = new Server(server);
        // Socket.io connection handling
        io.on('connection', async (socket) => {

            // Check if code is correct and update smile icon
            const codeBlock = await CodeBlock.findOne({ title: socket.handshake.query.title });
            emitCorrectness(socket, codeBlock);

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
                    mentorSocket.emit('codeBlockUpdated', data);
                    socket.emit('codeBlockUpdated', data);
                    // Code Block Update in Database
                    codeBlock.code = data.code;
                    const updatedCodeBlock = await codeBlock.save();
                    emitCorrectness(socket, updatedCodeBlock);
                    emitCorrectness(mentorSocket, updatedCodeBlock);
                }
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                if (socket === mentorSocket) {
                    mentorSocket = null;
                }
            });
        });
    } catch (err) {
        console.log(err);
    }

};

// Function to emit code correctness events
const emitCorrectness = (socket, codeBlock) => {
    if (codeBlock && codeBlock.isCorrect()) {
        socket.emit('codeCorrect');
    } else if (codeBlock && !codeBlock.isCorrect()) {
        socket.emit('codeNotCorrect');
    }
};

module.exports = { initSocket, emitCorrectness };