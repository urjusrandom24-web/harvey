import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  MessageSquare, 
  Bot, 
  User, 
  HelpCircle,
  Brain,
  Lightbulb
} from 'lucide-react';
import { ExamTrackId } from '../types';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface TutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  examTrack: ExamTrackId;
  topicTitle: string;
  noteContext: string;
}

export const TutorDrawer: React.FC<TutorDrawerProps> = ({
  isOpen,
  onClose,
  examTrack,
  topicTitle,
  noteContext,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: `Hello! I'm your dedicated 1-on-1 Socratic exam coach for **${topicTitle}**. I've reviewed your uploaded notes and mapped them against official exam rubrics. What concept or mechanism would you like to clarify?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'What is the #1 mistake students make on this topic?',
    'Give me a real-world analogy to remember this mechanism.',
    'What exact keywords must I include in an FRQ response?',
    'Quiz me on the most difficult concept in these notes.',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/study-kit/tutor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteContext,
          examTrack,
          messages: updatedMessages,
          question: messageText.trim(),
        }),
      });

      if (!res.ok) throw new Error('Tutor unavailable right now.');

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: data.reply || 'Great question! Remember to link the cause to the biological or chemical consequence.' },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: 'Examiner tip: Always frame your response around the governing law or mechanism defined in your notes. Try re-reading the Rubric Watchlist!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Socratic Exam Tutor</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-medium">
                Live
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 truncate max-w-[220px]">
              Grounded in: {topicTitle}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="p-3 border-b border-slate-800/80 bg-slate-950/40">
        <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Socratic Inquiries:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(qp)}
              disabled={isLoading}
              className="text-left text-[11px] px-2.5 py-1 bg-slate-800/80 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-200 border border-slate-700/60 rounded-lg transition"
            >
              {qp}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${
              m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs ${
                m.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-emerald-500/20 text-emerald-400'
              }`}
            >
              {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] whitespace-pre-line ${
                m.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-indigo-400">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span>Tutor is formulating rubric guidance...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about this mechanism or exam trap..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
