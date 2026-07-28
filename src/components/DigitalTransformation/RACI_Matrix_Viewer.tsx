import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  Users,
  Search,
  Filter,
  Save,
  RefreshCw,
  Sparkles,
  Info,
  ChevronDown,
  Layers,
  Award,
} from 'lucide-react';

export interface RACITask {
  id: string;
  category: string;
  title: string;
  description: string;
  responsible: string; // R
  accountable: string; // A
  consulted: string; // C
  informed: string; // I
  status: 'مكتملة' | 'قيد التنفيذ' | 'بانتظار الاعتماد' | 'معلقة' | 'متأخرة';
  completionRate: number;
  lastUpdated: string;
  responsibleLevel: 'قيادي ميداني' | 'كادر تنفيذي متخصص' | 'عضو مشارك';
}

const INITIAL_RACI_TASKS: RACITask[] = [
  {
    id: 'RACI-001',
    category: 'إدارة البلاغات والشكاوى',
    title: 'استقبال وتوثيق البلاغات والمقترحات الجماهيرية',
    description: 'تسجيل طلبات المواطنين عبر البوابة الرقمية ومراجعة الاستيفاء المبدئي.',
    responsible: 'مسؤول المتابعة بالوحدة المحلية',
    accountable: 'أمين العمل الجماهيري بالمركز',
    consulted: 'أمين الأمانة النوعية المختصة',
    informed: 'أمين المركز ومكتب النواب',
    status: 'مكتملة',
    completionRate: 100,
    lastUpdated: '2026-07-27',
    responsibleLevel: 'عضو مشارك',
  },
  {
    id: 'RACI-002',
    category: 'إدارة البلاغات والشكاوى',
    title: 'تصنيف البلاغات بالذكاء الاصطناعي وتعيين درجة الأولويات',
    description: 'معالجة النصوص وتوليد التوصيات وآليات التدخل الميداني.',
    responsible: 'محرك Anubis AI + كادر تكنولوجيا المعلومات',
    accountable: 'أمين التنظيم بالمركز',
    consulted: 'رئيس لجنة الشكاوى',
    informed: 'أمانة المتابعة المركزية',
    status: 'مكتملة',
    completionRate: 100,
    lastUpdated: '2026-07-27',
    responsibleLevel: 'كادر تنفيذي متخصص',
  },
  {
    id: 'RACI-003',
    category: 'حوكمة الكوادر وبنك المواهب',
    title: 'التشفير المهاري والربط مع بنك الكوادر (Talent Bank Governance)',
    description: 'تسكين الـ 174 كادراً بسمنود وقراها وفق المستويات الثلاثة والتخصص المباشر.',
    responsible: 'أمين التدريب والتثقيف بالمركز',
    accountable: 'أمين تنظيم المركز (قيادي ميداني)',
    consulted: 'الأمناء النوعيون',
    informed: 'أمانة التدريب والتثقيف المركزية',
    status: 'قيد التنفيذ',
    completionRate: 85,
    lastUpdated: '2026-07-27',
    responsibleLevel: 'كادر تنفيذي متخصص',
  },
  {
    id: 'RACI-004',
    category: 'البرامج التدريبية الميكنة',
    title: 'إطلاق وتوثيق الحزمة التدريبية (TRN-01 إلى TRN-05)',
    description: 'تنفيذ ورش التثقيف السياسي والتواصل الرقمي، وتتبع الحضور والاختبارات مباشرة.',
    responsible: 'فريق مدربي أمانة التدريب بسمنود',
    accountable: 'أمين التدريب والتثقيف بالمركز',
    consulted: 'أمانة الشباب والإعلام',
    informed: 'أمين المركز والهيئة البرلمانية',
    status: 'قيد التنفيذ',
    completionRate: 70,
    lastUpdated: '2026-07-27',
    responsibleLevel: 'كادر تنفيذي متخصص',
  },
  {
    id: 'RACI-005',
    category: 'التدخل الميداني والمبادرات',
    title: 'اعتماد وتنفيذ المبادرات المجتمعية بقرى سمنود الرئيسية',
    description: 'التنسيق مع الجهات الحكومية والتنفيذية لتلبية احتياجات القرى الأربع.',
    responsible: 'أمناء الوحدات المحلية بالقرى',
    accountable: 'أمين المركز (قيادي ميداني)',
    consulted: 'أمناء الصحة والتعليم والخدمات',
    informed: 'الهيئة المكتبية للمحافظة',
    status: 'قيد التنفيذ',
    completionRate: 60,
    lastUpdated: '2026-07-27',
    responsibleLevel: 'قيادي ميداني',
  },
  {
    id: 'RACI-006',
    category: 'رقابة الجودة والتدقيق',
    title: 'الجولات الرقابية العشوائية (10%) عبر WorkflowEnforcer',
    description: 'مطابقة الشكاوى المغلقة والتأكد من توثيق سبب الإغلاق والربط المهاري بدقة.',
    responsible: 'فريق الجودة بأمانة المتابعة',
    accountable: 'أمين المتابعة وتقييم الأداء',
    consulted: 'أمين التنظيم',
    informed: 'قيادة المركز والمجلس التنفيذي',
    status: 'بانتظار الاعتماد',
    completionRate: 40,
    lastUpdated: '2026-07-27',
    responsibleLevel: 'كادر تنفيذي متخصص',
  },
  {
    id: 'RACI-007',
    category: 'القياس والتقارير التنفيذية',
    title: 'استخراج تقرير قياس الأثر التجميعي (Quarterly Impact Benchmark)',
    description: 'تجميع مؤشرات أداء الـ 12 أسبوعاً ورفع التقرير القياسي الموحد للأمانة المركزية.',
    responsible: 'وحدة تحليل البيانات والذكاء الاصطناعي',
    accountable: 'أمين المركز',
    consulted: 'جميع أمناء الأمانات النوعية',
    informed: 'الأمانة المركزية لحزب مستقبل وطن',
    status: 'معلقة',
    completionRate: 20,
    lastUpdated: '2026-07-27',
    responsibleLevel: 'قيادي ميداني',
  },
];

export const RACI_Matrix_Viewer: React.FC = () => {
  const [tasks, setTasks] = useState<RACITask[]>(() => {
    const saved = localStorage.getItem('samanoud_raci_matrix_status');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_RACI_TASKS;
      }
    }
    return INITIAL_RACI_TASKS;
  });

  const [selectedTask, setSelectedTask] = useState<RACITask | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('الجميع');
  const [filterLevel, setFilterLevel] = useState<string>('الجميع');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem('samanoud_raci_matrix_status', JSON.stringify(tasks));
  }, [tasks]);

  const categories = ['الجميع', ...Array.from(new Set(INITIAL_RACI_TASKS.map((t) => t.category)))];

  const filteredTasks = tasks.filter((t) => {
    const matchSearch =
      t.title.includes(searchQuery) ||
      t.description.includes(searchQuery) ||
      t.responsible.includes(searchQuery);
    const matchCategory = filterCategory === 'الجميع' || t.category === filterCategory;
    const matchLevel = filterLevel === 'الجميع' || t.responsibleLevel === filterLevel;

    return matchSearch && matchCategory && matchLevel;
  });

  const handleUpdateStatus = (
    taskId: string,
    newStatus: RACITask['status'],
    newRate?: number
  ) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const rate =
            newRate !== undefined
              ? newRate
              : newStatus === 'مكتملة'
              ? 100
              : newStatus === 'قيد التنفيذ'
              ? 65
              : newStatus === 'بانتظار الاعتماد'
              ? 40
              : 10;
          return {
            ...t,
            status: newStatus,
            completionRate: rate,
            lastUpdated: new Date().toISOString().split('T')[0],
          };
        }
        return t;
      })
    );

    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) =>
        prev
          ? {
              ...prev,
              status: newStatus,
              completionRate:
                newRate !== undefined
                  ? newRate
                  : newStatus === 'مكتملة'
                  ? 100
                  : 65,
              lastUpdated: new Date().toISOString().split('T')[0],
            }
          : null
      );
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const getStatusBadge = (status: RACITask['status']) => {
    switch (status) {
      case 'مكتملة':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 w-fit">
            <CheckCircle2 className="w-3.5 h-3.5" /> مكتملة 100%
          </span>
        );
      case 'قيد التنفيذ':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 w-fit">
            <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} /> قيد التنفيذ
          </span>
        );
      case 'بانتظار الاعتماد':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1 w-fit">
            <ShieldCheck className="w-3.5 h-3.5" /> بانتظار الاعتماد
          </span>
        );
      case 'متأخرة':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1 w-fit">
            <AlertCircle className="w-3.5 h-3.5" /> متأخرة عن الموعد
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700 w-fit">
            معلقة / مرحلية
          </span>
        );
    }
  };

  const getLevelBadge = (level: RACITask['responsibleLevel']) => {
    switch (level) {
      case 'قيادي ميداني':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-900/60 text-purple-300 border border-purple-700">Level 1 — قيادي ميداني</span>;
      case 'كادر تنفيذي متخصص':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-900/60 text-blue-300 border border-blue-700">Level 2 — كادر متخصص</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">Level 3 — عضو مشارك</span>;
    }
  };

  const totalCompleted = tasks.filter((t) => t.status === 'مكتملة').length;
  const overallProgress = Math.round(
    tasks.reduce((sum, t) => sum + t.completionRate, 0) / tasks.length
  );

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-2 border border-blue-500/40">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>نموذج التشغيل المؤسسي — Chapter 7 RACI Governance</span>
          </div>
          <h3 className="text-xl font-bold font-changa text-white flex items-center gap-2">
            مصفوفة توزيع المسؤوليات والصلاحيات المؤسسية (RACI Matrix)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            ربط أدوار القيادة الميدانية، والكوادر التنفيذية المتخصصة، والأعضاء المشاركين عبر مستويات الحوكمة الثلاثة
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 shrink-0">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block font-medium">نسبة الجاهزية التشغيلية</span>
            <span className="text-2xl font-black font-changa text-amber-400">{overallProgress}%</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono">
            {totalCompleted}/{tasks.length}
          </div>
        </div>
      </div>

      {/* Legend & RACI Key */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-slate-950/80 rounded-2xl border border-emerald-900/40 space-y-0.5">
          <div className="font-extrabold text-emerald-400 flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-xs border border-emerald-500/40">R</span>
            Responsible (مسؤول)
          </div>
          <p className="text-[11px] text-slate-400">الطرف المكلف بالمنفذ المباشر للمهمة.</p>
        </div>
        <div className="p-3 bg-slate-950/80 rounded-2xl border border-amber-900/40 space-y-0.5">
          <div className="font-extrabold text-amber-400 flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono text-xs border border-amber-500/40">A</span>
            Accountable (المعتمد)
          </div>
          <p className="text-[11px] text-slate-400">المسؤول النهائي وصاحب قرار الاعتماد.</p>
        </div>
        <div className="p-3 bg-slate-950/80 rounded-2xl border border-blue-900/40 space-y-0.5">
          <div className="font-extrabold text-blue-400 flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-mono text-xs border border-blue-500/40">C</span>
            Consulted (مستشار)
          </div>
          <p className="text-[11px] text-slate-400">تُطلب استشارته الفنية قبل القرار.</p>
        </div>
        <div className="p-3 bg-slate-950/80 rounded-2xl border border-purple-900/40 space-y-0.5">
          <div className="font-extrabold text-purple-400 flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-mono text-xs border border-purple-500/40">I</span>
            Informed (مطلع)
          </div>
          <p className="text-[11px] text-slate-400">يُحاط بالنتائج ومستجدات المتابعة.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute right-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث في المهام، الأدوار، أو المسؤوليات..."
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl pr-10 pl-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                مجال: {c}
              </option>
            ))}
          </select>

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
          >
            <option value="الجميع">جميع مستويات الحوكمة</option>
            <option value="قيادي ميداني">قيادي ميداني</option>
            <option value="كادر تنفيذي متخصص">كادر تنفيذي متخصص</option>
            <option value="عضو مشارك">عضو مشارك</option>
          </select>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto border border-slate-800 rounded-2xl">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-300 font-bold">
              <th className="p-3.5">الكود والنشاط التشغيلي</th>
              <th className="p-3.5">مستوى الحوكمة</th>
              <th className="p-3.5 text-center text-emerald-400 font-mono">Responsible (R)</th>
              <th className="p-3.5 text-center text-amber-400 font-mono">Accountable (A)</th>
              <th className="p-3.5 text-center text-blue-400 font-mono">Consulted (C)</th>
              <th className="p-3.5 text-center text-purple-400 font-mono">Informed (I)</th>
              <th className="p-3.5 text-center">الحالة الإنجازية</th>
              <th className="p-3.5 text-center">التحديث</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 bg-slate-900/40">
            {filteredTasks.map((t) => (
              <tr
                key={t.id}
                onClick={() => setSelectedTask(t)}
                className={`hover:bg-slate-800/50 transition-colors cursor-pointer ${
                  selectedTask?.id === t.id ? 'bg-blue-950/40 border-r-4 border-r-blue-500' : ''
                }`}
              >
                <td className="p-3.5 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 text-[11px]">{t.id}</span>
                    <span className="font-bold text-slate-100">{t.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{t.description}</p>
                </td>

                <td className="p-3.5">{getLevelBadge(t.responsibleLevel)}</td>

                <td className="p-3.5 text-center font-medium text-emerald-300 text-[11px] bg-emerald-950/10">
                  {t.responsible}
                </td>

                <td className="p-3.5 text-center font-medium text-amber-300 text-[11px] bg-amber-950/10">
                  {t.accountable}
                </td>

                <td className="p-3.5 text-center font-medium text-blue-300 text-[11px]">
                  {t.consulted}
                </td>

                <td className="p-3.5 text-center font-medium text-purple-300 text-[11px]">
                  {t.informed}
                </td>

                <td className="p-3.5 text-center">{getStatusBadge(t.status)}</td>

                <td className="p-3.5 text-center">
                  <select
                    value={t.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleUpdateStatus(t.id, e.target.value as RACITask['status'])
                    }
                    className="bg-slate-950 border border-slate-700 rounded-xl px-2 py-1 text-[11px] text-slate-200 focus:outline-none"
                  >
                    <option value="مكتملة">مكتملة (100%)</option>
                    <option value="قيد التنفيذ">قيد التنفيذ</option>
                    <option value="بانتظار الاعتماد">بانتظار الاعتماد</option>
                    <option value="متأخرة">متأخرة</option>
                    <option value="معلقة">معلقة</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Task Interactive Control Card */}
      {selectedTask && (
        <div className="p-5 bg-slate-950 rounded-2xl border border-blue-900/60 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-900/60 text-blue-300">
                {selectedTask.id}
              </span>
              <h4 className="font-bold font-changa text-amber-300">{selectedTask.title}</h4>
            </div>
            <span className="text-xs text-slate-400">
              آخر تحديث: {selectedTask.lastUpdated}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{selectedTask.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-900 rounded-xl border border-emerald-900/50 space-y-1">
              <span className="text-[10px] text-emerald-400 font-bold block">مسؤول التنفيذ المباشر (R):</span>
              <span className="font-bold text-slate-200">{selectedTask.responsible}</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-amber-900/50 space-y-1">
              <span className="text-[10px] text-amber-400 font-bold block">المعتماد والحاسب (A):</span>
              <span className="font-bold text-slate-200">{selectedTask.accountable}</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-blue-900/50 space-y-1">
              <span className="text-[10px] text-blue-400 font-bold block">المستشار الفني (C):</span>
              <span className="font-bold text-slate-200">{selectedTask.consulted}</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-purple-900/50 space-y-1">
              <span className="text-[10px] text-purple-400 font-bold block">المطلع بالمستجدات (I):</span>
              <span className="font-bold text-slate-200">{selectedTask.informed}</span>
            </div>
          </div>

          {/* Quick Progress Range Adjuster */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-slate-400 font-medium">نسبة الإنجاز الميداني:</span>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={selectedTask.completionRate}
                onChange={(e) =>
                  handleUpdateStatus(
                    selectedTask.id,
                    selectedTask.status,
                    parseInt(e.target.value)
                  )
                }
                className="w-36 accent-amber-400"
              />
              <span className="font-mono font-bold text-amber-400">{selectedTask.completionRate}%</span>
            </div>

            {isSaved && (
              <span className="text-emerald-400 font-bold flex items-center gap-1 text-xs animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" /> تم توثيق تحديث الحالة بسجل التشغيل الرقمي
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
