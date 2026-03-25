import { useState, useRef, useEffect } from 'react';
import type { Message, SkinId } from './types';
import { SKINS } from './types';
import { SkinRenderer } from './skins';
import { MessageEditor } from './components/MessageEditor';
import { SkinSelector } from './components/SkinSelector';
import { ExportOptions } from './components/ExportOptions';
import { Sun, Moon } from 'lucide-react';

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
    content: 'Can you help me understand how to use React hooks?',
  },
  {
    id: '2',
    role: 'assistant',
    content: `Of course! React hooks are functions that let you use state and other React features in functional components.

The most common hooks are:

1. **useState** - For managing local state
2. **useEffect** - For side effects like data fetching
3. **useRef** - For mutable references that persist across renders
4. **useContext** - For consuming context values

Would you like me to explain any of these in more detail?`,
  },
];

function App() {
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);
  const [selectedSkin, setSelectedSkin] = useState<SkinId>('claude-code');
  const [darkMode, setDarkMode] = useState(true);
  const [appDarkMode, setAppDarkMode] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null!);

  const currentSkin = SKINS.find(s => s.id === selectedSkin);
  const skinSupportsDarkMode = currentSkin?.supportsDarkMode ?? false;

  // Sync app dark mode with system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setAppDarkMode(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setAppDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className={`min-h-screen ${appDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xl">🎭</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Fake AI Response</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Generate realistic AI screenshots</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAppDarkMode(!appDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                title="Toggle dark mode"
              >
                {appDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a
                href="https://github.com/rowanhen/fake-ai-response"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Editor */}
          <div className="space-y-6">
            <SkinSelector selectedSkin={selectedSkin} onSelect={setSelectedSkin} />
            
            {/* Dark mode toggle for skins that support it */}
            {skinSupportsDarkMode && (
              <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Preview Dark Mode
                </span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    darkMode ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      darkMode ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            )}

            <MessageEditor messages={messages} setMessages={setMessages} />
            
            <ExportOptions previewRef={previewRef} />
          </div>

          {/* Right column - Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">{currentSkin?.name}</span>
              </div>
              
              <div 
                ref={previewRef}
                className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700"
              >
                <SkinRenderer 
                  skinId={selectedSkin} 
                  messages={messages} 
                  darkMode={darkMode}
                />
              </div>
              
              <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                Tip: Add more messages to see how the conversation looks
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Made for fun • Not affiliated with OpenAI, Anthropic, GitHub, or Cursor
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
