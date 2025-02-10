const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27018/kvadur';

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000});
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;