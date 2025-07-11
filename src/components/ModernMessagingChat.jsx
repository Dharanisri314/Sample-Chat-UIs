import { useState, useEffect, useRef } from 'react';
import './ModernMessagingChat.css';

const ModernMessagingChat = () => {
  const messages = [
    { id: 1, text: "Hey! How are you doing today?", sender: "contact", time: "10:30 AM", avatar: "👨‍💼" },
    { id: 2, text: "I'm doing great! Just finished my React project. How about you?", sender: "me", time: "10:32 AM" },
    { id: 3, text: "That's awesome! I'd love to see it sometime.", sender: "contact", time: "10:33 AM", avatar: "👨‍💼" },
    { id: 4, text: "Sure! I'll send you the link once it's deployed.", sender: "me", time: "10:35 AM" },
    { id: 5, text: "Looking forward to it! 🚀", sender: "contact", time: "10:36 AM", avatar: "👨‍💼" },
  ];

  return (
    <div className="modern-chat">
      <div className="chat-header">
        <div className="contact-info">
          <div className="avatar">👨‍💼</div>
          <div className="contact-details">
            <h3>John Doe</h3>
            <span className="status">Online</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="action-btn">📞</button>
          <button className="action-btn">📹</button>
          <button className="action-btn">ℹ️</button>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.sender === 'contact' && (
              <div className="message-avatar">{message.avatar}</div>
            )}
            <div className="message-content">
              <div className="message-bubble">
                <p>{message.text}</p>
              </div>
              <span className="message-time">{message.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="message-input">
        <button type="button" className="attachment-btn">📎</button>
        <input
          type="text"
          value=""
          placeholder="Type a message..."
          className="message-field"
          readOnly
        />
        <button type="button" className="emoji-btn">😊</button>
        <button type="button" className="send-btn">
          <span>➤</span>
        </button>
      </div>
    </div>
  );
};

export default ModernMessagingChat;