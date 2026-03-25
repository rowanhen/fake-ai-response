import type { Message } from '../types';
import { Markdown } from '../components/Markdown';

interface Props {
  messages: Message[];
  selectedModel: string;
}

export function ClaudeCodeSkin({ messages, selectedModel }: Props) {
  const purpleAccent = '#c5a5ff';
  const purpleBorder = '#8b5cf6';
  
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
      <div className="mb-6">
        <div style={{ color: purpleAccent }}>╭───────────────────────────────────────────────╮</div>
        <div style={{ color: purpleAccent }}>│</div>
        <div style={{ color: purpleAccent }}>│  <span className="text-white font-bold">Claude Code</span> <span className="text-[#888]">v1.0.0</span></div>
        <div style={{ color: purpleAccent }}>│  <span className="text-[#888]">Model: <span className="text-[#c5a5ff]">{selectedModel}</span></span></div>
        <div style={{ color: purpleAccent }}>│</div>
        <div style={{ color: purpleAccent }}>╰───────────────────────────────────────────────╯</div>
      </div>

      {/* Messages */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === 'user' ? (
              <div className="flex items-start gap-2">
                <span style={{ color: purpleAccent }} className="font-bold">❯</span>
                <span className="text-white whitespace-pre-wrap">{message.content}</span>
              </div>
            ) : (
              <div 
                className="pl-4 ml-1 py-2"
                style={{ borderLeft: `2px solid ${purpleBorder}` }}
              >
                <Markdown content={message.content} className="text-[#e0e0e0] leading-relaxed" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Blinking cursor */}
      <div className="flex items-start gap-2 mt-4">
        <span style={{ color: purpleAccent }} className="font-bold">❯</span>
        <span className="animate-pulse text-[#888]">▋</span>
      </div>
    </div>
  );
}
