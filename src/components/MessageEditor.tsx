import type { Message, Role } from '../types';
import { Trash2, User, Bot, GripVertical } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

interface SortableMessageProps {
  message: Message;
  onUpdate: (id: string, content: string) => void;
  onToggleRole: (id: string) => void;
  onDelete: (id: string) => void;
}

function SortableMessage({ message, onUpdate, onToggleRole, onDelete }: SortableMessageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: message.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-100 dark:border-neutral-800">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="p-1 cursor-grab active:cursor-grabbing text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <button
          onClick={() => onToggleRole(message.id)}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300"
          title="Tap to toggle role"
        >
          {message.role === 'user' ? (
            <><User className="w-3 h-3" /> User</>
          ) : (
            <><Bot className="w-3 h-3" /> Assistant</>
          )}
        </button>

        <div className="flex-1" />

        <button
          onClick={() => onDelete(message.id)}
          className="p-1.5 text-neutral-400 hover:text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <textarea
        value={message.content}
        onChange={(e) => onUpdate(message.id, e.target.value)}
        placeholder={`Enter ${message.role} message...`}
        className="w-full px-3 py-2 bg-transparent text-neutral-800 dark:text-neutral-200 placeholder-neutral-300 dark:placeholder-neutral-600 resize-y focus:outline-none min-h-[60px] text-sm"
        rows={2}
      />
    </div>
  );
}

export function MessageEditor({ messages, setMessages }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const addMessage = (role: Role) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role,
      content: role === 'user' ? 'Why is my code not working? I\'ve tried everything except reading the error message.' : 'I see the issue — the error message literally says what\'s wrong on line 42. Classic.',
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = messages.findIndex(m => m.id === active.id);
    const newIndex = messages.findIndex(m => m.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newMessages = [...messages];
    const [moved] = newMessages.splice(oldIndex, 1);
    newMessages.splice(newIndex, 0, moved);
    setMessages(newMessages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Messages</h2>
        <div className="flex gap-2">
          <button
            onClick={() => addMessage('user')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            User
          </button>
          <button
            onClick={() => addMessage('assistant')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <Bot className="w-3.5 h-3.5" />
            Assistant
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {messages.length === 0 && (
          <div className="text-center py-8 text-neutral-400 dark:text-neutral-500 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg">
            <p className="text-sm">Tap + User or + Assistant to add a message</p>
          </div>
        )}

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={messages.map(m => m.id)} strategy={verticalListSortingStrategy}>
            {messages.map((message) => (
              <SortableMessage
                key={message.id}
                message={message}
                onUpdate={updateMessage}
                onToggleRole={toggleRole}
                onDelete={deleteMessage}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
