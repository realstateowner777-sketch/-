import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  FileText,
  ShieldCheck,
  Award,
  Search,
  Building2,
  Users,
  CheckCircle2,
  ChevronLeft,
  Share2,
  Sparkles,
  HelpCircle,
  X
} from 'lucide-react';
import { PARTY_LOGO_PATH } from '../data/mockSamanoudData';

export interface GuideArticle {
  id: string;
  category: 'اللائحة الأساسية' | 'ميثاق العمل الميداني' | 'الضوابط الإعلامية' | 'الهيكل التنظيمي';
  title: string;
  summary: string;
  fullText: string[];
  importantNotes?: string;
}

export const MemberGuide: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('الجميع');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<GuideArticle | null>(null);

  const articles: GuideArticle[] = [
    {
      id: 'art-1',
      category: 'اللائحة الأساسية',
      title: 'أهداف ورؤية أمانة مركز سمنود — حزب مستقبل وطن',
      summary: 'المرجع التنظيمي الأساسي لبناء المشاركة السياسية والارتقاء بالتكافل الاجتماعي بالقرية والمدينة.',
      fullText: [
        '1. ترسيخ قيم المواطنة والانتماء الوطني والعمل الجماعي بجميع القرى التابعة لمركز سمنود.',
        '2. دعم جهود الدولة المصرية والمبادرات الرئاسية القومية (حياة كريمة، 100 مليون صحة، أهلاً رمضان).',
        '3. إنشاء قنوات اتصال مباشرة بين المواطنين ونواب الحزب بالبرلمان والشيوخ لتلبية الخدمات الجماهيرية.',
        '4. إعداد وتأهيل الكوادر الشبابية والنساء لتولي مسؤوليات قيادية في الشأن المحلي والتنموي.'
      ],
      importantNotes: 'تلتزم كافة الأمانات الفرعية واللجان النوعية بتطبيق بند المشاركة المجتمعية الفعالة.'
    },
    {
      id: 'art-2',
      category: 'ميثاق العمل الميداني',
      title: 'ميثاق الشرف والتعامل الميداني مع المواطنين',
      summary: 'قواعد السلوك القويم والحيادية وتوفير الخدمات بكفاءة وشفافية لجميع أهالي سمنود.',
      fullText: [
        'أولاً: الاحترام المطلق والحيادية التامة عند استلام شكاوى المواطنين ومتابعتها دون تمييز.',
        'ثانياً: حظر جمع أي مبالغ مالية أو تبرعات تحت أي مسمى؛ جميع خدمات الحزب مجانية 100%.',
        'ثالثاً: الالتزام بالزي الرسمي للحزب والبطاقة التعريفية أثناء القوافل الطبية والمعارض التموينية.',
        'رابعاً: سرعة إبلاغ غرفة العمليات بالشكاوى العاجلة التي تشكل خطورة على سلامة المواطنين.'
      ],
      importantNotes: 'الامتثال الكامل لميثاق الشرف شرط أساسي لاستمرار العضوية باللجان الميدانية.'
    },
    {
      id: 'art-3',
      category: 'الضوابط الإعلامية',
      title: 'سياسة النشر والظهور الإعلامي بالمنصات الرقمية',
      summary: 'الضوابط الرسمية لإدارة الصفحات التابعة للأمانة والمجموعات الجماهيرية عبر التواصل الاجتماعي.',
      fullText: [
        '1. التنسيق المسبق مع أمانة الإعلام بمركز سمنود قبل نشر البيانات والتصريحات الصحفية الرسمية.',
        '2. استخدام الهوية البصرية الرسمية (الشعار، الألوان الرسمية الملكي والذهبي) في تصاميم الفيديوهات والبانرات.',
        '3. حظر نشر الصور الشخصية الشفافة للمستفيدين من المبادرات التكافلية حفظاً لكرامتهم الإنسانية.',
        '4. الرد السريع بأسلوب مؤسسي راقٍ على استفسارات المتابعين عبر الرسائل الخاصة بروابط التواصل.'
      ],
      importantNotes: 'تعتمد جميع المواد الإعلامية من أمين الإعلام بالمركز قبل الجدولة والنشر.'
    },
    {
      id: 'art-4',
      category: 'الهيكل التنظيمي',
      title: 'الهيكل التنظيمي واللجان النوعية بالمركز',
      summary: 'توزيع المهام واللجان التخصصية لتغطية مدينة سمنود وكافة الوحدات المحلية التابعة.',
      fullText: [
        '• هيئة مكتب الأمانة: أمين المركز، الأمناء المساعدون، وأمين التنظيم.',
        '• اللجان النوعية: الإعلام، العمل الجماهيري، الشباب، المرأة، العلاقات العامة، والخدمات الحكومية.',
        '• الأمانات الفرعية بالقررى: محلة زياد، الراهبين، ميت حبيب، كفر حسان، طليمة، ميت عسس، أبوصير.'
      ],
      importantNotes: 'تنسق اللجان النوعية أسبوعياً مع أمين التنظيم لتقييم المؤشرات الأسبوعية.'
    }
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = activeCategory === 'الجميع' || art.category === activeCategory;
    const matchesSearch =
      art.title.includes(searchQuery) ||
      art.summary.includes(searchQuery) ||
      art.fullText.some((line) => line.includes(searchQuery));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <BookOpen className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold font-changa text-white">
                دليلك الحزبي والتنظيمي (Member Guide)
              </h3>
              <span className="px-2.5 py-0.5 text-[10px] font-black bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                أمانة سمنود
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              اللائحة الداخلية، ميثاق العمل الميداني، والضوابط التنظيمية والإعلامية لكوادر حزب مستقبل وطن
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث باللائحة أو الضوابط..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:border-amber-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
        {['الجميع', 'اللائحة الأساسية', 'ميثاق العمل الميداني', 'الضوابط الإعلامية', 'الهيكل التنظيمي'].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-amber-300'
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 p-6 rounded-2xl transition-all shadow-md flex flex-col justify-between space-y-4 cursor-pointer group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  {art.category}
                </span>
                <span className="text-amber-400 text-[11px] font-bold group-hover:translate-x-[-2px] transition-transform">
                  قراءة البنود كاملة ➔
                </span>
              </div>

              <h4 className="text-base font-extrabold font-changa text-white group-hover:text-amber-300 transition-colors">
                {art.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>{art.fullText.length} بنود تنظيمية</span>
              <span className="text-emerald-400 font-bold">موثق رسمياً ✅</span>
            </div>
          </div>
        ))}
      </div>

      {/* ARTICLE FULL TEXT MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 text-white max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={PARTY_LOGO_PATH}
                    alt="الشعار الرسمي"
                    className="w-9 h-9 rounded-full border border-amber-500/40 object-cover"
                  />
                  <div>
                    <span className="text-xs font-bold text-amber-400">{selectedArticle.category}</span>
                    <h3 className="text-base font-extrabold font-changa">{selectedArticle.title}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {selectedArticle.fullText.map((paragraph, index) => (
                  <div key={index} className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                    {paragraph}
                  </div>
                ))}

                {selectedArticle.importantNotes && (
                  <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-amber-300 font-bold text-xs flex items-start gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <span>ملاحظة تنفيذه: {selectedArticle.importantNotes}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs cursor-pointer hover:bg-amber-400"
                >
                  تم الاطلاع والالتزام باللائحة
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
