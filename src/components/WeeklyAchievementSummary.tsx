import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Award,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Users,
  Building2,
  FileText,
} from 'lucide-react';

export const WeeklyAchievementSummary: React.FC = () => {
  // Analytical Weekly Data Summary based on Samanoud secretariats & database
  const currentWeek = 'الأسبوع الرابع - يوليو 2026';

  const weeklyHighlights = [
    {
      secretariat: 'أمانة الصحة والعمل الاجتماعي',
      achievement: 'تنظيم 3 قوافل طبية بقرى محلة زياد، الراهبين، وميت حبيب توفر الكشف والتعديل العلاجي لـ 4,200 مواطن.',
      impact: 'توفير علاجات مجانية بقيمة 185 ألف جنيه وإحالة 24 حالة عاجلة للمستشفيات.',
      status: 'إنجاز استثنائي',
      color: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300',
    },
    {
      secretariat: 'أمانة العمل الجماهيري والتموين',
      achievement: 'افتتاح 2 منافذ سلع غذائية مخفضة بمدينة سمنود وقرية أبو صير بنسب تخفيض تصل إلى 30%.',
      impact: 'خدمة أكثر من 12,500 أسرة بمركز سمنود وتخفيف الأعباء المعيشية.',
      status: 'تم التنفيذ بنجاح',
      color: 'border-amber-500/40 bg-amber-950/40 text-amber-300',
    },
    {
      secretariat: 'مكتب خدمة المواطنين والنواب',
      achievement: 'حسم 142 شكوى وبلاغ ميداني من أصل 148 وردت خلال الأسبوع الحالي بنسبة استجابة 96%.',
      impact: 'تقليص متوسط زمن الرد (SLA) إلى 14 ساعة فقط عبر التوجيه الذكي.',
      status: 'استجابة قياسية',
      color: 'border-blue-500/40 bg-blue-950/40 text-blue-300',
    },
    {
      secretariat: 'أمانة الشباب والتطوير الرقمي',
      achievement: 'إنهاء البرنامج التدريبي لـ 45 كوادر شبابية على صناعة الفيديو والتغطيات الإعلامية.',
      impact: 'إطلاق 12 ريلز وبث مباشر حقق 340 ألف مشاهدة عبر المنصات الرسمية.',
      status: 'مستمر ميدانياً',
      color: 'border-purple-500/40 bg-purple-950/40 text-purple-300',
    },
  ];

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>ملخص الإنجازات الأسبوعي التجميعي — أمانة مركز سمنود</span>
          </div>
          <h3 className="text-xl font-extrabold font-changa text-white flex items-center gap-2">
            مؤشرات الإنجاز والتحليل الأسبوعي للقطاعات ({currentWeek})
          </h3>
          <p className="text-xs text-slate-300">
            تقرير تحليلي دوري يلخص نتائج العمل الميداني للوحدات القروية والأمانات النوعية بسمنود مستخرج تلقائياً.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 shrink-0 text-xs font-mono">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-slate-300">معدل الإنجاز العام: </span>
          <span className="text-amber-400 font-bold text-sm">94.8%</span>
        </div>
      </div>

      {/* Grid of Secretariat Weekly Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {weeklyHighlights.map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border ${item.color} space-y-3 transition-all hover:scale-[1.01]`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 font-changa text-white text-sm">
                <Building2 className="w-4 h-4 text-amber-400" />
                {item.secretariat}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-950/80 border border-slate-700">
                {item.status}
              </span>
            </div>

            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              {item.achievement}
            </p>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-bold block mb-0.5">الأثر الميداني والمباشر:</strong>
                <span>{item.impact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Stats Footprint */}
      <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
        <div>
          <span className="text-slate-400 block font-semibold mb-1">الفعاليات المنفذة هذا الأسبوع</span>
          <strong className="text-xl font-black font-changa text-amber-400">18 فعالية</strong>
        </div>
        <div>
          <span className="text-slate-400 block font-semibold mb-1">المستفيدون هذا الأسبوع</span>
          <strong className="text-xl font-black font-changa text-emerald-400">16,700 مواطن</strong>
        </div>
        <div>
          <span className="text-slate-400 block font-semibold mb-1">البلاغات المحسومة أسبوعياً</span>
          <strong className="text-xl font-black font-changa text-blue-400">142 بلاغ</strong>
        </div>
        <div>
          <span className="text-slate-400 block font-semibold mb-1">نسبة رضا الأهالي (Polls)</span>
          <strong className="text-xl font-black font-changa text-purple-400">97.2%</strong>
        </div>
      </div>
    </div>
  );
};
