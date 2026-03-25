import type { Message } from '../types';
import { Markdown } from '../components/Markdown';

interface Props {
  messages: Message[];
  selectedModel: string;
}

export function ClaudeCodeSkin({ messages, selectedModel }: Props) {
  return (
    <div className="bg-[#1a1b26] text-[#c0caf5] font-mono text-[13px] min-h-[400px] rounded-lg overflow-auto dark-scrollbar leading-[1.65]">
      {/* Messages */}
      <div className="py-4">
        {messages.map((message, index) => (
          <div key={message.id}>
            {message.role === 'user' ? (
              /* User message — highlighted bg band with ❯ */
              <div className="bg-[#292e42] px-5 py-3 flex items-start gap-3">
                <span className="text-[#6c7086] mt-0.5 flex-shrink-0">❯</span>
                <span className="text-[#e0e0e0] whitespace-pre-wrap">{message.content}</span>
              </div>
            ) : (
              /* Assistant message — ● bullet with text */
              <div className="px-5 py-2">
                {/* If first assistant message, show a tool-like action before */}
                {index === 1 && messages[0]?.role === 'user' && (
                  <div className="flex items-start gap-3 mb-3 text-[#565f89]">
                    <span className="text-[#7aa2f7] mt-0.5 flex-shrink-0">●</span>
                    <span className="text-[#c0caf5]">
                      <span className="font-bold">Read 2 files</span>
                      <span className="text-[#565f89]"> (ctrl+o to expand)</span>
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <span className="text-[#7aa2f7] mt-0.5 flex-shrink-0">●</span>
                  <div className="flex-1 min-w-0">
                    <Markdown content={message.content} className="text-[#c0caf5] leading-[1.65] [&_strong]:text-[#e0e0e0] [&_strong]:font-bold [&_code]:bg-[#414559] [&_code]:text-[#a6e3a1] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[12px]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Status bar at bottom */}
      <div className="px-5 py-3 flex items-center gap-2 border-t border-[#292e42]">
        <span className="text-[#fab387]">+</span>
        <span className="text-[#fab387]">Thinking…</span>
        <span className="text-[#565f89]">(esc to interrupt · 0m 12s · ↓ 2.1k tokens · {selectedModel})</span>
      </div>
    </div>
  );
}
