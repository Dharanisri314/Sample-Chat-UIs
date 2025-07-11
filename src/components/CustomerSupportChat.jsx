import { useState, useEffect, useRef } from 'react';
import './CustomerSupportChat.css';

const CustomerSupportChat = () => {
  const messages = [
    { 
      id: 1, 
      text: "Hello! I'm Sarah from customer support. How can I help you today?", 
      sender: "agent", 
      time: "2:15 PM",
      agent: { name: "Sarah", avatar: "👩‍💼" }
    },
    { id: 2, text: "Hi! I'm having trouble with my account login.", sender: "customer", time: "2:16 PM" },
    { 
      id: 3, 
      text: "I'd be happy to help you with that! Can you tell me what error message you're seeing?", 
      sender: "agent", 
      time: "2:17 PM",
      agent: { name: "Sarah", avatar: "👩‍💼" }
    },
    { id: 4, text: "It says 'Invalid password' but I'm sure I'm entering the right one.", sender: "customer", time: "2:18 PM" },
    { 
      id: 5, 
      text: "Let me help you reset your password. I'll send you a secure reset link.", 
      sender: "agent", 
      time: "2:19 PM",
      agent: { name: "Sarah", avatar: "👩‍💼" }
    },
  ];
  
  const isOnline = true;

  const quickReplies = [
    "I need help with billing",
    "Technical support",
    "Account issues",
    "Product information"
  ];

  return (
    <div className="support-chat">
      <div className="support-header">
        <div className="company-info">
          <div className="company-logo">🏢</div>
          <div className="company-details">
            <h3>TechCorp Support</h3>
            <div className="support-status">
              <span className="status-indicator online"></span>
              <span>Online • Usually replies instantly</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="minimize-btn">−</button>
          <button className="close-btn">×</button>
        </div>
      </div>

      <div className="support-messages">
        <div className="welcome-message">
          <div className="welcome-icon">💬</div>
          <h4>Welcome to TechCorp Support!</h4>
          <p>We're here to help you 24/7. What can we assist you with today?</p>
        </div>

        {messages.map((message) => (
          <div key={message.id} className={`support-message ${message.sender}`}>
            {message.sender === 'agent' && (
              <div className="agent-avatar">{message.agent.avatar}</div>
            )}
            <div className="message-wrapper">
              {message.sender === 'agent' && (
                <div className="agent-name">{message.agent.name}</div>
              )}
              <div className="message-bubble">
                <p>{message.text}</p>
              </div>
              <span className="message-timestamp">{message.time}</span>
            </div>
          </div>
        ))}

      </div>

      <div className="quick-replies">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            className="quick-reply-btn"
          >
            {reply}
          </button>
        ))}
      </div>

      <div className="support-input">
        <input
          type="text"
          value=""
          placeholder="Type your message..."
          className="support-field"
          readOnly
        />
        <button type="button" className="support-send-btn">
          <span>▶</span>
        </button>
      </div>

      <div className="support-footer">
        <span>Powered by TechCorp Support • We're here to help!</span>
      </div>
    </div>
  );
};

export default CustomerSupportChat;