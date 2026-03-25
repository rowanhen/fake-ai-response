import type { Message } from '../types';
import { Markdown } from '../components/Markdown';
import { ChevronDown } from 'lucide-react';

interface Props {
  messages: Message[];
  darkMode: boolean;
  selectedModel: string;
}

// Claude's sparkle/starburst icon
function ClaudeSparkle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L13.09 8.26L18.18 6.03L14.97 11.18L21.18 12.32L14.97 13.45L18.18 18.6L13.09 16.37L12 22.63L10.91 16.37L5.82 18.6L9.03 13.45L2.82 12.32L9.03 11.18L5.82 6.03L10.91 8.26L12 2Z" />
    </svg>
  );
}

export function ClaudeAISkin({ messages, darkMode, selectedModel }: Props) {
  const bg = darkMode ? 'bg-[#2b2a27]' : 'bg-[#faf9f5]';
  const text = darkMode ? 'text-[#e8e6e3]' : 'text-[#1a1915]';
  const userBubble = darkMode ? 'bg-[#403e3a]' : 'bg-[#efede5]';
  const border = darkMode ? 'border-[#3d3c38]' : 'border-[#e5e3d8]';
  const inputBg = darkMode ? 'bg-[#3d3c38]' : 'bg-white';
  const scrollbar = darkMode ? 'dark-scrollbar' : 'light-scrollbar';
  const claudeOrange = '#da7756';

  return (
    <div className={`${bg} ${text} min-h-[400px] rounded-lg overflow-auto ${scrollbar} font-sans`}>
      {/* Header */}
      <div className={`sticky top-0 ${bg} border-b ${border} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          {/* Claude avatar with sparkle */}
          <div 
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: claudeOrange }}
          >
            <ClaudeSparkle className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-[15px]">Claude</span>
        </div>
        {/* Model selector */}
        <button className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm ${darkMode ? 'hover:bg-[#3d3c38]' : 'hover:bg-[#efede5]'} transition-colors`}>
          <span className={darkMode ? 'text-[#a09d98]' : 'text-[#6b6862]'}>{selectedModel}</span>
          <ChevronDown className={`w-4 h-4 ${darkMode ? 'text-[#6b6862]' : 'text-[#a09d98]'}`} />
        </button>
      </div>

      {/* Messages */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className={`${message.role === 'user' ? 'flex justify-end' : ''}`}>
            {message.role === 'user' ? (
              <div className={`${userBubble} rounded-2xl px-4 py-3 max-w-[85%]`}>
                <div className="whitespace-pre-wrap text-[15px] leading-relaxed">{message.content}</div>
              </div>
            ) : (
              <div className="flex gap-3">
                {/* Claude avatar */}
                <div 
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: claudeOrange }}
                >
                  <ClaudeSparkle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[15px] mb-1">Claude</div>
                  <Markdown content={message.content} className="text-[15px] leading-relaxed" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className={`sticky bottom-0 ${bg} px-4 py-4`}>
        <div className="max-w-3xl mx-auto">
          <div className={`${inputBg} rounded-2xl px-4 py-3 flex items-end gap-3 border ${border} shadow-sm`}>
            <div className={`flex-1 text-[15px] ${darkMode ? 'text-[#8a8780]' : 'text-[#a09d98]'} pb-0.5`}>
              Reply to Claude...
            </div>
            <button 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
              style={{ backgroundColor: claudeOrange }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6-6m6 6l-6 6" />
              </svg>
            </button>
          </div>
          <div className={`text-center text-xs mt-3 ${darkMode ? 'text-[#6a6860]' : 'text-[#a09d98]'}`}>
            Claude can make mistakes. Please double-check responses.
          </div>
        </div>
      </div>
    </div>
  );
}
