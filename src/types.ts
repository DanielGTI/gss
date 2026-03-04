export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

export interface AppState {
  sidebarCollapsed: boolean;
  currentConversation: Conversation | null;
  conversations: Conversation[];
  messages: Message[];
  isTyping: boolean;
  toggleSidebar: () => void;
  selectConversation: (id: string) => void;
  sendMessage: (content: string) => void;
  createNewConversation: () => void;
}
