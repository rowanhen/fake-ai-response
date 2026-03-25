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
  models: string[];
}

export interface UserAvatar {
  name: string;
  initials: string;
  color: string;
}

export const AVATAR_COLORS = [
  '#5436DA', // Purple
  '#19c37d', // Green
  '#ef4444', // Red
  '#f97316', // Orange
  '#eab308', // Yellow
  '#3b82f6', // Blue
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#14b8a6', // Teal
];

export const SKINS: Skin[] = [
  {
    id: 'claude-ai',
    name: 'Claude.ai',
    description: 'Anthropic web interface',
    supportsDarkMode: true,
    models: ['Claude 4 Sonnet', 'Claude 4 Opus', 'Claude 3.5 Haiku'],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI web interface',
    supportsDarkMode: true,
    models: ['GPT-4o', 'GPT-4', 'GPT-3.5'],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'IDE chat panel',
    supportsDarkMode: false, // Always dark
    models: ['claude-3.5-sonnet', 'gpt-4o', 'cursor-small'],
  },
  {
    id: 'codex-cli',
    name: 'Codex CLI',
    description: 'OpenAI terminal interface',
    supportsDarkMode: false, // Always dark
    models: ['codex-mini', 'o4-mini', 'o3'],
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    description: 'VS Code chat panel',
    supportsDarkMode: true,
    models: ['GPT-4o', 'Claude 3.5 Sonnet', 'o3-mini'],
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    description: 'Terminal TUI with ❯ prompt',
    supportsDarkMode: false, // Always dark
    models: ['Claude 4 Sonnet', 'Claude 4 Opus'],
  },
];
