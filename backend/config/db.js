const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
  const uri = process.env.MONGODB_URI; // Fetch URI from environment variables

  if (!uri) {
    throw new Error('MongoDB URI is not defined in .env file');
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;