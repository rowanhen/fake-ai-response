import { useState, useRef, useEffect } from 'react';
import type { Message, SkinId } from './types';
import { SKINS } from './types';
import { SkinRenderer } from './skins';
import { MessageEditor } from './components/MessageEditor';
import { SkinSelector } from './components/SkinSelector';
import { ExportOptions } from './components/ExportOptions';
import { Sun, Moon, ChevronDown } from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const DEFAULT_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Knock knock',
  },
  {
    id: '2',
    role: 'assistant',
    content: `Who's there?`,
  },
  {
    id: '3',
    role: 'user',
    content: 'Claude',
  },
  {
    id: '4',
    role: 'assistant',
    content: `Claude who?`,
  },
  {
    id: '5',
    role: 'user',
    content: 'Claude you stop asking me to clarify my requirements',
  },
  {
    id: '6',
    role: 'assistant',
    content: `I appreciate the joke, but I need to point out that "Claude you" doesn't phonetically map to any common English phrase, making this a **structurally invalid knock-knock joke**.

Would you like me to:
1. Generate a **properly formatted** knock-knock joke
2. Explain the **linguistic constraints** of the knock-knock format
3. Write a **12-page essay** on the history of door-based humor

Also, I noticed you haven't specified your preferred joke complexity level. Could you rate your humor tolerance on a scale of 1-10?`,
  },
];

function App() {
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);
  const [selectedSkin, setSelectedSkin] = useState<SkinId>('claude-ai');
  const [darkMode, setDarkMode] = useState(true);
  const [appDarkMode, setAppDarkMode] = useState(true);
  const [selectedModels, setSelectedModels] = useState<Record<SkinId, string>>(() => {
    const initial: Record<string, string> = {};
    SKINS.forEach(skin => {
      initial[skin.id] = skin.models[0];
    });
    return initial as Record<SkinId, string>;
  });
  const previewRef = useRef<HTMLDivElement>(null!);

  const currentSkin = SKINS.find(s => s.id === selectedSkin);
  const skinSupportsDarkMode = currentSkin?.supportsDarkMode ?? false;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setAppDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setAppDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleModelChange = (model: string) => {
    setSelectedModels(prev => ({
      ...prev,
      [selectedSkin]: model,
    }));
  };

  return (
    <div className={`min-h-screen ${appDarkMode ? 'dark bg-neutral-950' : 'bg-white'}`}>
      {/* Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <h1 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">fake ai response</h1>
              <span className="text-xs text-neutral-400 dark:text-neutral-600 hidden sm:inline">generate realistic ai screenshots</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setAppDarkMode(!appDarkMode)}
                className="p-2 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                {appDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <a
                href="https://github.com/rowanhen/fake-ai-response"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Editor */}
          <div className="space-y-6">
            <SkinSelector selectedSkin={selectedSkin} onSelect={setSelectedSkin} />
            
            {/* Model Selector */}
            {currentSkin && (
              <div className="space-y-2">
                <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Model</h2>
                <div className="relative">
                  <select
                    value={selectedModels[selectedSkin]}
                    onChange={(e) => handleModelChange(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 pr-8 text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                  >
                    {currentSkin.models.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                </div>
              </div>
            )}

            {skinSupportsDarkMode && (
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  Preview dark mode
                </span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    darkMode ? 'bg-neutral-700' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm ${
                      darkMode ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            )}

            <MessageEditor messages={messages} setMessages={setMessages} />
            <ExportOptions previewRef={previewRef} />
          </div>

          {/* Right - Preview */}
          <div className="lg:sticky lg:top-8 lg:self-start order-first lg:order-last">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Preview</h2>
                <span className="text-xs text-neutral-400 dark:text-neutral-600">{currentSkin?.name}</span>
              </div>
              
              <div 
                ref={previewRef}
                className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800"
              >
                <SkinRenderer 
                  skinId={selectedSkin} 
                  messages={messages} 
                  darkMode={darkMode}
                  selectedModel={selectedModels[selectedSkin]}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-neutral-400 dark:text-neutral-600">
            Not affiliated with OpenAI or Anthropic
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
