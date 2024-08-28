import React from 'react';
import '../styles/ChatHistory.css';
import { CiCirclePlus } from "react-icons/ci";

function ChatHistory({ messages }) {
  return (
    <div className="history">
      <button className='new-chat-btn'><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
      <h3>Chat History</h3>
      <ul>
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong>
            {msg.type === 'text' ? (
              msg.content
            ) : (
              <img src={msg.content} alt="uploaded" className="uploaded-image" />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ChatHistory;
