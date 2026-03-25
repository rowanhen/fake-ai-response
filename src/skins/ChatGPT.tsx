import type { Message } from '../types';
import { Markdown } from '../components/Markdown';

interface Props {
  messages: Message[];
  darkMode: boolean;
}

export function ChatGPTSkin({ messages, darkMode }: Props) {
  const bg = darkMode ? 'bg-[#212121]' : 'bg-white';
  const text = darkMode ? 'text-[#ececec]' : 'text-[#0d0d0d]';
  const assistantBg = darkMode ? 'bg-[#2f2f2f]' : 'bg-[#f7f7f8]';
  const border = darkMode ? 'border-[#2f2f2f]' : 'border-[#e5e5e5]';
  const scrollbar = darkMode ? 'dark-scrollbar' : 'light-scrollbar';

  return (
    <div className={`${bg} ${text} min-h-[400px] rounded-lg overflow-auto ${scrollbar}`}>
      {/* Header */}
      <div className={`sticky top-0 ${bg} border-b ${border} px-4 py-3 flex items-center justify-center`}>
        <div className="flex items-center gap-1">
          <span className="font-semibold">ChatGPT</span>
          <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Messages */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-4">
            <div className="flex-shrink-0">
              {message.role === 'user' ? (
                <div className="w-8 h-8 rounded-full bg-[#5436DA] flex items-center justify-center text-white text-sm font-medium">
                  U
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#19c37d] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4043-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`font-semibold mb-1 text-sm ${darkMode ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
                {message.role === 'user' ? 'You' : 'ChatGPT'}
              </div>
              {message.role === 'user' ? (
                <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
              ) : (
                <Markdown content={message.content} className="leading-relaxed" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className={`sticky bottom-0 ${bg} border-t ${border} p-4`}>
        <div className="max-w-3xl mx-auto">
          <div className={`${assistantBg} rounded-2xl px-4 py-3 flex items-center gap-2`}>
            <span className="text-[#8e8ea0] flex-1">Message ChatGPT</span>
            <button className={`p-1.5 rounded-lg ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
