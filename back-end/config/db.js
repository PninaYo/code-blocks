const mongoose = require('mongoose');
const CodeBlock = require('../models/codeBlock');
const {initiateData} = require("../data/constants");

// This function establishes a connection to MongoDB and initializes data if the collection is empty.
const connectDB = async () => {
    try {
        // Connect to MongoDB
        const conn = await mongoose.connect('mongodb://pnina:1234@localhost:27017/db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        // Create and insert initial data if the collection is empty
        const count = await CodeBlock.countDocuments();
        if (count === 0) {
            await CodeBlock.create(initiateData);
        }
    } catch (err) {
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
