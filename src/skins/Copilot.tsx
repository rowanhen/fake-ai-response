import type { Message, UserAvatar } from '../types';
import { Markdown } from '../components/Markdown';

interface Props {
  messages: Message[];
  darkMode: boolean;
  selectedModel: string;
  userAvatar: UserAvatar;
}

// GitHub Copilot visor/pilot icon
function CopilotIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM5.78 8.75a9.64 9.64 0 0 0 1.363 4.177c.255.426.542.832.857 1.215.245-.296.551-.705.857-1.215A9.64 9.64 0 0 0 10.22 8.75H5.78Zm4.44-1.5a9.64 9.64 0 0 0-1.363-4.177c-.307-.51-.612-.919-.857-1.215a9.927 9.927 0 0 0-.857 1.215A9.64 9.64 0 0 0 5.78 7.25h4.44ZM5 7.25a11.15 11.15 0 0 1 1.158-4.616c.222-.497.472-.942.738-1.338A6.5 6.5 0 0 0 1.5 8 6.47 6.47 0 0 0 5 7.25Zm-1.5 3A6.47 6.47 0 0 0 1.5 8a6.5 6.5 0 0 0 5.396-2.846c.266.396.516.841.738 1.338A11.15 11.15 0 0 1 5 10.25H3.5Zm8-3c.326 0 .647.02.963.058A11.15 11.15 0 0 1 11 8.75H12.5A6.47 6.47 0 0 0 14.5 8a6.5 6.5 0 0 0-5.396-6.846c.266.396.516.841.738 1.338A11.15 11.15 0 0 1 11 7.25h.5Zm.5 3H12.5a6.47 6.47 0 0 0 2-1.25 6.5 6.5 0 0 0-5.396 2.846c-.266-.396-.516-.841-.738-1.338A11.15 11.15 0 0 1 11 10.25H12Z" />
      <path d="M6.5 12.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
    </svg>
  );
}

export function CopilotSkin({ messages, darkMode, selectedModel, userAvatar }: Props) {
  const bg = darkMode ? 'bg-[#1f2428]' : 'bg-[#ffffff]';
  const text = darkMode ? 'text-[#e1e4e8]' : 'text-[#24292e]';
  const secondaryText = darkMode ? 'text-[#8b949e]' : 'text-[#586069]';
  const border = darkMode ? 'border-[#30363d]' : 'border-[#e1e4e8]';
  const inputBg = darkMode ? 'bg-[#0d1117]' : 'bg-[#fafbfc]';
  const responseBg = darkMode ? 'bg-[#0d1117]' : 'bg-[#f6f8fa]';
  const scrollbar = darkMode ? 'dark-scrollbar' : 'light-scrollbar';
  const copilotPurple = '#7c3aed';

  return (
    <div className={`${bg} ${text} min-h-[400px] rounded-lg overflow-auto ${scrollbar} font-sans text-sm`}>
      {/* VS Code panel header */}
      <div className={`sticky top-0 ${bg} border-b ${border} px-3 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center">
            <CopilotIcon className="w-3 h-3 text-white" />
          </div>
          <span className="font-medium">GitHub Copilot</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`text-xs ${secondaryText}`}>{selectedModel}</span>
          <button className={`p-1 hover:${darkMode ? 'bg-[#30363d]' : 'bg-[#e1e4e8]'} rounded`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === 'user' ? (
              <div className="flex gap-3">
                <div 
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium text-white"
                  style={{ backgroundColor: userAvatar.color }}
                >
                  {userAvatar.initials}
                </div>
                <div className="flex-1 pt-1">
                  <div className={`text-xs mb-1 font-medium ${secondaryText}`}>{userAvatar.name}</div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center">
                  <CopilotIcon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-xs mb-1 font-medium" style={{ color: copilotPurple }}>Copilot</div>
                  <div className={`${responseBg} rounded-lg p-3 border ${border}`}>
                    <Markdown content={message.content} className="leading-relaxed" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className={`sticky bottom-0 ${bg} border-t ${border} p-3`}>
        <div className={`${inputBg} rounded-lg border ${border} px-3 py-2 flex items-center gap-2`}>
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center flex-shrink-0">
            <CopilotIcon className="w-2.5 h-2.5 text-white" />
          </div>
          <span className={`flex-1 ${secondaryText}`}>Ask Copilot or type / for commands</span>
          <kbd className={`px-1.5 py-0.5 ${darkMode ? 'bg-[#30363d]' : 'bg-[#e1e4e8]'} rounded text-xs`}>⌘K</kbd>
        </div>
      </div>
    </div>
  );
}
