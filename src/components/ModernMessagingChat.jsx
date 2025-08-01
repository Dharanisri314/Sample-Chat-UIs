MessagingChat;

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ModernMessagingChat.css';

const ModernMessagingChat = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [editId, setEditId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setChatMessages(
        res.data.map((msg) => ({
          id: msg.id,
          text: msg.name,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          sender: 'me',
          avatar: '😊'
        }))
      );
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  };

  const handleSendOrUpdate = async () => {
    if (!inputValue.trim()) return;

    if (editId) {
      try {
        const res = await axios.put(`http://localhost:5000/api/users/${editId}`, {
          name: inputValue
        });
        setChatMessages((prev) =>
          prev.map((msg) =>
            msg.id === editId ? { ...msg, text: res.data.name } : msg
          )
        );
        setEditId(null);
      } catch (err) {
        console.error('Update failed:', err);
      }
    } else {
      try {
        const res = await axios.post('http://localhost:5000/api/users', {
          name: inputValue
        });
        const newMessage = {
          id: res.data.id,
          text: res.data.name,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          sender: 'me',
          avatar: '😊'
        };
        setChatMessages((prev) => [...prev, newMessage]);
      } catch (err) {
        console.error('Post failed:', err);
      }
    }

    setInputValue('');
  };

  const handleEdit = (id, text) => {
    setInputValue(text);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setChatMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendOrUpdate();
    }
  };

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
        {chatMessages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-avatar">{message.avatar}</div>
            <div className="message-content">
              <div className="message-bubble">
                <p>{message.text}</p>
                <button onClick={() => handleEdit(message.id, message.text)}>✏️</button>
                <button onClick={() => handleDelete(message.id)}>🗑️</button>
              </div>
              <span className="message-time">{message.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input">
        <button type="button" className="attachment-btn">📎</button>
        <input
          type="text"
          value={inputValue}
          placeholder="Type a message..."
          className="message-field"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="button" className="emoji-btn">😊</button>
        <button type="button" className="send-btn" onClick={handleSendOrUpdate}>
          <span>{editId ? '✅' : '➤'}</span>
        </button>
      </div>
    </div>
  );
};

export default ModernMessagingChat;
