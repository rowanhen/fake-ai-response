import type { Message } from '../types';

interface Props {
  messages: Message[];
}

export function CodexCLISkin({ messages }: Props) {
  return (
    <div className="bg-[#0d1117] text-[#c9d1d9] font-mono text-sm min-h-[400px] p-4 rounded-lg overflow-auto dark-scrollbar">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#30363d]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        <span className="text-[#8b949e] text-xs ml-2">codex — bash</span>
      </div>

      {/* Welcome message */}
      <div className="mb-4 text-[#58a6ff]">
        <div className="flex items-center gap-2">
          <span className="text-[#3fb950]">◆</span>
          <span className="font-bold">OpenAI Codex CLI</span>
          <span className="text-[#8b949e]">v0.1.0</span>
        </div>
        <div className="text-[#8b949e] mt-1 ml-5">Type your request in natural language</div>
      </div>

      {/* Messages */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === 'user' ? (
              <div className="flex items-start gap-2">
                <span className="text-[#3fb950] font-bold">$</span>
                <span className="text-[#f0f6fc] whitespace-pre-wrap">{message.content}</span>
              </div>
            ) : (
              <div className="mt-2 ml-4">
                {/* Thinking indicator */}
                <div className="flex items-center gap-2 text-[#8b949e] text-xs mb-2">
                  <span className="text-[#58a6ff]">⟳</span>
                  <span>Thinking...</span>
                </div>
                {/* Response */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-md p-3">
                  <div className="flex items-center gap-2 mb-2 text-xs text-[#8b949e] border-b border-[#30363d] pb-2">
                    <span className="text-[#3fb950]">✓</span>
                    <span>Response</span>
                  </div>
                  <div className="text-[#c9d1d9] whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input prompt */}
      <div className="flex items-start gap-2 mt-4">
        <span className="text-[#3fb950] font-bold">$</span>
        <span className="animate-pulse text-[#58a6ff]">▋</span>
      </div>
    </div>
  );
}
