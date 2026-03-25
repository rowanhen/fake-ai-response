import type { Message } from '../types';
import { Markdown } from '../components/Markdown';

interface Props {
  messages: Message[];
  darkMode: boolean;
}

export function CopilotSkin({ messages, darkMode }: Props) {
  const bg = darkMode ? 'bg-[#1f2428]' : 'bg-[#ffffff]';
  const text = darkMode ? 'text-[#e1e4e8]' : 'text-[#24292e]';
  const secondaryText = darkMode ? 'text-[#8b949e]' : 'text-[#586069]';
  const border = darkMode ? 'border-[#30363d]' : 'border-[#e1e4e8]';
  const inputBg = darkMode ? 'bg-[#0d1117]' : 'bg-[#fafbfc]';
  const scrollbar = darkMode ? 'dark-scrollbar' : 'light-scrollbar';

  return (
    <div className={`${bg} ${text} min-h-[400px] rounded-lg overflow-auto ${scrollbar} font-sans text-sm`}>
      {/* VS Code panel header */}
      <div className={`sticky top-0 ${bg} border-b ${border} px-3 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M7.998 15.035a6.943 6.943 0 0 1-4.448-1.612c-.602-.506-.994-.904-1.208-1.222a.625.625 0 0 1 .067-.826c.254-.225.545-.32.717-.32.267 0 .44.128.607.271.122.104.268.209.42.283.301.146.64.228.995.228.473 0 .87-.11 1.142-.26.272-.15.45-.332.538-.513.088-.18.134-.397.134-.653 0-.163-.03-.298-.086-.404-.055-.106-.132-.19-.23-.252a1.05 1.05 0 0 0-.34-.147 3.28 3.28 0 0 0-.407-.075 8.65 8.65 0 0 0-.442-.043 8.088 8.088 0 0 1-.442-.046c-.31-.043-.577-.119-.81-.227a1.655 1.655 0 0 1-.575-.443 1.75 1.75 0 0 1-.33-.651 3.03 3.03 0 0 1-.105-.815c0-.477.1-.89.302-1.24.201-.35.475-.64.822-.87.347-.231.748-.401 1.202-.51a5.78 5.78 0 0 1 1.435-.168c.444 0 .868.048 1.27.142.403.095.77.235 1.1.42.331.184.618.41.863.678.244.268.436.575.575.92H9.07a1.6 1.6 0 0 0-.273-.412 1.41 1.41 0 0 0-.39-.3 1.86 1.86 0 0 0-.499-.186 2.54 2.54 0 0 0-.6-.068c-.39 0-.72.072-.994.218a1.47 1.47 0 0 0-.604.58c-.138.24-.207.506-.207.798 0 .14.02.263.058.369.039.105.102.196.19.272.087.076.2.138.338.186.138.048.308.084.51.108l.358.038c.186.02.356.045.51.078.153.032.29.075.41.128.12.053.224.119.314.197.09.079.163.173.22.283.057.11.1.238.127.383.027.146.041.312.041.499 0 .363-.057.703-.17 1.02a2.345 2.345 0 0 1-.507.826 2.37 2.37 0 0 1-.843.553 3.2 3.2 0 0 1-1.173.203zm3.995-8.01a.625.625 0 0 1-.2-.858c.326-.525.903-1.03 1.73-1.513.826-.483 1.847-.865 3.063-1.145a.625.625 0 0 1 .283 1.218c-1.105.255-1.995.599-2.69 1.006-.693.408-1.106.817-1.33 1.092a.625.625 0 0 1-.856.2z"/>
          </svg>
          <span className="font-medium">GitHub Copilot</span>
        </div>
        <div className="flex items-center gap-1">
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
                <div className={`flex-shrink-0 w-7 h-7 rounded-full ${darkMode ? 'bg-[#30363d]' : 'bg-[#e1e4e8]'} flex items-center justify-center text-xs font-medium`}>
                  U
                </div>
                <div className="flex-1 pt-1">
                  <div className={`text-xs mb-1 font-medium ${secondaryText}`}>You</div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Z"/>
                  </svg>
                </div>
                <div className="flex-1 pt-1">
                  <div className={`text-xs mb-1 font-medium ${darkMode ? 'text-[#a855f7]' : 'text-[#7c3aed]'}`}>Copilot</div>
                  <div className={`${darkMode ? 'bg-[#0d1117]' : 'bg-[#f6f8fa]'} rounded-lg p-3 border ${border}`}>
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
          <svg className="w-4 h-4 text-[#7c3aed]" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Z"/>
          </svg>
          <span className={`flex-1 ${secondaryText}`}>Ask Copilot or type / for commands</span>
          <kbd className={`px-1.5 py-0.5 ${darkMode ? 'bg-[#30363d]' : 'bg-[#e1e4e8]'} rounded text-xs`}>⌘K</kbd>
        </div>
      </div>
    </div>
  );
}
