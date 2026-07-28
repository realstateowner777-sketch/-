import React, { useState, useEffect } from 'react';
import {
  BarChart2,
  PieChart,
  Users,
  CheckCircle2,
  Plus,
  Send,
  Sparkles,
  MapPin,
  Building2,
  ThumbsUp,
  MessageSquare,
  Award,
  Filter,
  RefreshCw,
  X,
  Star,
} from 'lucide-react';

export interface CitizenPoll {
  id: string;
  secretariat: string;
  title: string;
  targetInitiative: string;
  question: string;
  villages: string[];
  totalVotes: number;
  satisfactionRate: number; // percentage e.g. 88
  ratingsBreakdown: {
    excellent: number; // 5 stars
    good: number; // 4 stars
    average: number; // 3 stars
    poor: number; // 1-2 stars
  };
  comments: {
    id: string;
    citizenName: string;
    village: string;
    rating: number;
    text: string;
    date: string;
  }[];
  status: 'نشط' | 'مغلق' | 'مسودة';
  createdAt: string;
}

const INITIAL_POLLS: CitizenPoll[] = [
  {
    id: 'POLL-2026-001',
    secretariat: 'أمانة التدريب والتثقيف',
    title: 'قياس رضا المتدربين عن الدورة الأولى للتثقيف السياسي (TRN-01)',
    targetInitiative: 'الحزمة التدريبية الميكنة TRN-01',
    question: 'ما مدى تقييمك لمحتوى ورشة التثقيف السياسي والتواصل الرقمي بمقر سمنود؟',
    villages: ['مدينة سمنود', 'قرية محلة زياد', 'قرية الراهبين', 'قرية ميت حبيب', 'قرية أبو صير'],
    totalVotes: 142,
    satisfactionRate: 92,
    ratingsBreakdown: {
      excellent: 98,
      good: 32,
      average: 8,
      poor: 4,
    },
    comments: [
      {
        id: 'c-1',
        citizenName: 'أحمد محمود القاضي',
        village: 'مدينة سمنود',
        rating: 5,
        text: 'ورشة متميزة جداً، وحصلت على الشهادة الرقمية فور انتهاء الاختبار التلقائي!',
        date: 'منذ ساعتين',
      },
      {
        id: 'c-2',
        citizenName: 'م. مروة الشناوي',
        village: 'قرية محلة زياد',
        rating: 5,
        text: 'التطبيق المباشر على نظام SamanoudOS أتاح لنا فهم آليات المتابعة الرقمية.',
        date: 'منذ 5 ساعات',
      },
      {
        id: 'c-3',
        citizenName: 'السيد عبد الحفيظ',
        village: 'قرية الراهبين',
        rating: 4,
        text: 'نطالب بتكرار هذه الدورة في مقر الوحدة المحلية بالراهبين لتيسير الانتقال.',
        date: 'أمس',
      },
    ],
    status: 'نشط',
    createdAt: '2026-07-20',
  },
  {
    id: 'POLL-2026-002',
    secretariat: 'أمانة العمل الجماهيري',
    title: 'استطلاع أثر القافلة الخدمية والتكافلية بقرية ميت حبيب',
    targetInitiative: 'قافلة سمنود الخدمية الشاملة',
    question: 'كيف تقيم سرعة وجودة استجابة فريق القافلة لبلاغات ومطالب الأهالي؟',
    villages: ['قرية ميت حبيب', 'قرية بنا أبوصير'],
    totalVotes: 89,
    satisfactionRate: 86,
    ratingsBreakdown: {
      excellent: 54,
      good: 22,
      average: 9,
      poor: 4,
    },
    comments: [
      {
        id: 'c-4',
        citizenName: 'الشيخ عبد المنعم',
        village: 'قرية ميت حبيب',
        rating: 5,
        text: 'تم صيانة أعمدة الإنارة وتنظيف الشارع الرئيسي خلال 24 ساعة فقط.',
        date: 'منذ 3 أيام',
      },
    ],
    status: 'نشط',
    createdAt: '2026-07-18',
  },
  {
    id: 'POLL-2026-003',
    secretariat: 'أمانة الشباب',
    title: 'استبيان احتياجات الشباب في حاضنات أعمال ريادة الأعمال',
    targetInitiative: 'منصة رواد أعمال سمنود 2030',
    question: 'ما هو التخصص الأكثر أهمية لدعم مشروعاتك الناشئة بمركز سمنود؟',
    villages: ['جميع القرى والمركز'],
    totalVotes: 210,
    satisfactionRate: 88,
    ratingsBreakdown: {
      excellent: 130,
      good: 55,
      average: 18,
      poor: 7,
    },
    comments: [
      {
        id: 'c-5',
        citizenName: 'إبراهيم خليل',
        village: 'مدينة سمنود',
        rating: 5,
        text: 'نحتاج دورات متخصصة في التسويق الرقمي والتصدير لمشروعات الغزل والنسيج.',
        date: 'منذ أسبوع',
      },
    ],
    status: 'نشط',
    createdAt: '2026-07-15',
  },
];

export const CitizenPollEngine: React.FC = () => {
  const [polls, setPolls] = useState<CitizenPoll[]>(() => {
    const saved = localStorage.getItem('samanoud_citizen_polls');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_POLLS;
      }
    }
    return INITIAL_POLLS;
  });

  const [activePoll, setActivePoll] = useState<CitizenPoll>(polls[0] || INITIAL_POLLS[0]);
  const [selectedSecretariat, setSelectedSecretariat] = useState<string>('الجميع');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Vote Form States
  const [voterName, setVoterName] = useState('');
  const [voterVillage, setVoterVillage] = useState('مدينة سمنود');
  const [voterRating, setVoterRating] = useState<number>(5);
  const [voterComment, setVoterComment] = useState('');
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  // New Poll Form States
  const [newSecretariat, setNewSecretariat] = useState('أمانة التدريب والتثقيف');
  const [newTitle, setNewTitle] = useState('');
  const [newInitiative, setNewInitiative] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    localStorage.setItem('samanoud_citizen_polls', JSON.stringify(polls));
  }, [polls]);

  const secretariatsList = [
    'الجميع',
    'أمانة التدريب والتثقيف',
    'أمانة العمل الجماهيري',
    'أمانة الشباب',
    'أمانة المرأة',
    'أمانة التنظيم',
    'أمانة الصحة',
    'أمانة التعليم',
  ];

  const filteredPolls = polls.filter(
    (p) => selectedSecretariat === 'الجميع' || p.secretariat === selectedSecretariat
  );

  const handleVoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voterComment.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      citizenName: voterName.trim() || 'مواطن مشارك — سمنود',
      village: voterVillage,
      rating: voterRating,
      text: voterComment.trim(),
      date: 'الآن',
    };

    setPolls((prev) =>
      prev.map((p) => {
        if (p.id === activePoll.id) {
          const updatedTotal = p.totalVotes + 1;
          const updatedBreakdown = { ...p.ratingsBreakdown };
          if (voterRating === 5) updatedBreakdown.excellent += 1;
          else if (voterRating === 4) updatedBreakdown.good += 1;
          else if (voterRating === 3) updatedBreakdown.average += 1;
          else updatedBreakdown.poor += 1;

          const positiveVotes = updatedBreakdown.excellent + updatedBreakdown.good;
          const newSatisfaction = Math.round((positiveVotes / updatedTotal) * 100);

          const updatedPoll: CitizenPoll = {
            ...p,
            totalVotes: updatedTotal,
            satisfactionRate: newSatisfaction,
            ratingsBreakdown: updatedBreakdown,
            comments: [newComment, ...p.comments],
          };
          setActivePoll(updatedPoll);
          return updatedPoll;
        }
        return p;
      })
    );

    setVoterComment('');
    setVoteSubmitted(true);
    setTimeout(() => setVoteSubmitted(false), 3000);
  };

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQuestion.trim()) return;

    const created: CitizenPoll = {
      id: `POLL-2026-00${polls.length + 1}`,
      secretariat: newSecretariat,
      title: newTitle.trim(),
      targetInitiative: newInitiative.trim() || 'مبادرة عامة',
      question: newQuestion.trim(),
      villages: ['مدينة سمنود', 'قرية محلة زياد', 'قرية الراهبين', 'قرية ميت حبيب', 'قرية أبو صير'],
      totalVotes: 1,
      satisfactionRate: 100,
      ratingsBreakdown: { excellent: 1, good: 0, average: 0, poor: 0 },
      comments: [
        {
          id: `c-init`,
          citizenName: 'مسؤول المتابعة الرقمية',
          village: 'سمنود المركز',
          rating: 5,
          text: 'تم إطلاق الاستبيان بنجاح واستقبال المشاركات الأولية.',
          date: 'الآن',
        },
      ],
      status: 'نشط',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setPolls([created, ...polls]);
    setActivePoll(created);
    setShowCreateModal(false);
    setNewTitle('');
    setNewInitiative('');
    setNewQuestion('');
  };

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2 border border-emerald-500/40">
            <BarChart2 className="w-4 h-4 text-emerald-400" />
            <span>محرك استبيانات رضا المواطنين (CitizenPollEngine)</span>
          </div>
          <h3 className="text-xl font-bold font-changa text-white flex items-center gap-2">
            منصة القياس الرقمي والتحليل اللحظي لرضا الأهالي بسمنود
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            أداة الأمانات النوعية لإطلاق الاستطلاعات، قياس الأثر الميداني للمبادرات، وتجميع المؤشرات التجميعية
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-950/40 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>إطلاق استبيان جديد للأمانة</span>
        </button>
      </div>

      {/* Filter by Secretariat */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-bold shrink-0">الأمانة النوعية:</span>
        {secretariatsList.map((sec) => (
          <button
            key={sec}
            onClick={() => setSelectedSecretariat(sec)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
              selectedSecretariat === sec
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Main Grid: Poll Selector & Active Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Poll List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold font-changa text-slate-300 flex items-center justify-between">
            <span>الاستبيانات الميدانية الجارية ({filteredPolls.length})</span>
            <span className="text-[10px] text-emerald-400 font-mono">Real-Time Sync</span>
          </h4>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {filteredPolls.map((poll) => (
              <div
                key={poll.id}
                onClick={() => setActivePoll(poll)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  activePoll.id === poll.id
                    ? 'bg-gradient-to-br from-emerald-950/80 to-slate-950 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-emerald-400 px-2 py-0.5 bg-emerald-950 rounded border border-emerald-800">
                    {poll.secretariat}
                  </span>
                  <span className="text-slate-400 font-mono">{poll.totalVotes} مشاركة</span>
                </div>

                <h5 className="text-xs font-bold text-slate-100 line-clamp-2 leading-relaxed">
                  {poll.title}
                </h5>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {poll.targetInitiative}
                  </span>
                  <span className="font-bold font-mono text-emerald-300">
                    {poll.satisfactionRate}% رضا
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (2 cols): Active Analytics & Vote Panel */}
        <div className="lg:col-span-2 space-y-5">
          {/* Active Poll Details Header */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800">
                  {activePoll.id} — {activePoll.secretariat}
                </span>
                <h4 className="text-base font-bold font-changa text-white mt-1">
                  {activePoll.title}
                </h4>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-center bg-emerald-950/60 px-3.5 py-1.5 rounded-xl border border-emerald-800">
                  <span className="text-[10px] text-slate-400 block font-medium">مؤشر الرضا</span>
                  <span className="text-lg font-black font-mono text-emerald-400">
                    {activePoll.satisfactionRate}%
                  </span>
                </div>
                <div className="text-center bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">المشاركون</span>
                  <span className="text-lg font-black font-mono text-amber-400">
                    {activePoll.totalVotes}
                  </span>
                </div>
              </div>
            </div>

            {/* Poll Question */}
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-bold block mb-1">السؤال المستهدف بالاستطلاع:</span>
              <p className="text-slate-200 font-medium leading-relaxed">"{activePoll.question}"</p>
            </div>

            {/* Rating Visual Progress Breakdown */}
            <div className="space-y-2 text-xs">
              <span className="text-slate-400 font-bold block">التوزيع اللحظي للتقييمات:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 bg-emerald-950/40 rounded-xl border border-emerald-900/60 text-center">
                  <span className="text-[10px] text-emerald-400 block font-bold">ممتاز (5 نجوم)</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {activePoll.ratingsBreakdown.excellent}
                  </span>
                </div>
                <div className="p-2.5 bg-blue-950/40 rounded-xl border border-blue-900/60 text-center">
                  <span className="text-[10px] text-blue-400 block font-bold">جيد جداً (4 نجوم)</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {activePoll.ratingsBreakdown.good}
                  </span>
                </div>
                <div className="p-2.5 bg-amber-950/40 rounded-xl border border-amber-900/60 text-center">
                  <span className="text-[10px] text-amber-400 block font-bold">متوسط (3 نجوم)</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {activePoll.ratingsBreakdown.average}
                  </span>
                </div>
                <div className="p-2.5 bg-rose-950/40 rounded-xl border border-rose-900/60 text-center">
                  <span className="text-[10px] text-rose-400 block font-bold">يحتاج تحسين</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {activePoll.ratingsBreakdown.poor}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Vote Form */}
          <form
            onSubmit={handleVoteSubmit}
            className="p-5 bg-slate-950 rounded-2xl border border-emerald-900/60 space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h5 className="font-bold font-changa text-emerald-400 flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4" />
                <span>إضافة تقييم ميداني تجريبي أو ملاحظة مواطن</span>
              </h5>
              {voteSubmitted && (
                <span className="text-emerald-400 font-bold flex items-center gap-1 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4" /> تم توثيق صوتك وحساب النسبة تلقائياً!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 font-bold mb-1">اسم المواطن (اختياري):</label>
                <input
                  type="text"
                  value={voterName}
                  onChange={(e) => setVoterName(e.target.value)}
                  placeholder="مثال: أ. محمد العبد"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">القرية / القطاع:</label>
                <select
                  value={voterVillage}
                  onChange={(e) => setVoterVillage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  <option value="مدينة سمنود">مدينة سمنود</option>
                  <option value="قرية محلة زياد">قرية محلة زياد</option>
                  <option value="قرية الراهبين">قرية الراهبين</option>
                  <option value="قرية ميت حبيب">قرية ميت حبيب</option>
                  <option value="قرية أبو صير">قرية أبو صير</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">التقييم الرقمي (1-5 نجوم):</label>
                <div className="flex items-center gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setVoterRating(star)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        voterRating >= star
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                          : 'bg-slate-900 text-slate-600 border-slate-800'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">التعقيب أو الاقتراح المباشر:</label>
              <textarea
                value={voterComment}
                onChange={(e) => setVoterComment(e.target.value)}
                placeholder="اكتب ملاحظاتك عن جودة المبادرة ومقترحات التطوير..."
                rows={2}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>تسجيل الملاحظة وتحديث نتائج التحليل اللحظي</span>
            </button>
          </form>

          {/* Citizen Feed Comments */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-bold font-changa text-slate-300 flex items-center justify-between">
              <span>سجل تعقيبات الأهالي وتغذية الرأي العام ({activePoll.comments.length})</span>
              <span className="text-[10px] text-slate-500">محدث مع كل مشاركة</span>
            </h5>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {activePoll.comments.map((c) => (
                <div
                  key={c.id}
                  className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-amber-300 flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      {c.citizenName} ({c.village})
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <span className="font-mono font-bold">{c.rating}★</span>
                      <span className="text-[10px] text-slate-500">{c.date}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium">"{c.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CREATE POLL MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/40">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold font-changa text-base text-white">
                  إطلاق استبيان رقمي جديد للأمانة
                </h4>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePoll} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">الأمانة النوعية المباشرة:</label>
                <select
                  value={newSecretariat}
                  onChange={(e) => setNewSecretariat(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  <option value="أمانة التدريب والتثقيف">أمانة التدريب والتثقيف</option>
                  <option value="أمانة العمل الجماهيري">أمانة العمل الجماهيري</option>
                  <option value="أمانة الشباب">أمانة الشباب</option>
                  <option value="أمانة المرأة">أمانة المرأة</option>
                  <option value="أمانة الصحة">أمانة الصحة</option>
                  <option value="أمانة التعليم">أمانة التعليم</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">عنوان الاستبيان:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: قياس أثر القافلة الطبية بقرية الراهبين"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">اسم المبادرة المرتبطة:</label>
                <input
                  type="text"
                  value={newInitiative}
                  onChange={(e) => setNewInitiative(e.target.value)}
                  placeholder="مثال: حزمة TRN-02 أو قوافل مستقبل وطن"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">نص سؤال الاستطلاع:</label>
                <textarea
                  required
                  rows={3}
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="اكتب السؤال المباشر الموجه لأهالي القرى..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold shadow-lg"
                >
                  نشر الاستبيان فوراً
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
