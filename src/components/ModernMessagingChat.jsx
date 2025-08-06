// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import './ModernMessagingChat.css';

// const ModernMessagingChat = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chatMessages]);

//   // This function is called when you type in the input field.
//   const handleInputChange = (event) => {
//     setInputValue(event.target.value); // Saves what you type into 'inputValue'.
//   };

//   // This function is called when the send button is pressed or Enter key is hit.
//   const handleSendMessage = () => {
//     if (inputValue.trim() === '') return; // Does not send if the message is empty.

//     // Creates a new message object.
//     const newMessage = {
//       id: chatMessages.length + 1, // New unique ID
//       text: inputValue, // The message you typed
//       sender: "me", // Sender is 'me'
//       time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), // Current time
//       avatar: "😊" // Your avatar
//     };

//     // Updates 'chatMessages' by adding the new message to the existing ones.
//     setChatMessages((prevMessages) => [...prevMessages, newMessage]);
//     setInputValue(''); // Clears the typing box after sending the message.
//   };

//   // This function is used to send a message when the Enter key is pressed.
//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSendOrUpdate();
//     }
//   };

//   return (
//     <div className="modern-chat" style={{ position: 'relative', minHeight: '100vh' }}>
//       <div className="chat-header">
//         <div className="contact-info">
//           <div className="avatar">👨‍💼</div>
//           <div className="contact-details">
//             <h3>John Doe</h3>
//             <span className="status">Online</span>
//           </div>
//         </div>
//         <div className="header-actions">
//           <button className="action-btn">📞</button>
//           <button className="action-btn">📹</button>
//           <button className="action-btn">ℹ️</button>
//         </div>
//       </div>

//       <div className="messages-container">
//         {chatMessages.map((message) => (
//           <div key={message.id} className={`message ${message.sender}`}>
//             <div className="message-avatar">{message.avatar}</div>
//             <div className="message-content">
//               <div className="message-bubble">
//                 <p>{message.text}</p>
//                 <button onClick={() => handleEdit(message.id, message.text)}>✏️</button>
//                 <button onClick={() => handleDelete(message.id)}>🗑️</button>
//               </div>
//               <span className="message-time">{message.time}</span>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="message-input">
//         <button type="button" className="attachment-btn">📎</button>
//         <input
//           type="text"
//           value={inputValue}
//           placeholder="Type a message..."
//           className="message-field"
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//         <button type="button" className="emoji-btn">😊</button>
//         <button type="button" className="send-btn" onClick={handleSendOrUpdate}>
//           <span>{editId ? '✅' : '➤'}</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ModernMessagingChat;

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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // ✅ Inject Botpress WebChat only once - floating
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v3.2/inject.js';
    script.async = true;

    script.onload = () => {
      if (window.botpress) {
        window.botpress.init({
          botId: '66125ee0-e3a5-4032-b5d5-c37c45d8d63b', // ✅ Your botId
          clientId: '559e2d54-95cd-4cea-8edc-40c9a7728387', // ✅ Your clientId
          // ❌ No selector needed - floating button mode
          configuration: {
            version: 'v1',
            botName: 'My Bot',
            color: '#3276EA',
            themeMode: 'light',
            headerVariant: 'glass',
            fontFamily: 'inter',
            radius: 4,
            feedbackEnabled: true,
            footer: '[⚡ by Botpress](https://botpress.com/?from=webchat)',
            enableReset: true
          }
        });

        window.botpress.on('webchat:ready', () => {
          window.botpress.open(); // ✅ Auto open
        });
      }
    };

    document.body.appendChild(script);
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setChatMessages(
        res.data.map((msg) => ({
          id: msg.id,
          text: msg.name,
          time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          }),
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
          time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          }),
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
    <div className="modern-chat" style={{ position: 'relative', minHeight: '100vh' }}>
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

      {/* ❌ Removed Botpress container - floating button only */}

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
