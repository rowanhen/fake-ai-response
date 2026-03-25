import type { Message } from '../types';
import { Markdown } from '../components/Markdown';

interface Props {
  messages: Message[];
  selectedModel: string;
}

export function CodexCLISkin({ messages, selectedModel }: Props) {
  return (
    <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm min-h-[400px] p-4 rounded-lg overflow-auto dark-scrollbar">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#3c3c3c]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        <span className="text-[#808080] text-xs ml-2">codex — bash</span>
      </div>

      {/* Welcome message */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[#4ec9b0]">◆</span>
          <span className="font-bold text-[#569cd6]">OpenAI Codex CLI</span>
          <span className="text-[#808080]">v0.1.0</span>
        </div>
        <div className="text-[#808080] mt-1 ml-5">Type your request in natural language</div>
        <div className="text-[#808080] mt-1 ml-5 text-xs">
          Model: <span className="text-[#4ec9b0]">{selectedModel}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === 'user' ? (
              <div className="flex items-start gap-2">
                <span className="text-[#4ec9b0] font-bold">$</span>
                <span className="text-[#e0e0e0] whitespace-pre-wrap">{message.content}</span>
              </div>
            ) : (
              <div className="mt-2 ml-4">
                <div className="flex items-center gap-2 text-[#808080] text-xs mb-2">
                  <span className="text-[#569cd6]">⟳</span>
                  <span>Thinking...</span>
                </div>
                <div className="bg-[#252526] border border-[#3c3c3c] rounded-md p-3">
                  <div className="flex items-center gap-2 mb-2 text-xs text-[#808080] border-b border-[#3c3c3c] pb-2">
                    <span className="text-[#4ec9b0]">✓</span>
                    <span>Response</span>
                  </div>
                  <Markdown content={message.content} className="text-[#d4d4d4] leading-relaxed" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input prompt with blinking cursor */}
      <div className="flex items-start gap-2 mt-4">
        <span className="text-[#4ec9b0] font-bold">$</span>
        <span className="text-[#569cd6] animate-pulse">▋</span>
      </div>
    </div>
  );
}
