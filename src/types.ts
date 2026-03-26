export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
}

export type SkinId = 'claude-ai' | 'chatgpt';

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

export const SKINS: Skin[] = [
  {
    id: 'claude-ai',
    name: 'Claude.ai',
    description: 'Anthropic web interface',
    supportsDarkMode: true,
    models: ['Opus 4.6', 'Sonnet 4.6', 'Opus 4', 'Sonnet 4', 'Sonnet 3.5', 'Haiku 3.5'],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI web interface',
    supportsDarkMode: true,
    models: ['GPT-4.1', 'GPT-4.1 mini', 'GPT-4.1 nano', 'GPT-4o', 'GPT-4o mini', 'o3', 'o4-mini', 'GPT-4.5', 'GPT-4'],
  },
];
