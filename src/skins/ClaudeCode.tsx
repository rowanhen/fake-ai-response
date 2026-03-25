import type { Message } from '../types';
import { Markdown } from '../components/Markdown';

interface Props {
  messages: Message[];
}

export function ClaudeCodeSkin({ messages }: Props) {
  return (
    <div className="bg-[#1a1a1a] text-[#e0e0e0] font-mono text-sm min-h-[400px] p-4 rounded-lg overflow-auto dark-scrollbar">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#333]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        <span className="text-[#888] text-xs ml-2">claude — ~/project</span>
      </div>

      {/* Welcome banner */}
      <div className="mb-4 text-[#888]">
        <div className="text-[#c5a5ff]">╭───────────────────────────────────────╮</div>
        <div className="text-[#c5a5ff]">│</div>
        <div className="text-[#c5a5ff]">│  <span className="text-white font-bold">Claude Code</span> <span className="text-[#888]">v1.0.0</span></div>
        <div className="text-[#c5a5ff]">│</div>
        <div className="text-[#c5a5ff]">╰───────────────────────────────────────╯</div>
      </div>

      {/* Messages */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === 'user' ? (
              <div className="flex items-start gap-2">
                <span className="text-[#c5a5ff] font-bold">❯</span>
                <span className="text-white whitespace-pre-wrap">{message.content}</span>
              </div>
            ) : (
              <div className="pl-4 border-l-2 border-[#333] ml-1">
                <Markdown content={message.content} className="text-[#e0e0e0] leading-relaxed" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Blinking cursor */}
      <div className="flex items-start gap-2 mt-4">
        <span className="text-[#c5a5ff] font-bold">❯</span>
        <span className="animate-pulse">▋</span>
      </div>
    </div>
  );
}
