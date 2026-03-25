import type { Message, SkinId } from '../types';
import { ClaudeCodeSkin } from './ClaudeCode';
import { ChatGPTSkin } from './ChatGPT';
import { ClaudeAISkin } from './ClaudeAI';
import { CursorSkin } from './Cursor';
import { CodexCLISkin } from './CodexCLI';
import { CopilotSkin } from './Copilot';

interface SkinRendererProps {
  skinId: SkinId;
  messages: Message[];
  darkMode: boolean;
}

export function SkinRenderer({ skinId, messages, darkMode }: SkinRendererProps) {
  switch (skinId) {
    case 'claude-code':
      return <ClaudeCodeSkin messages={messages} />;
    case 'chatgpt':
      return <ChatGPTSkin messages={messages} darkMode={darkMode} />;
    case 'claude-ai':
      return <ClaudeAISkin messages={messages} darkMode={darkMode} />;
    case 'cursor':
      return <CursorSkin messages={messages} />;
    case 'codex-cli':
      return <CodexCLISkin messages={messages} />;
    case 'copilot':
      return <CopilotSkin messages={messages} darkMode={darkMode} />;
    default:
      return <div>Unknown skin</div>;
  }
}
