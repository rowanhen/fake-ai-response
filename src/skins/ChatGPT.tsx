import type { Message } from '../types';
import { Markdown } from '../components/Markdown';
import { ChevronDown, Copy, ThumbsUp, ThumbsDown, RotateCcw, MoreHorizontal, Share, Pencil, Menu } from 'lucide-react';

interface Props {
  messages: Message[];
  darkMode: boolean;
  selectedModel: string;
}

export function ChatGPTSkin({ messages, darkMode, selectedModel: _selectedModel }: Props) {
  // Colors based on real ChatGPT
  const bg = darkMode ? 'bg-[#212121]' : 'bg-white';
  const text = darkMode ? 'text-[#ececec]' : 'text-[#0d0d0d]';
  const userBubble = darkMode ? 'bg-[#2f2f2f]' : 'bg-[#f7f7f8]';
  const muted = darkMode ? 'text-[#8e8ea0]' : 'text-[#8e8ea0]';
  const inputBg = darkMode ? 'bg-[#2f2f2f]' : 'bg-[#f4f4f4]';
  const scrollbar = darkMode ? 'dark-scrollbar' : 'light-scrollbar';
  const iconColor = darkMode ? 'text-[#8e8ea0]' : 'text-[#8e8ea0]';
  const hoverBg = darkMode ? 'hover:bg-[#2f2f2f]' : 'hover:bg-[#f7f7f8]';
  
  // Suppress unused variable warnings (kept for API compatibility)
  void _selectedModel;

  return (
    <div className={`${bg} ${text} min-h-[400px] rounded-lg overflow-auto ${scrollbar}`}>
      {/* Header */}
      <div className={`sticky top-0 ${bg} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <button className={`p-1.5 rounded-md ${hoverBg} transition-colors`}>
            <Menu className={`w-5 h-5 ${iconColor}`} />
          </button>
          <button className={`flex items-center gap-1 ${hoverBg} px-2 py-1 rounded-md transition-colors`}>
            <span className="font-semibold text-[17px]">ChatGPT</span>
            <ChevronDown className={`w-4 h-4 ${iconColor}`} />
          </button>
        </div>
        <button className={`p-1.5 rounded-md ${hoverBg} transition-colors`}>
          <MoreHorizontal className={`w-5 h-5 ${iconColor}`} />
        </button>
      </div>

      {/* Messages */}
      <div className="max-w-3xl mx-auto px-4 py-4 space-y-6">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === 'user' ? (
              /* User message - right aligned bubble, no avatar, no label */
              <div className="space-y-1">
                <div className="flex justify-end">
                  <div className={`${userBubble} max-w-[85%]`} style={{ borderRadius: '24px', padding: '10px 16px' }}>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{message.content}</div>
                  </div>
                </div>
                {/* Action icons below user message, right aligned */}
                <div className="flex items-center justify-end gap-1">
                  <button className={`p-1 rounded-md ${hoverBg} transition-colors`}>
                    <Copy className={`w-3.5 h-3.5 ${iconColor}`} />
                  </button>
                  <button className={`p-1 rounded-md ${hoverBg} transition-colors`}>
                    <Pencil className={`w-3.5 h-3.5 ${iconColor}`} />
                  </button>
                </div>
              </div>
            ) : (
              /* Assistant message - left aligned, no bubble, no avatar, no label */
              <div className="space-y-2">
                {/* Message content - plain text */}
                <div className="leading-relaxed">
                  <Markdown content={message.content} />
                </div>
                {/* Action icons below assistant message */}
                <div className="flex items-center gap-1">
                  <button className={`p-1.5 rounded-md ${hoverBg} transition-colors`}>
                    <Copy className={`w-4 h-4 ${iconColor}`} />
                  </button>
                  <button className={`p-1.5 rounded-md ${hoverBg} transition-colors`}>
                    <ThumbsUp className={`w-4 h-4 ${iconColor}`} />
                  </button>
                  <button className={`p-1.5 rounded-md ${hoverBg} transition-colors`}>
                    <ThumbsDown className={`w-4 h-4 ${iconColor}`} />
                  </button>
                  <button className={`p-1.5 rounded-md ${hoverBg} transition-colors`}>
                    <Share className={`w-4 h-4 ${iconColor}`} />
                  </button>
                  <button className={`p-1.5 rounded-md ${hoverBg} transition-colors`}>
                    <RotateCcw className={`w-4 h-4 ${iconColor}`} />
                  </button>
                  <button className={`p-1.5 rounded-md ${hoverBg} transition-colors`}>
                    <MoreHorizontal className={`w-4 h-4 ${iconColor}`} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className={`sticky bottom-0 ${bg} px-4 py-4`}>
        <div className="max-w-3xl mx-auto">
          <div className={`${inputBg} rounded-3xl px-4 py-3 flex items-center gap-3`}>
            <button className={`p-1 rounded-full ${hoverBg} transition-colors`}>
              <svg className={`w-5 h-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <span className={`flex-1 ${muted}`}>Ask anything</span>
            <div className="flex items-center gap-2">
              <button className={`p-1.5 rounded-full ${hoverBg} transition-colors`}>
                <svg className={`w-5 h-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button className={`p-1.5 rounded-full ${hoverBg} transition-colors`}>
                <svg className={`w-5 h-5 ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M2 10V7a5 5 0 015-5h10a5 5 0 015 5v3" strokeLinecap="round"/>
                  <path d="M4 15h2a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 012-2z"/>
                  <path d="M18 15h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2a2 2 0 012-2z"/>
                  <path d="M11 15h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2a2 2 0 012-2z"/>
                </svg>
              </button>
            </div>
          </div>
          <div className={`text-center text-xs mt-2 ${muted}`}>
            ChatGPT can make mistakes. Check important info.
          </div>
        </div>
      </div>
    </div>
  );
}
