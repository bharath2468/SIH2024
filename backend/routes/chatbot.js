const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Chat = require('../models/Chat');
const path = require('path');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');

// Initialize the Express app
const app = express();

// Enable CORS for all origins (you can specify the origin in production)
app.use(cors({
  origin: 'http://localhost:8000', // or specify FastAPI's URL e.g., 'http://localhost:8000'
  credentials: true
}));

// Set up multer for handling multipart/form-data
const upload = multer({ storage: multer.memoryStorage() });

router.post('/message', upload.single('image'), async (req, res) => {

  const formData = new FormData();

  const user = req.body.user;
  if (req.body.message){
    const message = req.body.message;
    formData.append('text', message);
} else{
  const message = '';
}
  if (req.body.image){
    const image = req.body.image ? req.body.image : null; // Convert image buffer to base64 string if present
    formData.append('file', image);
  }else{
    const image = '';
  }
  
  try {
    if (!user) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    console.log("1")
    // Send a POST request to FastAPI server
    const chatbotResponse = await axios.post('http://localhost:8000/predict', formData, {
      headers: formData.getHeaders() // Include form headers
    });
    console.log("2")
    console.log(chatbotResponse.data.response)
    // Create a new chat entry
    // const newChat = new Chat({
    //   user,
    //   message,
    //   image,
    //   chatbotResponse : chatbotResponse.data.response
    // });
    // await newChat.save();
    console.log("3")
    // Send the response back to the client
    res.status(200).json({ responseText: chatbotResponse.data.response });
    console.log("4")
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error processing message' });
  }
});

router.get('/history', async (req, res) => {
  const { userId } = req.query;

  try {
    const chat = await Chat.findOne({ userId }).select('messages');
    if (!chat) {
      return res.status(404).json({ error: 'No chat history found' });
    }
    res.json(chat.messages);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving chat history' });
  }
});

module.exports = router;
