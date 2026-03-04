import { create } from 'zustand';
import { AppState, Conversation, Message } from '../types';

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Nova Conversa',
    lastMessage: 'Olá, como posso ajudar?',
    timestamp: new Date(),
    messageCount: 2
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Olá!',
    sender: 'user',
    timestamp: new Date()
  },
  {
    id: '2',
    content: 'Olá! Como posso ajudar você hoje?',
    sender: 'ai',
    timestamp: new Date()
  }
];

export const useChatStore = create<AppState>((set, get) => ({
  sidebarCollapsed: true, // Start collapsed as per requirements
  currentConversation: mockConversations[0],
  conversations: mockConversations,
  messages: [], // Start empty to show the landing page
  isTyping: false,

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  selectConversation: (id) => {
    const conversation = get().conversations.find(c => c.id === id);
    if (conversation) {
      // In a real app, we would fetch messages for this conversation
      set({ currentConversation: conversation, messages: [] }); // Reset to empty for demo purposes or keep history if needed
    }
  },

  createNewConversation: () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: 'Nova Conversa',
      lastMessage: '',
      timestamp: new Date(),
      messageCount: 0
    };
    set((state) => ({
      conversations: [newConv, ...state.conversations],
      currentConversation: newConv,
      messages: []
    }));
  },

  sendMessage: async (content) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isTyping: true
    }));

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Esta é uma resposta simulada para: "${content}"`,
        sender: 'ai',
        timestamp: new Date()
      };

      set((state) => ({
        messages: [...state.messages, aiMessage],
        isTyping: false
      }));
    }, 1500);
  }
}));
