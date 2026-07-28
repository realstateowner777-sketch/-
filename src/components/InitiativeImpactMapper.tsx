import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GitCommit,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Award,
  Inbox,
  TrendingUp,
  MapPin,
  Building2,
  Users,
  Filter,
  Zap,
} from 'lucide-react';
import { SAMANOUD_DISTRICTS } from '../data/mockSamanoudData';

export interface ImpactPathway {
  id: string;
  complaintTitle: string;
  complaintId: string;
  district: string;
  submittedDate: string;
  citizenCategory: string;
  resolutionAction: string;
  resolvedDate: string;
  assignedDepartment: string;
  initiativeCreated: string;
  initiativeCategory: string;
  beneficiariesCount: string;
  impactMetrics: string[];
}

const MOCK_PATHWAYS: ImpactPathway[] = [
  {
    id: 'path-1',
    complaintId: 'COMP-2026-089',
    complaintTitle: 'شكوى نقص أطباء الأطفال والأدوية بالوحدة الصحية بمحلة زياد',
    district: 'محلة زياد',
    submittedDate: '10 مايو 2026',
    citizenCategory: 'صحة ورعاية',
    resolutionAction: 'التنسيق السريع مع أمانة الصحة بالحزب وتوفير فريق طبي استشاري عاجل',
    resolvedDate: '12 مايو 2026',
    assignedDepartment: 'أمانة الصحة والسكّان',
    initiativeCreated: 'مبادرة القافلة الطبية الشاملة المجانية الدورية بمحلة زياد',
    initiativeCategory: 'القوافل الطبية',
    beneficiariesCount: '3,450 مواطن',
    impactMetrics: ['صرف الدواء بالمجان 100%', 'تغطية 14 قرية مجاورة', 'استمرار القافلة شهرياً'],
  },
  {
    id: 'path-2',
    complaintId: 'COMP-2026-112',
    complaintTitle: 'ارتفاع أسعار السلع الغذائية الأساسية بميدان البدراوي بسمنود',
    district: 'مدينة سمنود',
    submittedDate: '01 يونيو 2026',
    citizenCategory: 'حماية اجتماعية',
    resolutionAction: 'فتح منافذ بيع مباشرة بالتنسيق مع كبار الموردين برعاية الحزب',
    resolvedDate: '03 يونيو 2026',
    assignedDepartment: 'أمانة التموين والعمل الجماهيري',
    initiativeCreated: 'معرض حزب مستقبل وطن الدائم للسلع المخفضة واللحوم البلدية',
    initiativeCategory: 'معارض السلع',
    beneficiariesCount: '12,000 أسرة',
    impactMetrics: ['خصومات تصل إلى 30%', '4 منافذ متحركة تجوب القرى', 'تأمين المخزون التمويني'],
  },
  {
    id: 'path-3',
    complaintId: 'COMP-2026-145',
    complaintTitle: 'تهالك الملعب الخماسي وعدم وجود أنشطة شبابية بقرية الراهبين',
    district: 'الراهبين',
    submittedDate: '15 يونيو 2026',
    citizenCategory: 'شباب ورياضة',
    resolutionAction: 'تطوير وتجهيز مركز الشباب بالتعاون مع أمانة الشباب بالمركز',
    resolvedDate: '20 يونيو 2026',
    assignedDepartment: 'أمانة الشباب والرياضة',
    initiativeCreated: 'دوري مستقبل وطن الخماسي لشباب القرى — الموسم الخامس',
    initiativeCategory: 'بطولات الشباب',
    beneficiariesCount: '64 فريقاً شبيبة',
    impactMetrics: ['تجهيز 3 ملاعب قروية', 'كؤوس ومكافآت مالية', 'اكتشاف 12 موهبة كروية'],
  },
  {
    id: 'path-4',
    complaintId: 'COMP-2026-178',
    complaintTitle: 'تسريب وتذبذب ضخ المياه بقرية أبو صير والقرى المجاورة',
    district: 'أبو صير',
    submittedDate: '02 يوليو 2026',
    citizenCategory: 'مياه وصرف صحي',
    resolutionAction: 'التدخل الميداني مع شركة المياه وصيانة خط المجهود الرئيسي',
    resolvedDate: '04 يوليو 2026',
    assignedDepartment: 'مكتب خدمة المواطنين والنواب',
    initiativeCreated: 'مبادرة شريان الحياة لمتابعة وصيانة شبكات المرافق بالوحدات المحلية',
    initiativeCategory: 'مبادرات خدمية',
    beneficiariesCount: '18,500 نسمة',
    impactMetrics: ['إنهاء أعطال الشبكات 100%', 'خط ساخن للطوارئ', 'فريق صيانة سريع'],
  },
];

export const InitiativeImpactMapper: React.FC<{ selectedDistrict?: string }> = ({
  selectedDistrict = 'الجميع',
}) => {
  const [districtFilter, setDistrictFilter] = useState<string>(selectedDistrict);
  const [activePathway, setActivePathway] = useState<ImpactPathway>(MOCK_PATHWAYS[0]);

  const filteredPathways = MOCK_PATHWAYS.filter(
    (p) => districtFilter === 'الجميع' || p.district === districtFilter
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bento-card-dark bg-slate-900/95 border border-amber-500/30 p-6 md:p-8 rounded-3xl shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>خريطة تحوّل الأثر — من البلاغ الميداني إلى المبادرة المستدامة</span>
            </div>
            <h2 className="text-xl md:text-3xl font-extrabold font-changa text-white">
              مسار الأثر المؤسسي للشكاوى <span className="text-amber-400">بمركز سمنود</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              ربط مباشر بين كل شكوى حُسمت ميدانياً والمبادرات الحزبية المستدامة التي نتجت عنها لضمان عدم تكرار المشكلة وتوفير التغطية الشاملة للأهالي.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-2xl border border-slate-800 shrink-0">
            <Filter className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-400 font-bold">القطاع:</span>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-slate-900 text-amber-300 font-bold text-xs p-2 rounded-xl border border-amber-500/20 cursor-pointer focus:outline-none"
            >
              <option value="الجميع">كافة القرى والوحدات</option>
              {SAMANOUD_DISTRICTS.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Global Impact Conversion Stat Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 font-medium">إجمالي الشكاوى المحولة لمبادرات:</span>
            <span className="text-amber-400 font-black font-changa text-base">28 مبادرة</span>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 font-medium">معدل تحويل الأثر:</span>
            <span className="text-emerald-400 font-black font-changa text-base">22.4%</span>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 font-medium">المستفيدون التراكميون:</span>
            <span className="text-blue-400 font-black font-changa text-base">148,500+</span>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 font-medium">متوسط زمن الاستجابة:</span>
            <span className="text-amber-300 font-black font-changa text-base">24 ساعة</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Impact Pipeline Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pathway List Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-sm font-bold font-changa text-white flex items-center gap-2 px-1">
            <GitCommit className="w-4 h-4 text-amber-400" />
            <span>اختر مسار أثر لمتابعته:</span>
          </h3>

          <div className="space-y-2.5">
            {filteredPathways.map((path) => {
              const isSelected = activePathway.id === path.id;
              return (
                <button
                  key={path.id}
                  onClick={() => setActivePathway(path)}
                  className={`w-full text-right p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-amber-400 font-bold">{path.complaintId}</span>
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-bold">
                      {path.district}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{path.complaintTitle}</h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      نتجت عنها مبادرة
                    </span>
                    <span className="text-slate-300 font-bold">{path.beneficiariesCount}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Visual Pipeline Flow (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 me-2">
                {activePathway.complaintId}
              </span>
              <span className="text-xs font-extrabold text-white">{activePathway.district}</span>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              تم حسم الشكوى وتحويلها لمبادرة رسمية
            </span>
          </div>

          {/* 3 CONNECTED NODES FLOW */}
          <div className="relative space-y-6 before:absolute before:right-6 before:top-8 before:bottom-8 before:w-1 before:bg-gradient-to-b before:from-blue-600 before:via-amber-500 before:to-emerald-500 pr-12">
            {/* NODE 1: Complaint Submission */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative bg-slate-950/90 border border-blue-500/30 p-4.5 rounded-2xl space-y-2"
            >
              <div className="absolute -right-[3.25rem] top-4 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-blue-600/40 border-2 border-slate-900">
                1
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-400 font-extrabold flex items-center gap-1.5">
                  <Inbox className="w-4 h-4" />
                  المرحلة الأولى: استقبال بلاغ المواطن
                </span>
                <span className="text-slate-400 font-mono">{activePathway.submittedDate}</span>
              </div>
              <h4 className="text-sm font-extrabold font-changa text-white">{activePathway.complaintTitle}</h4>
              <p className="text-xs text-slate-300">
                تصنيف البلاغ: <strong className="text-blue-300">{activePathway.citizenCategory}</strong> — قطاع:{' '}
                <strong className="text-amber-300">{activePathway.district}</strong>
              </p>
            </motion.div>

            {/* NODE 2: Immediate Response & Action */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="relative bg-slate-950/90 border border-amber-500/30 p-4.5 rounded-2xl space-y-2"
            >
              <div className="absolute -right-[3.25rem] top-4 w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-lg shadow-amber-500/40 border-2 border-slate-900">
                2
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-extrabold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  المرحلة الثانية: الاستجابة الميدانية والحسم
                </span>
                <span className="text-slate-400 font-mono">{activePathway.resolvedDate}</span>
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                "{activePathway.resolutionAction}"
              </p>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-indigo-400 font-bold">
                  <Building2 className="w-3.5 h-3.5" />
                  المسؤول: {activePathway.assignedDepartment}
                </span>
              </div>
            </motion.div>

            {/* NODE 3: Institutional Sustainable Initiative */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative bg-slate-950/90 border border-emerald-500/40 p-4.5 rounded-2xl space-y-3 bento-glow-emerald"
            >
              <div className="absolute -right-[3.25rem] top-4 w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-lg shadow-emerald-500/40 border-2 border-slate-900">
                3
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-extrabold flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  المرحلة الثالثة: إطلاق المبادرة القومية المستدامة
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/40">
                  مبادرة قائمة
                </span>
              </div>

              <h3 className="text-base font-black font-changa text-amber-300">
                {activePathway.initiativeCreated}
              </h3>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-t border-slate-800 pt-2.5">
                <span className="text-slate-300">
                  المستفيدون المستهدفون: <strong className="text-amber-400 font-bold">{activePathway.beneficiariesCount}</strong>
                </span>
                <span className="bg-slate-900 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800">
                  التصنيف: {activePathway.initiativeCategory}
                </span>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-400 block">مؤشرات الأثر الاجتماعي المستدام:</span>
                <div className="flex flex-wrap gap-2">
                  {activePathway.impactMetrics.map((m, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-950 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
