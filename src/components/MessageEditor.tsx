import type { Message, Role } from '../types';
import { GripVertical, Trash2, Plus, User, Bot } from 'lucide-react';

interface Props {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

export function MessageEditor({ messages, setMessages }: Props) {
  const addMessage = (role: Role) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role,
      content: role === 'user' ? 'Hello!' : 'Hi there! How can I help you today?',
    };
    setMessages([...messages, newMessage]);
  };

  const updateMessage = (id: string, content: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, content } : m));
  };

  const toggleRole = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, role: m.role === 'user' ? 'assistant' : 'user' } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const moveMessage = (id: string, direction: 'up' | 'down') => {
    const index = messages.findIndex(m => m.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= messages.length) return;
    
    const newMessages = [...messages];
    [newMessages[index], newMessages[newIndex]] = [newMessages[newIndex], newMessages[index]];
    setMessages(newMessages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>
        <div className="flex gap-2">
          <button
            onClick={() => addMessage('user')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <User className="w-4 h-4" />
            Add User
          </button>
          <button
            onClick={() => addMessage('assistant')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            <Bot className="w-4 h-4" />
            Add Assistant
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
            <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No messages yet. Add a user or assistant message to get started.</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={message.id}
            className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Message header */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
              <button
                className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                title="Drag to reorder"
              >
                <GripVertical className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => toggleRole(message.id)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-sm font-medium transition-colors ${
                  message.role === 'user'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                }`}
                title="Click to toggle role"
              >
                {message.role === 'user' ? (
                  <>
                    <User className="w-3.5 h-3.5" />
                    User
                  </>
                ) : (
                  <>
                    <Bot className="w-3.5 h-3.5" />
                    Assistant
                  </>
                )}
              </button>

              <div className="flex-1" />

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => moveMessage(message.id, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => moveMessage(message.id, 'down')}
                  disabled={index === messages.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteMessage(message.id)}
                  className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message content */}
            <textarea
              value={message.content}
              onChange={(e) => updateMessage(message.id, e.target.value)}
              placeholder={`Enter ${message.role} message...`}
              className="w-full px-3 py-2 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 resize-none focus:outline-none min-h-[80px]"
              rows={3}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
