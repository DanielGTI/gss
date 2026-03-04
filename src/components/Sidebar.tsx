import React from 'react';
import { Hexagon, List, Search, Settings, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '../utils';
import { Conversation } from '../types';
import { motion } from 'framer-motion';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  conversations: Conversation[];
  onConversationSelect: (id: string) => void;
  onNewChat: () => void;
  currentConversationId?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  conversations,
  onConversationSelect,
  onNewChat,
  currentConversationId
}) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 60 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "flex flex-col h-screen bg-gray-50 text-gray-600 border-r border-gray-200 relative z-20 flex-shrink-0 cursor-pointer",
        isCollapsed ? "items-center py-4" : "p-2 cursor-default"
      )}
      onClick={() => isCollapsed && onToggle()}
    >
      {/* Toggle / Logo Area */}
      <div className="flex flex-col items-center w-full gap-6 mb-4">
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className="p-2 hover:bg-gray-200 rounded-md transition-colors text-gray-800"
          title={isCollapsed ? "Expandir menu" : "Recolher menu"}
        >
          {isCollapsed ? <Hexagon size={24} /> : <div className="flex items-center gap-2"><Hexagon size={24} /><span className="font-bold">ChatGPT</span></div>}
        </button>
        
        {/* Navigation Icons */}
        <div className="flex flex-col gap-4 w-full items-center">
            <button className="p-2 hover:bg-gray-200 rounded-md transition-colors" title="Conversas">
                <List size={20} />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-md transition-colors" title="Pesquisar">
                <Search size={20} />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-md transition-colors" title="Configurações">
                <Settings size={20} />
            </button>
        </div>
      </div>

      {/* Expanded Content (Conversations) - Only visible when expanded */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 w-full mt-4">
          <div className="px-2 pb-2 text-xs font-semibold text-gray-400 uppercase">Hoje</div>
          <div className="flex flex-col gap-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onConversationSelect(conv.id)}
                className={cn(
                  "flex items-center gap-3 rounded-md hover:bg-gray-200 transition-colors px-3 py-2 text-left text-sm text-gray-700",
                  currentConversationId === conv.id && "bg-gray-200"
                )}
              >
                <span className="truncate flex-1">{conv.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer / User Avatar */}
      <div className="mt-auto pb-4 pt-2 w-full flex justify-center border-t border-gray-200">
        <button className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-md transition-colors">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                DA
            </div>
            {!isCollapsed && (
                <div className="text-sm font-medium text-gray-700">
                    Usuário
                </div>
            )}
        </button>
      </div>
    </motion.aside>
  );
};
