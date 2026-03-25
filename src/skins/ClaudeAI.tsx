import type { Message } from '../types';
import { Markdown } from '../components/Markdown';
import { ChevronDown, Copy, ThumbsUp, ThumbsDown, RotateCcw, Share } from 'lucide-react';

interface Props {
  messages: Message[];
  darkMode: boolean;
  selectedModel: string;
}

// Claude's sparkle/starburst icon (small, inline version)
function ClaudeSparkle({ className, color }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={color || 'currentColor'}>
      <path d="M12 2L13.09 8.26L18.18 6.03L14.97 11.18L21.18 12.32L14.97 13.45L18.18 18.6L13.09 16.37L12 22.63L10.91 16.37L5.82 18.6L9.03 13.45L2.82 12.32L9.03 11.18L5.82 6.03L10.91 8.26L12 2Z" />
    </svg>
  );
}

// Sidebar icon
function SidebarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

export function ClaudeAISkin({ messages, darkMode, selectedModel }: Props) {
  // Colors based on real Claude.ai
  const bg = darkMode ? 'bg-[#2b2a27]' : 'bg-[#f5f4ef]';
  const text = darkMode ? 'text-[#e8e6e3]' : 'text-[#1a1915]';
  const userBubble = darkMode ? 'bg-[#403e3a]' : 'bg-[#e8e7e2]';
  const muted = darkMode ? 'text-[#8a8780]' : 'text-[#8a8780]';
  const border = darkMode ? 'border-[#3d3c38]' : 'border-[#e5e3d8]';
  const inputBg = darkMode ? 'bg-[#3d3c38]' : 'bg-white';
  const scrollbar = darkMode ? 'dark-scrollbar' : 'light-scrollbar';
  const iconColor = darkMode ? 'text-[#8a8780]' : 'text-[#8a8780]';
  const hoverBg = darkMode ? 'hover:bg-[#3d3c38]' : 'hover:bg-[#e8e7e2]';
  const claudeOrange = '#cc785c';

  return (
    <div className={`${bg} ${text} min-h-[400px] rounded-lg overflow-auto ${scrollbar} font-sans`}>
      {/* Header */}
      <div className={`sticky top-0 ${bg} border-b ${border} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <button className={`p-1.5 rounded-md ${hoverBg} transition-colors`}>
            <SidebarIcon className={`w-5 h-5 ${iconColor}`} />
          </button>
          <button className={`flex items-center gap-1 ${hoverBg} px-2 py-1 rounded-md transition-colors`}>
            <span className="font-medium text-[15px]">Greeting</span>
            <ChevronDown className={`w-4 h-4 ${iconColor}`} />
          </button>
        </div>
        <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border ${border} text-sm ${hoverBg} transition-colors`}>
          <Share className={`w-4 h-4 ${iconColor}`} />
          <span className={muted}>Share</span>
        </button>
      </div>

      {/* Messages */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {messages.map((message, index) => (
          <div key={message.id}>
            {message.role === 'user' ? (
              /* User message - right aligned bubble, no avatar, no label */
              <div className="flex justify-end">
                <div className={`${userBubble} rounded-[20px] px-4 py-3 max-w-[85%]`}>
                  <div className="whitespace-pre-wrap text-[15px] leading-relaxed">{message.content}</div>
                </div>
              </div>
            ) : (
              /* Assistant message - left aligned, no bubble, no avatar, no label */
              <div className="space-y-2">
                {/* Sparkle indicator between messages */}
                {index > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <ClaudeSparkle className="w-4 h-4" color={claudeOrange} />
                  </div>
                )}
                {/* Message content - plain text, slightly bolder */}
                <div className="text-[15px] leading-relaxed">
                  <Markdown content={message.content} className="font-[450]" />
                </div>
                {/* Action icons below assistant message */}
                <div className="flex items-center gap-1 pt-1">
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
                    <RotateCcw className={`w-4 h-4 ${iconColor}`} />
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
          <div className={`${inputBg} rounded-2xl px-4 py-3 border ${border} shadow-sm`}>
            <div className={`flex-1 text-[15px] ${muted} mb-2`}>
              Reply...
            </div>
            <div className="flex items-center justify-between">
              <button className={`p-1.5 rounded-md ${hoverBg} transition-colors`}>
                <svg className={`w-5 h-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <button className={`flex items-center gap-1 px-2 py-1 rounded-md ${hoverBg} transition-colors`}>
                  <span className={`text-sm ${muted}`}>{selectedModel}</span>
                  <ChevronDown className={`w-3.5 h-3.5 ${iconColor}`} />
                </button>
                <button className={`p-1.5 rounded-md ${hoverBg} transition-colors`}>
                  <svg className={`w-5 h-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={`text-center text-xs mt-3 ${muted}`}>
            Claude is AI and can make mistakes. Please double-check responses.
          </div>
        </div>
      </div>
    </div>
  );
}
