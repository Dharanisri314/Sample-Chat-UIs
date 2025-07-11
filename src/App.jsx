import { useState } from 'react';
import ModernMessagingChat from './components/ModernMessagingChat';
import CustomerSupportChat from './components/CustomerSupportChat';
import TeamCollaborationChat from './components/TeamCollaborationChat';
import './App.css';

function App() {
  const [activeChat, setActiveChat] = useState(0);

  const chatTypes = [
    { name: 'Modern Messaging', component: ModernMessagingChat },
    { name: 'Customer Support', component: CustomerSupportChat },
    { name: 'Team Collaboration', component: TeamCollaborationChat }
  ];

  const ActiveComponent = chatTypes[activeChat].component;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Chat UI Samples</h1>
        <div className="chat-selector">
          {chatTypes.map((chat, index) => (
            <button
              key={index}
              className={`selector-btn ${activeChat === index ? 'active' : ''}`}
              onClick={() => setActiveChat(index)}
            >
              {chat.name}
            </button>
          ))}
        </div>
      </header>
      
      <main className="app-main">
        <ActiveComponent />
      </main>
    </div>
  );
}

export default App;