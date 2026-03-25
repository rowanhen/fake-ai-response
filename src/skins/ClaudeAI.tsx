import type { Message } from '../types';

interface Props {
  messages: Message[];
  darkMode: boolean;
}

export function ClaudeAISkin({ messages, darkMode }: Props) {
  const bg = darkMode ? 'bg-[#2b2a27]' : 'bg-[#f5f4ef]';
  const text = darkMode ? 'text-[#e8e6e3]' : 'text-[#1a1915]';
  const userBubble = darkMode ? 'bg-[#403e3a]' : 'bg-[#e8e7e2]';
  const assistantBg = darkMode ? 'bg-transparent' : 'bg-transparent';
  const border = darkMode ? 'border-[#3d3c38]' : 'border-[#e0dfd8]';
  const scrollbar = darkMode ? 'dark-scrollbar' : 'light-scrollbar';

  return (
    <div className={`${bg} ${text} min-h-[400px] rounded-lg overflow-auto ${scrollbar} font-sans`}>
      {/* Header */}
      <div className={`sticky top-0 ${bg} border-b ${border} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          {/* Claude logo */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#cc785c] to-[#d4a27a] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span className="font-medium">Claude</span>
        </div>
        <div className="flex items-center gap-2 text-sm opacity-60">
          <span>3.5 Sonnet</span>
        </div>
      </div>

      {/* Messages */}
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className={`${message.role === 'user' ? 'flex justify-end' : ''}`}>
            {message.role === 'user' ? (
              <div className={`${userBubble} rounded-2xl px-4 py-3 max-w-[85%]`}>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            ) : (
              <div className={`${assistantBg} flex gap-4`}>
                {/* Claude avatar */}
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#cc785c] to-[#d4a27a] flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div className="flex-1 whitespace-pre-wrap leading-relaxed pt-1">
                  {message.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className={`sticky bottom-0 ${bg} px-6 py-4`}>
        <div className="max-w-3xl mx-auto">
          <div className={`${darkMode ? 'bg-[#3d3c38]' : 'bg-white'} rounded-2xl px-4 py-3 flex items-end gap-3 border ${border} shadow-sm`}>
            <div className={`flex-1 ${darkMode ? 'text-[#8a8780]' : 'text-[#8a8780]'} pb-0.5`}>Reply to Claude...</div>
            <button className="p-2 rounded-full bg-[#cc785c] text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className={`text-center text-xs mt-2 ${darkMode ? 'text-[#6a6860]' : 'text-[#8a8780]'}`}>
            Claude can make mistakes. Please double-check responses.
          </div>
        </div>
      </div>
    </div>
  );
}
