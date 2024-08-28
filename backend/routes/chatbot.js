const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Chat = require('../models/Chat');
const path = require('path');
const multer = require('multer');

// Set up multer for handling multipart/form-data
const upload = multer({ storage: multer.memoryStorage() });


router.post('/message', upload.single('image'), async (req, res) => {
  const user = req.body.user;
  const message = req.body.message;
  const image = req.file ? req.file.buffer.toString('base64') : null; // Convert image buffer to base64 string if present
  
  try {
    if (!user || !message) {
      return res.status(400).json({ error: 'User ID and message are required' });
    }

    // Create a new chat entry
    const newChat = new Chat({
      user,
      message,
      image,
      chatbotResponse: 'Here is your response.'
    });

    await newChat.save();

    // Send the response back to the client
    res.json({ responseText: 'Here is your response.' });

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
