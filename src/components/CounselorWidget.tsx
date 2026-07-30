import React, { useState } from 'react';
import { Bot, Send, Loader2, Sparkles, User } from 'lucide-react';

export const CounselorWidget: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: 'Greetings! I am Dr. Marcus Vance, AI Dean of Admissions at Apex Engineering University. Ask me anything about our quantum computing labs, aerospace engineering programs, entrance criteria, or fall deadlines!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/counselor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: data.answer || 'Thank you for your question!' },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Our admissions desk is currently reviewing high volumes of applications. You can submit your application directly using the Apply button above!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="counselor" className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-900/50">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
        <div className="p-3 bg-amber-400 text-slate-950 rounded-2xl font-bold shadow-lg">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-serif font-bold text-white">AI Admissions Counselor</h3>
            <span className="px-2 py-0.5 bg-amber-400/20 text-amber-300 text-[10px] font-bold rounded uppercase tracking-wider flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Live AI</span>
            </span>
          </div>
          <p className="text-xs text-slate-400">Dr. Marcus Vance • Apex Engineering Admissions Desk</p>
        </div>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto mb-6 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-3 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div
              className={`p-2 rounded-xl text-xs shrink-0 ${
                m.sender === 'user' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-indigo-950 text-amber-300 border border-indigo-900'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div
              className={`p-4 rounded-2xl text-xs leading-relaxed max-w-xl ${
                m.sender === 'user'
                  ? 'bg-amber-400 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-amber-400 py-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Consulting admissions matrix...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Dr. Vance about admissions, quantum AI programs, GPAs..."
          className="flex-1 bg-slate-800 text-white text-xs px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-3 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-bold transition-all disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
