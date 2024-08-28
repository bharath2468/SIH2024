const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const chatRoutes = require('./routes/chatbot'); // Import your chatbot routes
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const connectDB = require('./config/db');


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins by default
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chatbot', chatRoutes);

// Define a test route (optional)
app.get('/', (req, res) => {
  res.send('Connected to server');
  console.log("Connected to server")
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
connectDB()
