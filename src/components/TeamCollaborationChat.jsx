import { useState, useEffect, useRef } from 'react';
import './TeamCollaborationChat.css';

const TeamCollaborationChat = () => {
  const messages = [
    { 
      id: 1, 
      text: "Good morning team! Ready for the sprint planning meeting?", 
      sender: "alice", 
      time: "9:00 AM",
      user: { name: "Alice Johnson", avatar: "👩‍💻", role: "Product Manager" }
    },
    { 
      id: 2, 
      text: "Yes! I've prepared the user stories for review.", 
      sender: "bob", 
      time: "9:02 AM",
      user: { name: "Bob Smith", avatar: "👨‍💼", role: "Developer" }
    },
    { 
      id: 3, 
      text: "Great! I'll share the design mockups in a moment.", 
      sender: "carol", 
      time: "9:03 AM",
      user: { name: "Carol Davis", avatar: "🎨", role: "Designer" }
    },
    { 
      id: 4, 
      text: "Perfect! Looking forward to seeing them.", 
      sender: "me", 
      time: "9:04 AM",
      user: { name: "You", avatar: "😊", role: "Team Lead" }
    },
    { 
      id: 5, 
      text: "I'll have the API documentation ready by noon.", 
      sender: "bob", 
      time: "9:05 AM",
      user: { name: "Bob Smith", avatar: "👨‍💼", role: "Developer" }
    },
  ];
  
  const [selectedChannel, setSelectedChannel] = useState('general');

  const channels = [
    { id: 'general', name: 'general', icon: '💬', unread: 0 },
    { id: 'development', name: 'development', icon: '⚡', unread: 3 },
    { id: 'design', name: 'design', icon: '🎨', unread: 1 },
    { id: 'random', name: 'random', icon: '🎲', unread: 0 }
  ];

  const onlineUsers = [
    { name: "Alice Johnson", avatar: "👩‍💻", status: "online" },
    { name: "Bob Smith", avatar: "👨‍💼", status: "online" },
    { name: "Carol Davis", avatar: "🎨", status: "away" },
    { name: "Dave Wilson", avatar: "👨‍🔬", status: "offline" }
  ];

  return (
    <div className="team-chat">
      <div className="team-sidebar">
        <div className="workspace-header">
          <div className="workspace-info">
            <h3>TechTeam</h3>
            <span className="workspace-url">techteam.slack.com</span>
          </div>
          <div className="workspace-avatar">🚀</div>
        </div>
        
        <div className="channels-section">
          <h4>Channels</h4>
          <div className="channel-list">
            {channels.map((channel) => (
              <div 
                key={channel.id}
                className={`channel-item ${selectedChannel === channel.id ? 'active' : ''}`}
                onClick={() => setSelectedChannel(channel.id)}
              >
                <span className="channel-icon">{channel.icon}</span>
                <span className="channel-name"># {channel.name}</span>
                {channel.unread > 0 && (
                  <span className="unread-badge">{channel.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="users-section">
          <h4>Team Members</h4>
          <div className="user-list">
            {onlineUsers.map((user, index) => (
              <div key={index} className="user-item">
                <div className="user-avatar-container">
                  <span className="user-avatar">{user.avatar}</span>
                  <span className={`user-status ${user.status}`}></span>
                </div>
                <span className="user-name">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="team-main">
        <div className="channel-header">
          <div className="channel-info">
            <h3># {selectedChannel}</h3>
            <span className="channel-description">
              {selectedChannel === 'general' && 'Company-wide announcements and work-based matters'}
              {selectedChannel === 'development' && 'Development discussions and code reviews'}
              {selectedChannel === 'design' && 'Design feedback and creative discussions'}
              {selectedChannel === 'random' && 'Non-work banter and water cooler conversation'}
            </span>
          </div>
          <div className="channel-actions">
            <button className="channel-btn">📌</button>
            <button className="channel-btn">⭐</button>
            <button className="channel-btn">👥</button>
          </div>
        </div>

        <div className="team-messages">
          {messages.map((message) => (
            <div key={message.id} className="team-message">
              <div className="message-avatar">{message.user.avatar}</div>
              <div className="message-content">
                <div className="message-header">
                  <span className="message-author">{message.user.name}</span>
                  <span className="message-role">{message.user.role}</span>
                  <span className="message-time">{message.time}</span>
                </div>
                <div className="message-text">{message.text}</div>
              </div>
            </div>
          ))}

        </div>

        <div className="team-input-section">
          <div className="team-input">
            <button type="button" className="input-action">📎</button>
            <input
              type="text"
              value=""
              placeholder={`Message #${selectedChannel}`}
              className="team-message-field"
              readOnly
            />
            <button type="button" className="input-action">😊</button>
            <button type="button" className="input-action">@</button>
            <button type="button" className="team-send-btn">
              <span>⚡</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCollaborationChat;