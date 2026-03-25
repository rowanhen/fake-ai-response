import type { Message, SkinId, UserAvatar } from '../types';
import { ClaudeCodeSkin } from './ClaudeCode';
import { ChatGPTSkin } from './ChatGPT';
import { ClaudeAISkin } from './ClaudeAI';
import { CodexCLISkin } from './CodexCLI';

interface SkinRendererProps {
  skinId: SkinId;
  messages: Message[];
  darkMode: boolean;
  selectedModel: string;
  userAvatar: UserAvatar;
}

export function SkinRenderer({ skinId, messages, darkMode, selectedModel, userAvatar }: SkinRendererProps) {
  switch (skinId) {
    case 'claude-code':
      return <ClaudeCodeSkin messages={messages} selectedModel={selectedModel} />;
    case 'chatgpt':
      return <ChatGPTSkin messages={messages} darkMode={darkMode} selectedModel={selectedModel} userAvatar={userAvatar} />;
    case 'claude-ai':
      return <ClaudeAISkin messages={messages} darkMode={darkMode} selectedModel={selectedModel} />;
    case 'codex-cli':
      return <CodexCLISkin messages={messages} selectedModel={selectedModel} />;
    default:
      return <div>Unknown skin</div>;
  }
}
