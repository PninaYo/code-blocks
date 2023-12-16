
const mongoose = require('mongoose');
const CodeBlock = require('../models/codeBlock');
const {initiateData} = require("../data/constants");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        // Create and insert initial data if the collection is empty
        const count = await CodeBlock.countDocuments();
        if (count === 0) {
            await CodeBlock.create(initiateData);
            console.log('Initial data inserted into the database.');
        }
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
