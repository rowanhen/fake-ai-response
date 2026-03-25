import type { SkinId } from '../types';
import { SKINS } from '../types';
import { Terminal, MessageSquare, Sparkles, Code, Command, GitBranch } from 'lucide-react';

interface Props {
  selectedSkin: SkinId;
  onSelect: (skin: SkinId) => void;
}

const SKIN_ICONS: Record<SkinId, React.ReactNode> = {
  'claude-code': <Terminal className="w-5 h-5" />,
  'chatgpt': <MessageSquare className="w-5 h-5" />,
  'claude-ai': <Sparkles className="w-5 h-5" />,
  'cursor': <Code className="w-5 h-5" />,
  'codex-cli': <Command className="w-5 h-5" />,
  'copilot': <GitBranch className="w-5 h-5" />,
};

const SKIN_COLORS: Record<SkinId, string> = {
  'claude-code': 'from-purple-500 to-purple-700',
  'chatgpt': 'from-green-500 to-teal-600',
  'claude-ai': 'from-orange-400 to-amber-600',
  'cursor': 'from-cyan-400 to-blue-500',
  'codex-cli': 'from-blue-500 to-indigo-600',
  'copilot': 'from-violet-500 to-purple-600',
};

export function SkinSelector({ selectedSkin, onSelect }: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Choose Skin</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {SKINS.map((skin) => (
          <button
            key={skin.id}
            onClick={() => onSelect(skin.id)}
            className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
              selectedSkin === skin.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${SKIN_COLORS[skin.id]} flex items-center justify-center text-white`}>
              {SKIN_ICONS[skin.id]}
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900 dark:text-white">{skin.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{skin.description}</div>
            </div>
            {selectedSkin === skin.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
