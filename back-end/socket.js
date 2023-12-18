const { Server } = require('socket.io');
const CodeBlock = require("./models/codeBlock");

let mentorSocket = null;
const initSocket = (server) => {
    const io = new Server(server);

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
                mentorSocket.emit('codeBlockUpdated', data);
                socket.emit('codeBlockUpdated', data);
                try {
                    // Code Block Update in Database
                    const codeBlock = await CodeBlock.findOneAndUpdate(
                        { title: data.title },
                        { $set: { code: data.code } },
                        { new: true }
                    );

                    emitCorrectness(socket, codeBlock);
                    emitCorrectness(mentorSocket, codeBlock);

                } catch (err) {
                    console.error(err);
                }
            }
        });
        // Handle disconnection
        socket.on('disconnect', () => {
            if (socket === mentorSocket) {
                mentorSocket = null;
            }
        });
    });
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
