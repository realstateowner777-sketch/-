import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Award,
  Users,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  MapPin,
  Stethoscope,
  Briefcase,
  Video,
  Scale,
  Cpu,
  HeartHandshake,
  UserPlus,
  Send,
  Filter,
} from 'lucide-react';
import { SAMANOUD_DISTRICTS } from '../data/mockSamanoudData';

export interface CompetencyLevel {
  levelId: string;
  title: string;
  subtitle: string;
  minHours: number;
  responsibilities: string[];
  badgeColor: string;
  badgeBg: string;
  countInSamanoud: number;
}

export const COMPETENCY_LEVELS: CompetencyLevel[] = [
  {
    levelId: 'level-1',
    title: 'المستوى الأول: قيادي ميداني وخبير أزمات',
    subtitle: 'إدارة الفعاليات الكبرى، التنسيق مع النواب والأجهزة التنفيذية',
    minHours: 120,
    responsibilities: [
      'قيادة فرق المتطوعين في القوافل والمعارض',
      'إدارة أزمات الشكاوى العاجلة والتواصل الحكومي',
      'تدريب وتقييم الأعضاء الجدد ببنك المواهب',
    ],
    badgeColor: 'text-amber-400 border-amber-500/50',
    badgeBg: 'bg-amber-500/20',
    countInSamanoud: 18,
  },
  {
    levelId: 'level-2',
    title: 'المستوى الثاني: كادر تنفيذي متخصص',
    subtitle: 'أطباء، استشاريون قانونيون، مصممو إعلام، مهندسو تقنية',
    minHours: 50,
    responsibilities: [
      'توقيع الكشف الطبي في القوافل المجانية',
      'إعداد مسودات الردود والمذكرات القانونية والخطابات',
      'صناعة الفيديوهات والتصاميم الترويجية للمبادرات',
    ],
    badgeColor: 'text-blue-400 border-blue-500/50',
    badgeBg: 'bg-blue-500/20',
    countInSamanoud: 42,
  },
  {
    levelId: 'level-3',
    title: 'المستوى الثالث: عضو مشارك وميداني',
    subtitle: 'التنظيم الميداني، استقبال المواطنين، توزيع المساعدات',
    minHours: 10,
    responsibilities: [
      'تنظيم طوابير المواطنين بمقرات خدمة الأهالي',
      'المساعدة في توزيع المواد التموينية بالمنافذ',
      'تجميع استبيانات رضا الشارع والقرى',
    ],
    badgeColor: 'text-emerald-400 border-emerald-500/50',
    badgeBg: 'bg-emerald-500/20',
    countInSamanoud: 114,
  },
];

export interface DistrictSkillsData {
  districtName: string;
  medical: number; // طبي وصحي
  events: number; // تنظيم وإدارة
  media: number; // إعلام وصناعة محتوى
  legal: number; // استشارات قانونية
  tech: number; // تكنولوجيا ومعلومات
  community: number; // عمل ميداني وتكافل
  shortageFlag: boolean;
  shortageSkill?: string;
}

const DISTRICT_SKILLS_MATRIX: DistrictSkillsData[] = [
  {
    districtName: 'مدينة سمنود',
    medical: 12,
    events: 18,
    media: 14,
    legal: 8,
    tech: 10,
    community: 25,
    shortageFlag: false,
  },
  {
    districtName: 'الراهبين',
    medical: 4,
    events: 8,
    media: 3,
    legal: 2,
    tech: 4,
    community: 12,
    shortageFlag: true,
    shortageSkill: 'استشارات قانونية (نقص كادر قانوني)',
  },
  {
    districtName: 'ميت حبيب',
    medical: 5,
    events: 9,
    media: 2,
    legal: 3,
    tech: 3,
    community: 15,
    shortageFlag: true,
    shortageSkill: 'إعلام وصناعة محتوى (نقص كوادر إعلامية)',
  },
  {
    districtName: 'محلة زياد',
    medical: 8,
    events: 12,
    media: 5,
    legal: 4,
    tech: 6,
    community: 20,
    shortageFlag: false,
  },
  {
    districtName: 'أبو صير',
    medical: 3,
    events: 6,
    media: 2,
    legal: 1,
    tech: 2,
    community: 10,
    shortageFlag: true,
    shortageSkill: 'طبي وصحي (نقص أطباء أطفال وباطنة)',
  },
  {
    districtName: 'بشتيل',
    medical: 2,
    events: 5,
    media: 1,
    legal: 2,
    tech: 2,
    community: 8,
    shortageFlag: true,
    shortageSkill: 'طبي وإعلامي (حاجة لدعم عاجل)',
  },
  {
    districtName: 'طليمة',
    medical: 4,
    events: 6,
    media: 3,
    legal: 2,
    tech: 3,
    community: 9,
    shortageFlag: false,
  },
  {
    districtName: 'بنا أبوصير',
    medical: 3,
    events: 7,
    media: 2,
    legal: 1,
    tech: 2,
    community: 11,
    shortageFlag: true,
    shortageSkill: 'استشارات قانونية وتكنولوجيا',
  },
];

export const TalentBankGovernance: React.FC<{ selectedDistrict?: string }> = ({
  selectedDistrict = 'الجميع',
}) => {
  const [districtFilter, setDistrictFilter] = useState<string>(selectedDistrict);
  const [activeTab, setActiveTab] = useState<'matrix' | 'framework'>('matrix');
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const filteredMatrix = DISTRICT_SKILLS_MATRIX.filter(
    (d) => districtFilter === 'الجميع' || d.districtName === districtFilter
  );

  return (
    <div className="space-y-6">
      {/* Notification Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-bold animate-bounce bento-glow-emerald">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Governance Banner Header */}
      <div className="bento-card-dark bg-slate-900/95 border border-amber-500/30 p-6 md:p-8 rounded-3xl shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>حوكمة بنك المواهب وإعادة الهيكلة — أمانة مركز سمنود</span>
            </div>
            <h2 className="text-xl md:text-3xl font-extrabold font-changa text-white">
              نظام تصنيف الكفاءات ومصفوفة <span className="text-amber-400">المهارات القروية</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              إعادة توزيع الكوادر الحزبية بذكاء، رصد المناطق التي تعاني من نقص الكفاءات، وتطبيق معايير التدرج القيادي وفق الساعات الميدانية المنجزة.
            </p>
          </div>

          {/* Sub Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              مصفوفة المهارات بالقرى 📊
            </button>
            <button
              onClick={() => setActiveTab('framework')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'framework'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              تصنيف الكفاءات 🎖️
            </button>
          </div>
        </div>

        {/* Global Talent Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 font-medium">إجمالي الكوادر المسجلة:</span>
            <span className="text-amber-400 font-black font-changa text-base">174 كادراً</span>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 font-medium">القيادات الميدانية:</span>
            <span className="text-emerald-400 font-black font-changa text-base">18 خبيراً</span>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 font-medium">مناطق بحاجة لدعم عاجل:</span>
            <span className="text-red-400 font-black font-changa text-base">5 وحدات</span>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400 font-medium">نسبة الجاهزية للتكليف:</span>
            <span className="text-blue-400 font-black font-changa text-base">88.5%</span>
          </div>
        </div>
      </div>

      {/* VIEW 1: SKILLS MATRIX GRID */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-changa text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>توزيع المهارات والتخصصات حسب القرى والوحدات المحلية:</span>
            </h3>

            <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="bg-slate-900 text-amber-300 font-bold text-xs p-1.5 rounded-lg border border-amber-500/20 cursor-pointer focus:outline-none"
              >
                <option value="الجميع">كافة القطاعات</option>
                {SAMANOUD_DISTRICTS.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs text-slate-200">
                <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-4">الوحدة / القرية</th>
                    <th className="p-4">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Stethoscope className="w-3.5 h-3.5" /> طبي وصحي
                      </span>
                    </th>
                    <th className="p-4">
                      <span className="flex items-center gap-1 text-blue-400">
                        <Briefcase className="w-3.5 h-3.5" /> تنظيم وإدارة
                      </span>
                    </th>
                    <th className="p-4">
                      <span className="flex items-center gap-1 text-purple-400">
                        <Video className="w-3.5 h-3.5" /> إعلام ومحتوى
                      </span>
                    </th>
                    <th className="p-4">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Scale className="w-3.5 h-3.5" /> استشارات قانونية
                      </span>
                    </th>
                    <th className="p-4">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Cpu className="w-3.5 h-3.5" /> تقنية وبرمجة
                      </span>
                    </th>
                    <th className="p-4">
                      <span className="flex items-center gap-1 text-rose-400">
                        <HeartHandshake className="w-3.5 h-3.5" /> عمل تكافلي
                      </span>
                    </th>
                    <th className="p-4">حالة العجز / التكليف</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredMatrix.map((row) => (
                    <tr key={row.districtName} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-bold text-white font-changa flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        {row.districtName}
                      </td>
                      <td className="p-4 font-mono font-bold text-slate-200">{row.medical} كادر</td>
                      <td className="p-4 font-mono font-bold text-slate-200">{row.events} كادر</td>
                      <td className="p-4 font-mono font-bold text-slate-200">{row.media} كادر</td>
                      <td className="p-4 font-mono font-bold text-slate-200">{row.legal} كادر</td>
                      <td className="p-4 font-mono font-bold text-slate-200">{row.tech} كادر</td>
                      <td className="p-4 font-mono font-bold text-slate-200">{row.community} كادر</td>
                      <td className="p-4">
                        {row.shortageFlag ? (
                          <div className="flex items-center gap-2">
                            <span className="bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/40 text-[11px] font-bold flex items-center gap-1 shrink-0">
                              <AlertTriangle className="w-3 h-3 text-amber-400" />
                              {row.shortageSkill}
                            </span>
                            <button
                              onClick={() =>
                                triggerToast(`تم إرسال طلب تكليف كادر تعويضي إلى ${row.districtName} بنجاح! 🚀`)
                              }
                              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-2.5 py-1 rounded-lg font-black text-[10px] cursor-pointer transition-colors shadow-sm"
                            >
                              إرسال دعم
                            </button>
                          </div>
                        ) : (
                          <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" />
                            مكتمل الكوادر
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: COMPETENCY FRAMEWORK */}
      {activeTab === 'framework' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold font-changa text-white flex items-center gap-2 px-1">
            <Award className="w-4 h-4 text-amber-400" />
            <span>إطار تصنيف الكفاءات والتدرج القيادي بالمركز:</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPETENCY_LEVELS.map((lvl) => (
              <motion.div
                key={lvl.levelId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between hover:border-amber-500/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-black border ${lvl.badgeBg} ${lvl.badgeColor}`}>
                      {lvl.countInSamanoud} كادر بمركز سمنود
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono font-bold">
                      حد أدنى {lvl.minHours} ساعة تطوع
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold font-changa text-white">{lvl.title}</h4>
                  <p className="text-xs text-amber-300 font-medium leading-relaxed">{lvl.subtitle}</p>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 block">المسؤوليات الرئيسية:</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {lvl.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => triggerToast(`تم فتح سجل ترقية الكوادر لـ ${lvl.title}`)}
                  className="w-full mt-4 py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4 text-amber-400" />
                  <span>ترقية أعضاء لهذا المستوى</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
