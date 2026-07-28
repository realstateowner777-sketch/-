import React, { useState } from 'react';
import { CONTENT_PILLARS, PARTY_HERO_PATH, PARTY_LOGO_PATH } from '../data/mockSamanoudData';
import { GeneratedPost } from '../types';
import {
  Share2,
  TrendingUp,
  Sparkles,
  Users,
  CheckCircle2,
  Video,
  Zap,
  Copy,
  Check,
  Eye,
  BarChart3,
  MessageSquare,
  Globe2,
  Radio,
  FileText,
  Loader2,
  Award,
  Megaphone
} from 'lucide-react';
import { ContentScheduler } from './ContentScheduler';

export const ContentStrategyTab: React.FC = () => {
  // AI Generator Form States
  const [selectedPillar, setSelectedPillar] = useState('المبادرات الخدمية والنزول الميداني');
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('أهالي مركز ومدينة سمنود والوحدات المحلية');
  const [contentType, setContentType] = useState('منشور فيسبوك / بيان إعلامي لحزب مستقبل وطن');
  const [tone, setTone] = useState('مباشرة، وطنية، شفافة، معززة للثقة والعمل الجماعي');

  // Loading & Result States
  const [loading, setLoading] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Icon Resolver
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle2':
        return <CheckCircle2 className="w-6 h-6 text-amber-400" />;
      case 'Video':
        return <Video className="w-6 h-6 text-amber-400" />;
      case 'Users':
        return <Users className="w-6 h-6 text-amber-400" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      default:
        return <Share2 className="w-6 h-6 text-amber-400" />;
    }
  };

  const handleGeneratePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/gemini/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pillar: selectedPillar,
          topic: topic || 'متابعة فعاليات حزب مستقبل وطن وقوافله الميدانية بمركز سمنود',
          targetAudience,
          contentType,
          tone,
        }),
      });

      const data = await response.json();
      if (data.success && data.data) {
        setGeneratedPost({
          ...data.data,
          createdAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        });
      } else {
        setErrorMsg(data.error || 'حدث خطأ أثناء توليد المحتوى. يرجى المحاولة مرة أخرى.');
      }
    } catch (err: any) {
      setErrorMsg('فشل الاتصال بخادم الذكاء الاصطناعي.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPost) return;
    const fullText = `${generatedPost.title}\n\n${generatedPost.content}\n\nأبرز الأرقام:\n${generatedPost.keyMetrics.join('\n')}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Party Mission - Main Bento Hero Cell */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-amber-500/30 p-6 sm:p-8 md:p-10 shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <img src={PARTY_HERO_PATH} alt="حزب مستقبل وطن سمنود" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              <Megaphone className="w-4 h-4 text-amber-400" />
              <span>أمانة الإعلام والتواصل السياسي — أمانة مركز سمنود</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-changa text-white leading-tight">
              استراتيجية المحتوى الفيروسي والتواصل الميداني المباشر
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              ترتكز المنصة الإعلامية لأمانة حزب مستقبل وطن بمركز سمنود على 4 أعمدة رئيسية لصناعة التأثير الاجتماعي، صياغة بيانات حماسية وفيديوهات فيروسية تبرز المبادرات القومية والنزول الميداني لأمانات الحزب.
            </p>
          </div>

          {/* Party Stat Modules */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 shrink-0">
            <div className="bg-slate-950/80 backdrop-blur-md p-5 rounded-2xl border border-amber-500/30 text-center">
              <div className="text-2xl sm:text-3xl font-black font-changa text-amber-400">765K+</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">وصول المحتوى بمركز سمنود</div>
            </div>
            <div className="bg-slate-950/80 backdrop-blur-md p-5 rounded-2xl border border-amber-500/30 text-center">
              <div className="text-2xl sm:text-3xl font-black font-changa text-amber-400">96.4%</div>
              <div className="text-xs text-slate-300 mt-1 font-medium">مؤشر الانتشار والتجاوب</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Content Pillars Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold font-changa text-white flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 border border-amber-500/30">
              <Share2 className="w-5 h-5" />
            </div>
            أعمدة المحتوى الإعلامي للحزب بمركز سمنود
          </h3>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
            أمانة الإعلام والشباب
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONTENT_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 p-6 rounded-3xl flex flex-col justify-between group hover:-translate-y-1 transition-all shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3.5 rounded-2xl bg-gradient-to-tr ${pillar.color} text-white shadow-lg`}>
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
                    {pillar.samplePostsCount} فعاليات
                  </span>
                </div>

                <h4 className="text-base font-bold font-changa text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">{pillar.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-medium">
                <span className="text-slate-400">التفاعل الميداني:</span>
                <span className="text-amber-300 font-bold flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  {pillar.shareabilityScore}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Viral Post Generator & Channel Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: AI Viral Post Generator Form & Result (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-6 h-6 fill-amber-400 text-slate-950" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-changa text-white">
                  استوديو توليد البيانات والمنشورات الفيروسية
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  صياغة بيانات رسمية ومنشورات سريعة الانتشار متوافقة مع هوية حزب مستقبل وطن
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleGeneratePost} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  أمانة / ركن المحتوى الموجه:
                </label>
                <select
                  value={selectedPillar}
                  onChange={(e) => setSelectedPillar(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs font-semibold text-white focus:border-amber-400 focus:outline-none transition-all cursor-pointer"
                >
                  {CONTENT_PILLARS.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  نوع الصيغة الإعلامية:
                </label>
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs font-semibold text-white focus:border-amber-400 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="منشور فيسبوك / بيان إعلامي لحزب مستقبل وطن">منشور فيسبوك / بيان حزبي</option>
                  <option value="بيان صحفي رسمي لأمانة سمنود">بيان صحفي رسمي عاجل</option>
                  <option value="تنبيه خدمي وقافلة طبية للمواطنين">تنبيه بالقافلة الطبية والمعارض</option>
                  <option value="سيناريو فيديو توثيقي قصير">سيناريو فيديو توثيقي مصور</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                موضوع الفعالية / المبادرة المراد تغطيتها:
              </label>
              <input
                type="text"
                placeholder="مثال: إطلاق القافلة الطبية الكبرى بقرية محلة زياد وتوفير السلع بأسعار مخفضة..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none transition-all font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  الجمهور المستهدف:
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  النبرة والصياغة:
                </label>
                <input
                  type="text"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>جاري صياغة المحتوى بواسطة الذكاء الاصطناعي...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>توليد البيان والمنشور الفيروسي الآن 🚀</span>
                </>
              )}
            </button>
          </form>

          {errorMsg && (
            <div className="p-4 bg-red-900/50 text-red-200 text-xs rounded-2xl border border-red-800">
              {errorMsg}
            </div>
          )}

          {/* Generated Result Output Box */}
          {generatedPost && (
            <div className="mt-6 p-6 bg-slate-950 border border-amber-500/30 rounded-2xl text-white space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  بيان حزب مستقبل وطن المولد ({generatedPost.createdAt})
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer border border-slate-700"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ النص الكامل</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <h4 className="text-base font-extrabold font-changa text-amber-300 mb-2">
                  {generatedPost.title}
                </h4>
                <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                  {generatedPost.content}
                </div>
              </div>

              {generatedPost.keyMetrics?.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-400">أبرز الأرقام للإبراز الميداني:</span>
                  <div className="flex flex-wrap gap-2">
                    {generatedPost.keyMetrics.map((m, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-xl text-xs font-bold border border-amber-500/40"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {generatedPost.visualPrompt && (
                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-amber-400 block mb-1">وصف الصورة أو الفيديو الموصى به:</span>
                  {generatedPost.visualPrompt}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Channel Analytics & Performance */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl">
            <h3 className="text-base font-bold font-changa text-white flex items-center gap-2">
              <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 border border-amber-500/30">
                <BarChart3 className="w-5 h-5" />
              </div>
              منصات النشر والتفاعل - أمانة سمنود
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4 text-blue-400" />
                    صفحة الحزب الرسمية بمركز سمنود
                  </span>
                  <span className="text-amber-400 font-mono">310K (65%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    مجموعات أمانات القرى والواتساب
                  </span>
                  <span className="text-emerald-400 font-mono">180K (25%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-purple-400" />
                    قناة تليجرام الإعلامية
                  </span>
                  <span className="text-purple-400 font-mono">65K (10%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 border border-amber-500/30 p-6 sm:p-7 rounded-3xl text-white space-y-5 shadow-2xl">
            <h3 className="text-base font-bold font-changa text-amber-300 flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-400" />
              مؤشرات الأثر والنزول الميداني
            </h3>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">عدد المبادرات الموثقة</div>
                <div className="text-xl font-bold font-changa text-amber-400 mt-1">128 مبادرة</div>
                <div className="text-[10px] text-emerald-400 font-bold mt-1">تغطية 100% لقرى سمنود</div>
              </div>

              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">المستفيدون المباشرون</div>
                <div className="text-xl font-bold font-changa text-amber-400 mt-1">45,000+</div>
                <div className="text-[10px] text-emerald-400 font-bold mt-1">قوافل ومعارض سلع</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Content Publication Scheduler with Template Preview */}
      <ContentScheduler />
    </div>
  );
};

