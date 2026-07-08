import React, { useState, useRef, useEffect } from 'react';
import { AIService } from '../services/ai';
import PageHeader from '../components/PageHeader';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your SportSync AI assistant. I can help you check membership status, find recommended available slots, suggest practice partners, register for tournaments, or report maintenance issues. What would you like to do?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "When does my membership expire?",
    "Show my upcoming bookings",
    "Book Court 2 tomorrow at 6 PM",
    "What events are happening this week?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textToSend) => {
    const val = textToSend || inputVal;
    if (!val.trim()) return;

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: val,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    
    setLoading(true);

    try {
      const response = await AIService.chat(val);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        ...response
      }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-140px)]">
      <PageHeader 
        title="SportSync Assistant" 
        description="Ask queries using natural language. Check membership info, check available booking slots, or view tournaments."
      />

      {/* Main chat layout */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        {/* Left: Chat Messages Box */}
        <div className="flex-1 premium-card flex flex-col h-full overflow-hidden bg-white">
          {/* Messages list */}
          <div className="flex-grow p-4 md:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isAI = msg.sender === 'ai';
              return (
                <div key={msg.id} className={`flex items-start space-x-3 max-w-[85%] ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse space-x-reverse'}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${isAI ? 'bg-primary text-white' : 'bg-gray-150 text-gray-655 border border-gray-200'}`}>
                    {isAI ? <Bot className="h-4.5 w-4.5" /> : <User className="h-4.5 w-4.5" />}
                  </div>
                  <div>
                    <div className={`p-4 rounded-2xl text-xs md:text-sm shadow-sm leading-relaxed ${isAI ? 'bg-gray-50 border border-gray-100 text-gray-800' : 'bg-primary text-white'}`}>
                      {msg.text}
                    </div>
                    <span className={`text-[10px] text-gray-400 mt-1 block ${isAI ? 'text-left pl-1' : 'text-right pr-1'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}
            
            {loading && (
              <div className="flex items-start space-x-3 mr-auto max-w-[85%]">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4.5 w-4.5" />
                </div>
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex items-center space-x-2 text-xs text-gray-500 shadow-sm">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500" style={{ animationDelay: '0ms' }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500" style={{ animationDelay: '150ms' }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-purple-500" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form input fields */}
          <div className="p-4 border-t border-gray-150 bg-gray-50/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-2.5 text-xs md:text-sm border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white shadow-sm"
              />
              <button
                type="submit"
                disabled={loading || !inputVal.trim()}
                className="bg-primary hover:bg-primary-dark text-white p-2.5 rounded-xl transition-all shadow disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right: Quick Action Prompts */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="premium-card p-5 bg-gradient-to-b from-purple-50/10 to-transparent">
            <h4 className="font-bold text-gray-800 text-xs pb-3 border-b border-gray-200 mb-4 flex items-center">
              <Sparkles className="h-4.5 w-4.5 text-purple-700 mr-1.5" /> Suggestion Prompts
            </h4>
            <div className="space-y-2.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="w-full text-left p-3 bg-white border border-gray-150 hover:border-gray-305 rounded-xl text-[11px] font-semibold text-gray-600 hover:text-primary transition-all shadow-sm leading-relaxed"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
