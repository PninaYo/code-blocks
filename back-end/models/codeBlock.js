const mongoose = require('mongoose');

const codeBlockSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    correctCode: {
        type: String,
        required: true
    },
});

// Define isCorrect method within the schema
codeBlockSchema.methods.isCorrect = function() {
    return this.code === this.correctCode;
};

const CodeBlock = mongoose.model('CodeBlock', codeBlockSchema);
module.exports = CodeBlock;