import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Users,
  MapPin,
  CheckCircle2,
  Send,
  Sparkles,
  Calendar,
  Building2,
  Clock,
  UserCheck,
  Plus,
} from 'lucide-react';
import { SAMANOUD_DISTRICTS } from '../data/mockSamanoudData';

export interface VillageOperation {
  id: string;
  villageName: string;
  hamletName: string; // النجع أو العزبة
  initiativeTitle: string;
  category: string;
  targetDate: string;
  enrolledVolunteers: number;
  requiredVolunteers: number;
  status: 'جارية الآن' | 'قادمة خلال أسبوع' | 'مكتملة الإعداد';
  leadCoordinator: string;
  contactPhone: string;
}

const INITIAL_VILLAGE_OPERATIONS: VillageOperation[] = [
  {
    id: 'op-101',
    villageName: 'قرية محلة زياد',
    hamletName: 'عزبة الشريف وعزبة عبد المجيد',
    initiativeTitle: 'القافلة الطبية الشاملة وعيادات العظام والأطفال',
    category: 'صحة ورعاية',
    targetDate: '29 يوليو 2026',
    enrolledVolunteers: 6,
    requiredVolunteers: 14, // Shortage alert! (42%)
    status: 'جارية الآن',
    leadCoordinator: 'د. أحمد عبد الوهاب',
    contactPhone: '01012349988',
  },
  {
    id: 'op-102',
    villageName: 'قرية الراهبين',
    hamletName: 'المركز الاجتماعي وعزبة العرب',
    initiativeTitle: 'منفذ بيع اللحوم والسلع المخفضة التمويني',
    category: 'حماية اجتماعية',
    targetDate: '30 يوليو 2026',
    enrolledVolunteers: 10,
    requiredVolunteers: 12, // OK (83%)
    status: 'جارية الآن',
    leadCoordinator: 'أ. محمود أبو جبل',
    contactPhone: '01222233445',
  },
  {
    id: 'op-103',
    villageName: 'قرية أبو صير',
    hamletName: 'نجع كفر البدراوي',
    initiativeTitle: 'حملة تشجير وتجميل مدخل القرية والإنارة العامة',
    category: 'مبادرات خدمية',
    targetDate: '01 أغسطس 2026',
    enrolledVolunteers: 4,
    requiredVolunteers: 10, // Shortage alert! (40%)
    status: 'قادمة خلال أسبوع',
    leadCoordinator: 'م. إبراهيم نصر',
    contactPhone: '01099887766',
  },
  {
    id: 'op-104',
    villageName: 'قرية ميت حبيب',
    hamletName: 'عزبة التحرير',
    initiativeTitle: 'لقاء الاستماع لخدمة المواطنين بحضور أمانة المركز',
    category: 'خدمات النواب',
    targetDate: '02 أغسطس 2026',
    enrolledVolunteers: 8,
    requiredVolunteers: 8, // Full capacity (100%)
    status: 'مكتملة الإعداد',
    leadCoordinator: 'أ. سعيد عبد العال',
    contactPhone: '01144556677',
  },
  {
    id: 'op-105',
    villageName: 'قرية بشتيل',
    hamletName: 'عزبة السلام',
    initiativeTitle: 'توزيع مستلزمات الأسر الأكثر احتياجاً والقوافل التكافلية',
    category: 'حماية اجتماعية',
    targetDate: '04 أغسطس 2026',
    enrolledVolunteers: 3,
    requiredVolunteers: 9, // Shortage alert! (33%)
    status: 'قادمة خلال أسبوع',
    leadCoordinator: 'الأستاذة مريم الغندور',
    contactPhone: '01055443322',
  },
];

export const FieldOperationTracker: React.FC<{ selectedDistrict?: string }> = ({
  selectedDistrict = 'الجميع',
}) => {
  const [operations, setOperations] = useState<VillageOperation[]>(INITIAL_VILLAGE_OPERATIONS);
  const [districtFilter, setDistrictFilter] = useState<string>(selectedDistrict);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleDispatchSupport = (opId: string) => {
    setOperations((prev) =>
      prev.map((op) => {
        if (op.id === opId) {
          const added = Math.min(op.requiredVolunteers - op.enrolledVolunteers, 4);
          return { ...op, enrolledVolunteers: op.enrolledVolunteers + added };
        }
        return op;
      })
    );
    triggerToast('تم توجيه 4 متطوعين من بنك المواهب لدعم المبادرة القروية فوراً! 🚨');
  };

  const filteredOps = operations.filter(
    (op) => districtFilter === 'الجميع' || op.villageName.includes(districtFilter)
  );

  const totalShortageCount = operations.filter(
    (op) => op.enrolledVolunteers / op.requiredVolunteers < 0.7
  ).length;

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl bento-card-dark">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-bold animate-bounce bento-glow-emerald">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2 border border-amber-500/40">
            <Activity className="w-4 h-4 text-amber-400" />
            <span>المتابعة التشغيلية الميدانية — القرى والنجوع بمركز سمنود</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold font-changa text-white">
            تتبع المبادرات القومية القائمة ونظام <span className="text-amber-400">تنبيه النقص</span>
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm">
            رصد توزيع الكوادر والمتطوعين الميدانيين بالنجوع والعزب لضمان الجاهزية التشغيلية الكاملة للفعاليات.
          </p>
        </div>

        {/* Shortage Counter Badge + District Selector */}
        <div className="flex flex-wrap items-center gap-3">
          {totalShortageCount > 0 && (
            <div className="bg-red-500/20 text-red-300 border border-red-500/40 px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>تنبيه: {totalShortageCount} مبادرات تعاني نقص كوادر!</span>
            </div>
          )}

          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs">
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-slate-900 text-amber-300 font-bold p-1.5 rounded-lg border border-amber-500/20 cursor-pointer focus:outline-none"
            >
              <option value="الجميع">كافة القرى والنجوع</option>
              {SAMANOUD_DISTRICTS.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOps.map((op) => {
          const fillRatio = op.enrolledVolunteers / op.requiredVolunteers;
          const isShortage = fillRatio < 0.7;

          return (
            <motion.div
              key={op.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                isShortage
                  ? 'bg-slate-950/90 border-red-500/50 shadow-lg shadow-red-500/5'
                  : 'bg-slate-950/80 border-slate-800 hover:border-amber-500/40'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-amber-400 font-changa flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {op.villageName} <span className="text-slate-400 font-sans">({op.hamletName})</span>
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      op.status === 'جارية الآن'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    }`}
                  >
                    {op.status}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-white">{op.initiativeTitle}</h4>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {op.targetDate}
                  </span>
                  <span className="text-indigo-400 font-bold">منسق الموقع: {op.leadCoordinator}</span>
                </div>

                {/* Volunteer Capacity Bar */}
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      جاهزية المتطوعين الميدانيين:
                    </span>
                    <span className={isShortage ? 'text-red-400 font-black' : 'text-emerald-400 font-black'}>
                      {op.enrolledVolunteers} / {op.requiredVolunteers} كادر ({Math.round(fillRatio * 100)}%)
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isShortage ? 'bg-gradient-to-r from-red-600 to-amber-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      }`}
                      style={{ width: `${Math.min(fillRatio * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                {isShortage ? (
                  <button
                    onClick={() => handleDispatchSupport(op.id)}
                    className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded-xl font-extrabold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>تأمين النقص: إرسال كوادر من بنك المواهب (عاجل)</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between w-full text-emerald-400 font-bold text-[11px]">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      القوة البشرية مكتملة ومؤمنة
                    </span>
                    <span className="text-slate-400 font-normal">جاهزة للتنفيذ</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
