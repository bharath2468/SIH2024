import React, { useState, useEffect } from 'react';
import { CiUser } from "react-icons/ci";
import Chatbot from '../components/Chatbot';
import ChatHistory from '../components/ChatHistory';
import '../styles/Dashboard.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const storedMessages = JSON.parse(sessionStorage.getItem('messages')) || [];
        setMessages(storedMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };
    loadMessages();
  }, []);

  const handleSendMessage = async (message) => {
    const newMessage = { ...message, sender: 'user', id: messages.length };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    sessionStorage.setItem('messages', JSON.stringify(updatedMessages));

    try {
      const formData = new FormData();
      formData.append('user', JSON.parse(localStorage.getItem('user'))._id); // Replace with actual user token

      if (message.type === 'text') {
        formData.append('message', message.content);
      }
      if (message.type === 'image') {
        formData.append('image', message.content);
      }

      const response = await fetch('http://localhost:5000/api/chatbot/message', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const botresponse = await response.json();
        setTimeout(() => {
          const botMessage = {
            type: 'text',
            content: `"${botresponse.responseText}"`,
            sender: 'bot',
            id: updatedMessages.length,
          };
          const newMessages = [...updatedMessages, botMessage];
          setMessages(newMessages);
          sessionStorage.setItem('messages', JSON.stringify(newMessages));
        }, 1000);
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const toggleHistory = () => {
    setIsHistoryOpen(prev => !prev);
  };

  return (
    <div className={`app-container ${isHistoryOpen ? 'history-open' : ''}`}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <div className={`history-container ${isHistoryOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleHistory}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
        <ChatHistory messages={messages} />
      </div>
      <div className="chat-container">
        <header className="chatbot-header">
          {!isHistoryOpen && (
            <button className="hamburger" onClick={toggleHistory}>
              ☰
            </button>
          )}
          <h1 className='bot-title'>Vision Vortex</h1>
          <button className="user-icon"><CiUser /></button>
        </header>
        <div className="chat-content">
          <div className="messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.type === 'text' ? (
                  msg.content
                ) : (
                  <img src={msg.content} alt="Uploaded" className="uploaded-image" />
                )}
              </div>
            ))}
          </div>
          <Chatbot className='chatbot' onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;
