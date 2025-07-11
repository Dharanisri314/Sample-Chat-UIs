import { useState, useEffect, useRef } from 'react';
// Import the CSS file for styling
import './ModernMessagingChat.css';

const ModernMessagingChat = () => {
  // Use 'useState' to store the value of the message typing input field.
  // It starts empty.
  const [inputValue, setInputValue] = useState('');

  // Use 'useState' to store the chat messages.
  // It starts with your provided initial messages.
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hey! How are you doing today?", sender: "contact", time: "10:30 AM", avatar: "👨‍💼" },
    { id: 2, text: "I'm doing great! Just finished my React project. How about you?", sender: "me", time: "10:32 AM" },
    { id: 3, text: "That's awesome! I'd love to see it sometime.", sender: "contact", time: "10:33 AM", avatar: "👨‍💼" },
    { id: 4, text: "Sure! I'll send you the link once it's deployed.", sender: "me", time: "10:35 AM" },
    { id: 5, text: "Looking forward to it! 🚀", sender: "contact", time: "10:36 AM", avatar: "👨‍💼" },
  ]);

  // A reference to help scroll the messages view to the bottom.
  const messagesEndRef = useRef(null);

  // This 'useEffect' hook is used to automatically scroll down when messages change.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // This function is called when you type in the input field.
  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Saves what you type into 'inputValue'.
  };

  // This function is called when the send button is pressed or Enter key is hit.
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return; // Does not send if the message is empty.

    // Creates a new message object.
    const newMessage = {
      id: chatMessages.length + 1, // New unique ID
      text: inputValue, // The message you typed
      sender: "me", // Sender is 'me'
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), // Current time
      avatar: "😊" // Your avatar
    };

    // Updates 'chatMessages' by adding the new message to the existing ones.
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue(''); // Clears the typing box after sending the message.
  };

  // This function is used to send a message when the Enter key is pressed.
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
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
        {/* Use 'chatMessages' state to map and display messages */}
        {chatMessages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {/* Show avatar for 'contact' messages only */}
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
        {/* A div to mark the end of messages for scrolling */}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input">
        <button type="button" className="attachment-btn">📎</button>
        <input
          type="text"
          value={inputValue} // Binds the input value to the 'inputValue' state.
          placeholder="Type a message..."
          className="message-field"
          onChange={handleInputChange} // Updates 'inputValue' as you type.
          onKeyPress={handleKeyPress} // Sends message when Enter key is pressed.
          // The 'readOnly' attribute has been removed!
        />
        <button type="button" className="emoji-btn">😊</button>
        <button 
          type="button" 
          className="send-btn"
          onClick={handleSendMessage} // Sends message when the button is clicked.
        >
          <span>➤</span>
        </button>
      </div>
    </div>
  );
};

export default ModernMessagingChat;
