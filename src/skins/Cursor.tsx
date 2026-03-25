import type { Message } from '../types';
import { Markdown } from '../components/Markdown';

interface Props {
  messages: Message[];
}

export function CursorSkin({ messages }: Props) {
  return (
    <div className="bg-[#1e1e1e] text-[#cccccc] min-h-[400px] rounded-lg overflow-auto dark-scrollbar font-sans text-sm">
      {/* VS Code style header */}
      <div className="sticky top-0 bg-[#252526] border-b border-[#3c3c3c] px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#007acc]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span className="text-[#cccccc] font-medium">Cursor</span>
          <span className="text-[#858585] text-xs">Chat</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-[#3c3c3c] rounded">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button className="p-1 hover:bg-[#3c3c3c] rounded">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Model selector */}
      <div className="bg-[#252526] border-b border-[#3c3c3c] px-3 py-1.5 flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-[#37373d] rounded text-xs">
          <div className="w-2 h-2 rounded-full bg-[#4ec9b0]"></div>
          <span>claude-3.5-sonnet</span>
          <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Messages */}
      <div className="px-3 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === 'user' ? (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-[#4a9eff] flex items-center justify-center text-white text-xs font-medium">
                  U
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="text-[#4a9eff] text-xs mb-1 font-medium">You</div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ) : (
              <div className="flex gap-3 bg-[#2d2d30] -mx-3 px-3 py-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-gradient-to-br from-[#4ec9b0] to-[#45b8a5] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="text-[#4ec9b0] text-xs mb-1 font-medium">Cursor</div>
                  <Markdown content={message.content} className="leading-relaxed" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="sticky bottom-0 bg-[#252526] border-t border-[#3c3c3c] p-3">
        <div className="bg-[#3c3c3c] rounded-lg px-3 py-2 flex items-center gap-2">
          <span className="text-[#858585] flex-1">Ask Cursor...</span>
          <div className="flex items-center gap-1 text-xs text-[#858585]">
            <kbd className="px-1.5 py-0.5 bg-[#2d2d30] rounded text-[10px]">⌘</kbd>
            <kbd className="px-1.5 py-0.5 bg-[#2d2d30] rounded text-[10px]">Enter</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
