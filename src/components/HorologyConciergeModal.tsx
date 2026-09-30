import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Zap, Brain, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ChatMessage } from '../types';

export const HorologyConciergeModal: React.FC = () => {
  const { isConciergeOpen, closeConcierge } = useCart();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Greetings. I am the Master Horologist and Client Concierge at AUREN Atelier Horloger. How may I assist you today? Whether you seek technical insights into our Calibre AR-08 tourbillon, guidance on wrist ergonomics, or bespoke recommendations, I am at your service.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [taskComplexity, setTaskComplexity] = useState<'general' | 'complex' | 'fast'>('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isConciergeOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isConciergeOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isConciergeOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
          taskComplexity,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to reach concierge');
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Thank you for your inquiry. Our master watchmaker has noted your request.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Concierge Chat Error:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'Our ateliers in Geneva are currently experiencing high volume. In high-horology traditions, precision takes precedence. For our flagship Nocturne, it utilizes the manual-wind Calibre AR-08 skeleton with 68 hours of reserve, while the Meridian Chronometre is COSC-certified. Please inquire again in a moment or visit our collection overview.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const SUGGESTED_QUERIES = [
    'Explain the Calibre AR-08 skeleton tourbillon architecture',
    'Which AUREN timepiece is ideal for black-tie galas?',
    'What are the advantages of 904L steel over standard steel?',
    'How should I care for a mechanical manual-wind watch?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeConcierge}
        aria-hidden="true"
      />

      {/* Main Dialog */}
      <div className="relative bg-[#0A0A0A] border border-[#222222] rounded-sm max-w-2xl w-full h-[85vh] shadow-2xl shadow-black z-10 text-[#F4F0E8] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1A1A1A] bg-[#0E0E0E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#171717] border border-[#C7A86B]/40 flex items-center justify-center text-[#C7A86B]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-base tracking-wider uppercase text-[#F4F0E8]">
                  AUREN Horological Concierge
                </h2>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-[11px] text-[#6F6D68] font-mono">
                Geneva Master Horologist & Curatorial Advisory
              </span>
            </div>
          </div>

          <button
            onClick={closeConcierge}
            className="p-1.5 text-[#9C9A94] hover:text-[#F4F0E8] transition-colors rounded-sm"
            aria-label="Close concierge dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Complexity Selector Strip */}
        <div className="px-5 py-2.5 bg-[#0C0C0C] border-b border-[#181818] flex items-center justify-between text-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#6F6D68] hidden sm:inline">
            Horological Intelligence Mode:
          </span>
          <div className="flex items-center gap-1 w-full sm:w-auto justify-end">
            <button
              onClick={() => setTaskComplexity('fast')}
              className={`px-2.5 py-1 rounded-sm text-[11px] tracking-wider uppercase flex items-center gap-1 transition-colors ${
                taskComplexity === 'fast'
                  ? 'bg-[#C7A86B] text-[#080808] font-medium'
                  : 'bg-[#141414] text-[#9C9A94] hover:text-[#F4F0E8]'
              }`}
              title="Powered by gemini-3.1-flash-lite for rapid answers"
            >
              <Zap className="w-3 h-3" />
              Fast
            </button>
            <button
              onClick={() => setTaskComplexity('general')}
              className={`px-2.5 py-1 rounded-sm text-[11px] tracking-wider uppercase flex items-center gap-1 transition-colors ${
                taskComplexity === 'general'
                  ? 'bg-[#C7A86B] text-[#080808] font-medium'
                  : 'bg-[#141414] text-[#9C9A94] hover:text-[#F4F0E8]'
              }`}
              title="Powered by gemini-3.5-flash for balanced conversation"
            >
              <Bot className="w-3 h-3" />
              General
            </button>
            <button
              onClick={() => setTaskComplexity('complex')}
              className={`px-2.5 py-1 rounded-sm text-[11px] tracking-wider uppercase flex items-center gap-1 transition-colors ${
                taskComplexity === 'complex'
                  ? 'bg-[#C7A86B] text-[#080808] font-medium'
                  : 'bg-[#141414] text-[#9C9A94] hover:text-[#F4F0E8]'
              }`}
              title="Powered by gemini-3.1-pro-preview for deep horological reasoning"
            >
              <Brain className="w-3 h-3" />
              Deep Analysis
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map(msg => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-sm bg-[#161616] border border-[#2A2A2A] flex items-center justify-center text-[#C7A86B] shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-sm p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#1A1A1A] border border-[#2E2E2E] text-[#F4F0E8]'
                      : 'bg-[#0E0E0E] border border-[#1C1C1C] text-[#D8D5CE]'
                  }`}
                >
                  <p className="whitespace-pre-wrap font-light">{msg.content}</p>
                  <span className="text-[10px] text-[#555555] font-mono mt-2 block text-right">
                    {msg.timestamp}
                  </span>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-sm bg-[#C7A86B]/20 border border-[#C7A86B]/40 flex items-center justify-center text-[#C7A86B] shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-xs text-[#9C9A94]">
              <div className="w-7 h-7 rounded-sm bg-[#161616] border border-[#2A2A2A] flex items-center justify-center text-[#C7A86B]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              </div>
              <span className="font-mono text-[11px] text-[#C7A86B]">
                Master Horologist is reviewing your inquiry...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Queries Bar */}
        {messages.length <= 2 && (
          <div className="p-3 bg-[#0C0C0C] border-t border-[#181818] overflow-x-auto scrollbar-none flex gap-2">
            {SUGGESTED_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 bg-[#141414] hover:bg-[#1A1A1A] border border-[#222222] text-[11px] text-[#9C9A94] hover:text-[#C7A86B] rounded-sm whitespace-nowrap transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 bg-[#0E0E0E] border-t border-[#1A1A1A]">
          <div className="flex items-center gap-2 bg-[#121212] border border-[#262626] focus-within:border-[#C7A86B] rounded-sm px-3.5 py-2 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Inquire regarding calibres, case dimensions, or bespoke curation..."
              className="flex-1 bg-transparent text-xs sm:text-sm text-[#F4F0E8] placeholder-[#555555] focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              className="p-1.5 text-[#080808] bg-[#C7A86B] hover:bg-[#D8BC82] disabled:opacity-30 disabled:hover:bg-[#C7A86B] rounded-sm transition-all"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#555555] mt-2 font-mono">
            <span>Powered by Gemini Horological Architecture</span>
            <span>AUREN Atelier Protocol</span>
          </div>
        </div>
      </div>
    </div>
  );
};
