import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Box, Plus, Mic } from 'lucide-react';
import { cn } from '../utils';
import { Message } from '../types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

export const Chat: React.FC<ChatProps> = ({ messages, onSendMessage, isTyping }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const speechSessionRef = useRef(0);
  const resultCommittedRef = useRef(false);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const hasSpeechRecognition =
    typeof window !== 'undefined' &&
    ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  useEffect(() => {
    if (!hasSpeechRecognition) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'pt-BR';
    rec.onresult = (e: any) => {
      if (resultCommittedRef.current) return;
      const text = Array.from(e.results)
        .map((r: any) => r[0]?.transcript || '')
        .join(' ')
        .trim();
      resultCommittedRef.current = true;
      setInput(text);
      try { rec.stop(); } catch {}
    };
    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
  }, [hasSpeechRecognition]);

  const toggleListening = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (isListening) {
      rec.stop();
    } else {
      try {
        // reinicia controle por sessão e garante propriedades por segurança
        speechSessionRef.current += 1;
        resultCommittedRef.current = false;
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'pt-BR';
        rec.start();
      } catch {
        // start might throw if already started; ignore
      }
    }
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const names = Array.from(files).map(f => f.name).join(', ');
    setInput((prev) => `${prev}${prev ? ' ' : ''}[arquivos: ${names}]`);
    e.currentTarget.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      onSendMessage(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const suggestionCards = [
    { text: "Gerar 10 questões", subtext: "ENADE sobre sustentabilidade..." },
    { text: "Transformar", subtext: "este PDF em um simulado ENADE ..." },
    { text: "Criar 5 questões", subtext: "discursivas curtas para Pedagogia -..." },
    { text: "Dashboard", subtext: "Conheça os novos indicadores", route: "/dashboard" as const },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-white relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 pb-40">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-800 px-4">
            <div className="w-16 h-16 bg-white rounded-none border border-gray-200 flex items-center justify-center mb-4 shadow-sm overflow-hidden">
              {/* Hero image with fallback */}
              <img
                src="/bau_saber.png"
                alt="Baú do Saber"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
              <Box size={24} className="text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Baú do Saber</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Box size={14} />
                <span>Grupo GSS</span>
            </div>
            <p className="text-gray-500 max-w-md text-center mb-12">
                Assistente inteligente do gestor  GSS
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl w-full">
                {suggestionCards.map((card, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                          // Se tiver rota, navega; senão, preenche o input como antes
                          // @ts-expect-error route opcional
                          if (card.route) navigate(card.route);
                          else setInput(card.text + " " + card.subtext);
                        }}
                        className={cn(
                          "p-4 border rounded-xl transition-colors text-left shadow-sm group",
                          card.text === "Dashboard"
                            ? "bg-emerald-50/50 border-emerald-200 hover:bg-emerald-100/60 active:bg-emerald-100 blink-green"
                            : "bg-white border-gray-200 hover:bg-gray-50"
                        )}
                    >
                        <p className="font-medium text-gray-800 group-hover:text-black">{card.text}</p>
                        <p className="text-gray-500 text-sm truncate">{card.subtext}</p>
                    </button>
                ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full py-8">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "w-full text-gray-800",
                  msg.sender === 'ai' ? "bg-white" : "bg-white"
                )}
              >
                <div className="max-w-3xl mx-auto flex gap-4 p-4 md:p-6 text-base">
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border",
                    msg.sender === 'ai' ? "bg-white border-gray-200" : "bg-orange-500 border-transparent text-white"
                  )}>
                    {msg.sender === 'ai' ? <Box size={18} className="text-gray-600" /> : <span className="text-xs font-bold">DA</span>}
                  </div>
                  <div className="relative flex-1 overflow-hidden break-words whitespace-pre-wrap leading-relaxed">
                    <span className="font-semibold block mb-1">{msg.sender === 'ai' ? 'Professor 10' : 'Você'}</span>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
               <div className="w-full bg-white">
                <div className="max-w-3xl mx-auto flex gap-4 p-4 md:p-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                    <Box size={18} className="text-gray-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1 delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 w-full bg-white pt-2 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative flex flex-col w-full p-3 bg-[#f4f4f4] rounded-[26px] shadow-sm focus-within:ring-1 focus-within:ring-gray-300 focus-within:bg-white transition-colors">
            
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte alguma coisa"
              className="w-full max-h-[200px] py-2 px-2 bg-transparent border-0 outline-none text-gray-800 placeholder-gray-500 resize-none scrollbar-thin scrollbar-thumb-gray-300 min-h-[44px]"
              rows={1}
            />

            <div className="flex items-center justify-between mt-2 px-1">
                <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-1.5 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                    >
                        <Plus size={16} />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFiles}
                    />
                </div>
                <div className="flex items-center gap-2">
                     <button
                       type="button"
                       onClick={toggleListening}
                       disabled={!hasSpeechRecognition}
                       className={cn(
                         "p-2 rounded-full transition-colors",
                         hasSpeechRecognition
                           ? isListening
                             ? "text-red-600 bg-gray-100"
                             : "text-gray-500 hover:text-gray-700"
                           : "text-gray-300 cursor-not-allowed"
                       )}
                       title={hasSpeechRecognition ? (isListening ? "Parar transcrição" : "Falar para transcrever") : "Navegador sem suporte a reconhecimento de voz"}
                     >
                        <Mic size={20} />
                     </button>
                     {input.trim() && (
                        <button
                            type="submit"
                            disabled={isTyping}
                            className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                        >
                            <Send size={16} />
                        </button>
                     )}
                </div>
            </div>
          </form>
          <div className="text-center text-xs text-gray-400 mt-2">
            O Professor 10 pode cometer erros. Considere verificar informações importantes.
          </div>
        </div>
      </div>
    </div>
  );
};
