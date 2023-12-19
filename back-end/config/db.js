const mongoose = require('mongoose');
const CodeBlock = require('../models/codeBlock');
const {initiateData} = require("../data/constants");
const MONGODB_URI = process.env.MONGODB_URI;

// This function establishes a connection to MongoDB and initializes data if the collection is empty.
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (conn) {
            console.log('MongoDB connected successfully');
            // Check if CodeBlock collection is empty
            const count = await CodeBlock.countDocuments();
            if (count === 0) {
                // Insert initial data if collection is empty
                await CodeBlock.create(initiateData);
                console.log('Initial data inserted successfully');
            } else {
                console.log('CodeBlock collection already has data');
            }
        } else {
            console.error('MongoDB connection failed');
        }
    } catch (err) {
        console.error('MongoDB Error:', err);
    }
};
module.exports = connectDB;
