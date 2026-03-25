export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
}

export type SkinId = 'claude-code' | 'chatgpt' | 'claude-ai' | 'cursor' | 'codex-cli' | 'copilot';

export interface Skin {
  id: SkinId;
  name: string;
  description: string;
  supportsDarkMode: boolean;
}

export const SKINS: Skin[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    description: 'Terminal TUI with ❯ prompt',
    supportsDarkMode: false, // Always dark
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI web interface',
    supportsDarkMode: true,
  },
  {
    id: 'claude-ai',
    name: 'Claude.ai',
    description: 'Anthropic web interface',
    supportsDarkMode: true,
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'IDE chat panel',
    supportsDarkMode: false, // Always dark
  },
  {
    id: 'codex-cli',
    name: 'Codex CLI',
    description: 'OpenAI terminal interface',
    supportsDarkMode: false, // Always dark
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    description: 'VS Code chat panel',
    supportsDarkMode: true,
  },
];
