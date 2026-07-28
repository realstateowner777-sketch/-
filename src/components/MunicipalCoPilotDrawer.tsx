import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import {
  Bot,
  Send,
  User,
  Sparkles,
  Loader2,
  RefreshCw,
  Building2,
  MessageSquare,
  ChevronDown,
  Mic,
  MicOff,
  Volume2,
} from 'lucide-react';

export const MunicipalCoPilotDrawer: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'أهلاً بك! أنا المساعد الذكي لأمانة حزب مستقبل وطن بمركز سمنود. يمكنك استخدام الأوامر الصوتية أو الكتابية للبحث في المبادرات القومية، استخراج تقارير الشكاوى الميدانية، وصياغة البيانات الصحفية. اضغط على زر الميكروفون للبدء بالتحدث 🎙️',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechNotice, setSpeechNotice] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Voice Command Toggle
  const toggleVoiceListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setSpeechNotice('');
      return;
    }

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      alert('متصفحك لا يدعم خاصية التعرف على الصوت المباشر. يرجى تجربة متصفح Google Chrome أو Microsoft Edge.');
      return;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.lang = 'ar-EG';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechNotice('جاري الاستماع للأمر الصوتي... تحدث الآن 🎙️');
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputPrompt(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setSpeechNotice('حدث خطأ في التقاط الصوت. يرجى المحاولة مرة أخرى.');
        setTimeout(() => setSpeechNotice(''), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setSpeechNotice('');
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || loading) return;

    const userText = inputPrompt;
    setInputPrompt('');

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.sender, text: m.text })),
          userRole: 'مسؤول تنفيذي',
        }),
      });

      const data = await response.json();

      if (data.success && data.reply) {
        const assistantMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const errorAssistantMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: 'عفواً، حدث تعثر بسيط في خادم الإجابات. يرجى إعادة المحاولة.',
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorAssistantMsg]);
      }
    } catch (err) {
      const errorAssistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: 'عفواً، متعذر الاتصال بالخادم الآن.',
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorAssistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Quick suggestion prompts
  const suggestions = [
    'ما هي خطوات المرحلة الثالثة للتحول الرقمي بسمنود؟',
    'اعطني تقريراً موجزاً عن أداء الشكاوى الميدانية اليوم',
    'كيف نقيس الشفافية والوصول للمواطنين في قرية الراهبين؟',
    'صغ لي تنبيهاً سريعاً عن صيانة شبكة الكهرباء في ميت حبيب',
  ];

  return (
    <div className="bento-card overflow-hidden flex flex-col h-[calc(100vh-12rem)] min-h-[520px]">
      {/* Header Bar - Dark Bento Header */}
      <div className="bg-slate-950 text-white p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <h3 className="font-bold font-changa text-base flex items-center gap-2">
              SamanoudOS Executive Co-Pilot
              <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                Gemini 3.6 Flash
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              المساعد المؤسسي الذكي لمركز ومدينة سمنود
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors text-xs flex items-center gap-1.5 cursor-pointer border border-transparent hover:border-slate-700"
          title="إعادة بدء المحادثة"
        >
          <RefreshCw className="w-4 h-4 text-slate-400" />
          <span className="hidden sm:inline font-bold">محادثة جديدة</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4.5 bg-slate-50/60">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-xs font-bold shadow-md ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white shadow-blue-600/20'
                  : 'bg-emerald-600 text-white shadow-emerald-600/20'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4.5 h-4.5" /> : <Bot className="w-4.5 h-4.5" />}
            </div>

            <div
              className={`max-w-2xl p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1.5 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md'
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/80 shadow-sm font-medium'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <div
                className={`text-[10px] text-left pt-1 font-mono ${
                  msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
              <Bot className="w-4.5 h-4.5" />
            </div>
            <div className="p-4 bg-white rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-2.5 text-xs text-slate-700 font-bold">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span>جاري التحليل والتوليد الذكي...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions Prompt Pills */}
      <div className="p-3 bg-white border-t border-slate-100 overflow-x-auto scrollbar-none flex items-center gap-2 text-xs">
        <span className="text-slate-500 text-[11px] font-bold shrink-0 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          مقترحات سريعة:
        </span>
        {suggestions.map((sug, i) => (
          <button
            key={i}
            onClick={() => setInputPrompt(sug)}
            className="whitespace-nowrap px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-full font-bold transition-colors cursor-pointer text-xs shrink-0 border border-slate-200/60"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Speech Notice Banner */}
      {speechNotice && (
        <div className="bg-amber-500/10 border-t border-amber-500/30 px-4 py-2 text-xs text-amber-300 font-bold flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>{speechNotice}</span>
          </div>
          <button
            onClick={() => setIsListening(false)}
            className="text-slate-400 hover:text-white"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* Input Chat Box */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex items-center gap-2 sm:gap-3">
        {/* Voice Command Button */}
        <button
          type="button"
          onClick={toggleVoiceListening}
          className={`p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center shrink-0 ${
            isListening
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 animate-pulse'
              : 'bg-slate-100 text-slate-700 hover:bg-amber-500/20 hover:text-amber-600 border border-slate-200'
          }`}
          title={isListening ? 'إيقاف الاستماع الصوتي' : 'تفعيل الأمر الصوتي المباشر'}
        >
          {isListening ? <MicOff className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          placeholder={isListening ? 'جاري الاستماع لصوتك... تحدث الآن' : 'اكتب استفسارك أو تحدث صوتاً...'}
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          className={`flex-1 border rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium ${
            isListening ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold' : 'bg-slate-50 border-slate-200/90'
          }`}
        />

        <button
          type="submit"
          disabled={!inputPrompt.trim() || loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all cursor-pointer disabled:opacity-50 shrink-0 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Send className="w-4 h-4 rotate-180" />
          <span className="hidden sm:inline">إرسال</span>
        </button>
      </form>
    </div>
  );
};
