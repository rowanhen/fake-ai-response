import type { Message, SkinId } from '../types';
import { ChatGPTSkin } from './ChatGPT';
import { ClaudeAISkin } from './ClaudeAI';

interface SkinRendererProps {
  skinId: SkinId;
  messages: Message[];
  darkMode: boolean;
  selectedModel: string;
}

export function SkinRenderer({ skinId, messages, darkMode, selectedModel }: SkinRendererProps) {
  switch (skinId) {
    case 'chatgpt':
      return <ChatGPTSkin messages={messages} darkMode={darkMode} selectedModel={selectedModel} />;
    case 'claude-ai':
      return <ClaudeAISkin messages={messages} darkMode={darkMode} selectedModel={selectedModel} />;
    default:
      return <div>Unknown skin</div>;
  }
}
