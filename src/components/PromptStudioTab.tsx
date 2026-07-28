import React, { useState } from 'react';
import { PROMPT_TEMPLATES } from '../data/mockSamanoudData';
import { PromptTemplate } from '../types';
import {
  Terminal,
  Copy,
  Check,
  Sparkles,
  Send,
  Loader2,
  FileCode,
  ShieldAlert,
  FileText,
  HelpCircle,
} from 'lucide-react';

export const PromptStudioTab: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState<PromptTemplate>(PROMPT_TEMPLATES[0]);
  const [customVariables, setCustomVariables] = useState({
    var1: 'رصف الطريق الدائري برئاسة المركز',
    var2: 'إنجاز 85% من الأعمال بطول 4.2 كم',
    var3: 'أمطار غزيرة وتجهيز كساحات المياه',
  });

  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Execution Testing
  const [testResult, setTestResult] = useState('');
  const [executing, setExecuting] = useState(false);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleExecutePrompt = async () => {
    setExecuting(true);
    setTestResult('');

    try {
      const response = await fetch('/api/gemini/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pillar: 'الأوامر المؤسسية والبيانات الشفافة',
          topic: `${activeTemplate.title} - ${customVariables.var1}`,
          targetAudience: 'أهالي وسكان مركز سمنود',
          contentType: activeTemplate.category,
          tone: 'رسمية، شفافة، محفزة للعمل الميداني',
        }),
      });

      const data = await response.json();
      if (data.success && data.data) {
        setTestResult(`${data.data.title}\n\n${data.data.content}`);
      } else {
        setTestResult('حدث خطأ أثناء التشغيل الفعلي للأمر.');
      }
    } catch (err) {
      setTestResult('تعذر الاتصال بالخادم.');
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner - Main Bento Card */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-4 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span>استوديو هندسة الأوامر الحزبية — حزب مستقبل وطن سمنود</span>
        </div>
        <h2 className="text-2xl font-bold font-changa text-white">
          قوالب ومحفزات الأوامر الذكية لأمانة سمنود وأمانات القرى
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed font-medium">
          نماذج جاهزة ومصممة خصيصاً لإصدار البيانات الصحفية، تقارير النزول الميداني وقوافل الخدمة الشاملة بمركز سمنود.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Templates Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-slate-900">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-changa">
              قوالب الأوامر المعتمدة
            </h3>
          </div>

          <div className="space-y-3.5">
            {PROMPT_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => {
                  setActiveTemplate(tmpl);
                  setTestResult('');
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  activeTemplate.id === tmpl.id
                    ? 'bg-gradient-to-br from-blue-900 to-indigo-950 text-white border-blue-700 shadow-lg shadow-blue-900/20 ring-2 ring-blue-500/50'
                    : 'bg-white hover:bg-slate-50/80 text-slate-800 border-slate-200/80 bento-card'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5 text-xs">
                  <span
                    className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                      activeTemplate.id === tmpl.id
                        ? 'bg-blue-800/80 text-blue-200 border border-blue-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {tmpl.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(tmpl.id, tmpl.promptText);
                    }}
                    className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                      activeTemplate.id === tmpl.id
                        ? 'hover:bg-blue-800 text-blue-200'
                        : 'hover:bg-slate-200/70 text-slate-500'
                    }`}
                  >
                    {copiedPromptId === tmpl.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <h4
                  className={`text-sm font-bold font-changa mb-1.5 ${
                    activeTemplate.id === tmpl.id ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {tmpl.title}
                </h4>
                <p
                  className={`text-xs leading-relaxed line-clamp-2 ${
                    activeTemplate.id === tmpl.id ? 'text-blue-100' : 'text-slate-500 font-medium'
                  }`}
                >
                  {tmpl.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Template Editor & Live Execution Sandbox (7 cols) - Bento Card */}
        <div className="lg:col-span-7 bento-card p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {activeTemplate.category}
              </span>
              <h3 className="text-lg font-bold font-changa text-slate-900 mt-2.5">
                {activeTemplate.title}
              </h3>
            </div>

            <button
              onClick={() => handleCopy('active', activeTemplate.promptText)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-200/80"
            >
              {copiedPromptId === 'active' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">تم نسخ الصيغة</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ الصيغة</span>
                </>
              )}
            </button>
          </div>

          {/* Template Box */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">صيغة الأمر (System Prompt):</label>
            <div className="p-4 bg-slate-950 text-slate-200 rounded-2xl font-mono text-xs leading-relaxed border border-slate-800 shadow-inner">
              {activeTemplate.promptText}
            </div>
          </div>

          {/* Variable Fill Form */}
          <div className="space-y-3 bg-slate-50/90 p-4.5 rounded-2xl border border-slate-200/80">
            <span className="text-xs font-bold text-slate-800 block">تغذية المتغيرات الحية:</span>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1.5">اسم المشروع / الموضوع الفرعي:</label>
              <input
                type="text"
                value={customVariables.var1}
                onChange={(e) => setCustomVariables({ ...customVariables, var1: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleExecutePrompt}
            disabled={executing}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {executing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري التشغيل وتوليد النتيجة الفورية...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>اختبار وتشغيل الأمر عبر Gemini</span>
              </>
            )}
          </button>

          {/* Test Execution Result */}
          {testResult && (
            <div className="bento-card-dark text-white p-5 space-y-4 animate-fade-in border border-amber-500/40 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  المخرج المولد بالذكاء الاصطناعي المعالج المعتمد
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-950 text-blue-300 border border-blue-600/50 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-amber-400" />
                  <span>ختم الاعتماد الأزرق اللحظي 🟦</span>
                </span>
              </div>

              <div className="text-xs text-slate-200 font-mono leading-relaxed whitespace-pre-line bg-slate-950 p-4.5 rounded-2xl border border-slate-800 relative">
                {testResult}

                {/* Digital Watermark Overlay */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-amber-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-amber-400 p-0.5 bg-slate-950 shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80"
                        alt="الختم الأزرق المعتمد"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold font-changa text-amber-300 block">
                        د. ياسر السعيد الصعيدي
                      </span>
                      <span className="text-[10px] text-slate-300 block">
                        أمين التدريب والتثقيف • حزب مستقبل وطن سمنود
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>Digital Signature: Verified #SMND-2030-SEAL</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
