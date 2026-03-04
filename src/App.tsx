import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Chat } from './components/Chat';
import { useChatStore } from './store/useChatStore';

function App() {
  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    conversations, 
    currentConversation,
    selectConversation, 
    createNewConversation,
    messages,
    sendMessage,
    isTyping
  } = useChatStore();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        conversations={conversations}
        onConversationSelect={selectConversation}
        onNewChat={createNewConversation}
        currentConversationId={currentConversation?.id}
      />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header 
          externalLink="https://openai.com/blog/chatgpt"
          externalLinkText="OpenAI Blog"
          isSidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />
        
        <Chat 
          messages={messages}
          onSendMessage={sendMessage}
          isTyping={isTyping}
        />
      </main>
    </div>
  );
}

export default App;
