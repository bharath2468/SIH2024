import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa';
import { IoSend } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import '../styles/Chatbot.css';

function Chatbot({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSend = () => {
    if (message.trim() !== '') {
      onSendMessage({ type: 'text', content: message });
      setMessage('');
    }

};

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSendMessage({ type: 'image', content: reader.result });
        setSelectedFile(null); // Clear the selected file after uploading
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="message-input-container">
      <div className="input-wrapper">
        <label htmlFor="file-input">
          <FaPaperclip className="icon" />
        </label>
        <input
          type="file"
          id="file-input"
          accept=".jpg,.png"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          placeholder="Message VisionBOT"
          id='text'
        />
        <button onClick={handleSend} className="send-btn"><IoSend /></button>
        {selectedFile && <button onClick={handleUpload} className="upload-btn"><FiUpload /></button>}
      </div>
    </div>
  );
};

export default Chatbot;
