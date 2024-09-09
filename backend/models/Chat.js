const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true, default: '' },  // User's text message
    image: {
        data: Buffer,      // Binary data for storing the image
        contentType: String // Content type of the image (e.g., 'image/jpeg')
    },
    chatbotResponse: { type: String, required: true },   // Chatbot's text response
    createdAt: { type: Date, default: Date.now } // Timestamp
});

// Static method to retrieve chat history by userId
ChatSchema.statics.getChatHistoryByUserId = async function(userId) {
    try {
        const chats = await this.find({ userId }).sort({ createdAt: 1 }).exec(); // Sort by createdAt ascending
        return chats;
    } catch (error) {
        throw new Error('Error retrieving chat history');
    }
};

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
