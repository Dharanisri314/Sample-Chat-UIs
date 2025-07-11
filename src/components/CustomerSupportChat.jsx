import { useState, useEffect, useRef } from 'react';
// Import the CSS file for styling
import './CustomerSupportChat.css';

const CustomerSupportChat = () => {
  // Use 'useState' to store the value of the message typing input field.
  // It starts empty.
  const [inputValue, setInputValue] = useState('');

  // Use 'useState' to store the chat messages.
  // It starts with your provided initial messages.
  const [chatMessages, setChatMessages] = useState([
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
  ]);

  // A reference to help scroll the messages view to the bottom.
  const messagesEndRef = useRef(null);

  // This 'useEffect' hook is used to automatically scroll down when messages change.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const isOnline = true; // Online status (this remains constant in this example)

  const quickReplies = [
    "I need help with billing",
    "Technical support",
    "Account issues",
    "Product information"
  ];

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
      sender: "customer", // Sender is 'customer'
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), // Current time
    };

    // Updates 'chatMessages' by adding the new message to the existing ones.
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue(''); // Clears the typing box after sending the message.
  };

  // This function is called when a quick reply button is clicked.
  const handleQuickReplyClick = (replyText) => {
    setInputValue(replyText); // Puts the quick reply text into the typing box.
    // You could also send it immediately if needed: handleSendMessage();
  };

  // This function is used to send a message when the Enter key is pressed.
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

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

        {/* Use 'chatMessages' state to map and display messages */}
        {chatMessages.map((message) => (
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
        {/* A div to mark the end of messages for scrolling */}
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-replies">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            className="quick-reply-btn"
            onClick={() => handleQuickReplyClick(reply)} // Sends the quick reply text when clicked.
          >
            {reply}
          </button>
        ))}
      </div>

      <div className="support-input">
        <input
          type="text"
          value={inputValue} // Binds the input value to the 'inputValue' state.
          placeholder="Type your message..."
          className="support-field"
          onChange={handleInputChange} // Updates 'inputValue' as you type.
          onKeyPress={handleKeyPress} // Sends message when Enter key is pressed.
          // The 'readOnly' attribute has been removed!
        />
        <button 
          type="button" 
          className="support-send-btn"
          onClick={handleSendMessage} // Sends message when the button is clicked.
        >
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
