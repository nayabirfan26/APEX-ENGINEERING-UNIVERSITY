import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  Loader2,
  HelpCircle,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

interface AiCounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
  openApplyModal: () => void;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

export const AiCounselorModal: React.FC<AiCounselorModalProps> = ({
  isOpen,
  onClose,
  openApplyModal
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello! I am the Apex University AI Academic Counselor. How can I assist your engineering education journey today? Ask me about our 6 Engineering Divisions, Research Labs, Fall 2026 Deadlines, or Merit Scholarships!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const sampleQuestions = [
    'What are the eligibility criteria for CS & AI?',
    'How do merit scholarships work for GPA >= 3.5?',
    'Tell me about the Quantum Cleanroom Lab.',
    'When is the Fall 2026 application deadline?'
  ];

  const handleSend = async (questionText?: string) => {
    const query = (questionText || input).trim();
    if (!query || loading) return;

    // Add user message
    const newMessages: Message[] = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query, context: 'Apex Engineering University Portal' })
      });

      const data = await res.json();
      if (data && data.answer) {
        setMessages([...newMessages, { sender: 'bot', text: data.answer }]);
      } else {
        setMessages([
          ...newMessages,
          {
            sender: 'bot',
            text: 'Fall 2026 Admissions are actively open! Eligibility requires a minimum GPA of 3.0 / 4.0. Explore our Admissions Info tab to test your scholarship discount!'
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        {
          sender: 'bot',
          text: 'Applications for Fall 2026 are open until August 30, 2026. Applicants with GPA >= 3.5 automatically qualify for 50%-100% Merit Scholarships.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col h-[620px] max-h-[90vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-indigo-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span>Apex AI Academic Counselor</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ONLINE
                </span>
              </h3>
              <p className="text-xs text-slate-400">Powered by Gemini AI • Real-time Admissions Guidance</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-indigo-600/30 text-amber-400 border border-indigo-500/40'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none shadow-sm'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-slate-400 text-xs py-2">
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
              <span>Consulting Apex University academic database...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Questions */}
        {messages.length < 4 && (
          <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800/80">
            <p className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-amber-400" /> Quick Questions:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sampleQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-amber-300 border border-slate-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-3.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about courses, labs, fees, or requirements..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom CTA to Apply */}
        <div className="px-4 py-2 bg-slate-950 text-center border-t border-slate-800/60 flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Admissions for Fall 2026 are active
          </span>
          <button
            onClick={() => {
              onClose();
              openApplyModal();
            }}
            className="text-amber-400 font-bold hover:underline flex items-center gap-1"
          >
            <GraduationCap className="w-3.5 h-3.5" /> Start Application
          </button>
        </div>

      </div>
    </div>
  );
};
