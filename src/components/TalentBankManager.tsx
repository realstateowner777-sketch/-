import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  Plus,
  Briefcase,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  Award,
  X,
  Send,
  UserCheck,
} from 'lucide-react';
import { INITIAL_TALENT_VOLUNTEERS, SAMANOUD_DISTRICTS } from '../data/mockSamanoudData';
import { TalentVolunteer } from '../types';

interface TalentBankManagerProps {
  selectedDistrict: string;
}

export const TalentBankManager: React.FC<TalentBankManagerProps> = ({ selectedDistrict }) => {
  const [talents, setTalents] = useState<TalentVolunteer[]>(INITIAL_TALENT_VOLUNTEERS as TalentVolunteer[]);
  const [activeSkillFilter, setActiveSkillFilter] = useState<string>('الجميع');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [assignedTalent, setAssignedTalent] = useState<TalentVolunteer | null>(null);

  // New Talent Input Form
  const [fullName, setFullName] = useState('');
  const [district, setDistrict] = useState('مدينة سمنود');
  const [phone, setPhone] = useState('');
  const [primarySkill, setPrimarySkill] = useState<TalentVolunteer['primarySkill']>('طبي وصحي');
  const [secondarySkillsStr, setSecondarySkillsStr] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<TalentVolunteer['experienceLevel']>('متوسط');
  const [notes, setNotes] = useState('');

  const handleAddTalent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const newTalent: TalentVolunteer = {
      id: `talent-${Date.now()}`,
      fullName,
      district,
      phone,
      primarySkill,
      secondarySkills: secondarySkillsStr.split(',').map((s) => s.trim()).filter(Boolean),
      experienceLevel,
      status: 'متاح للتكليف',
      notes,
      registeredDate: 'اليوم',
    };

    setTalents([newTalent, ...talents]);
    setShowAddModal(false);
    // Reset Form
    setFullName('');
    setPhone('');
    setNotes('');
  };

  const skillOptions = [
    'الجميع',
    'طبي وصحي',
    'تنظيم وإدارة الفعاليات',
    'إعلام وصناعة محتوى',
    'استشارات قانونية',
    'تكنولوجيا ومعلومات',
    'عمل ميداني وتكافل',
  ];

  const filteredTalents = talents.filter((t) => {
    const matchesDistrict =
      selectedDistrict === 'الجميع' || t.district.includes(selectedDistrict);
    const matchesSkill =
      activeSkillFilter === 'الجميع' || t.primarySkill === activeSkillFilter;
    const matchesSearch =
      t.fullName.includes(searchQuery) ||
      t.district.includes(searchQuery) ||
      t.phone.includes(searchQuery) ||
      (t.notes && t.notes.includes(searchQuery));

    return matchesDistrict && matchesSkill && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header Card */}
      <div className="bento-card-dark bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              <Users className="w-4 h-4 text-amber-400" />
              <span>بنك الكوادر والمتطوعين الميدانيين — حزب مستقبل وطن سمنود</span>
            </div>
            <h2 className="text-2xl font-extrabold font-changa text-white">
              إدارة الكفاءات والتخصصات للتكليف بالمبادرات
            </h2>
            <p className="text-xs text-slate-300">
              قاعدة بيانات ذكية لتصنيف شباب وأعضاء الحزب بقرى ومدن سمنود بحسب التخصص والدور الميداني.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold px-5 py-3 rounded-2xl text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل كادر متطوع جديد +</span>
          </button>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs w-full sm:w-auto">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => setActiveSkillFilter(skill)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeSkillFilter === skill
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-amber-300'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="بحث باسم العضو، الهاتف، أو التخصص..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-10 py-2 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>

      {/* Talent Volunteer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTalents.map((t) => (
          <motion.div
            key={t.id}
            whileHover={{ y: -4 }}
            className="bento-card-dark bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-5 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-3 py-1 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {t.primarySkill}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    t.status === 'متاح للتكليف'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold font-changa text-white">{t.fullName}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>الوحدة القروية: {t.district}</span>
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>مستوى الخبرة:</span>
                  <strong className="text-amber-400">{t.experienceLevel}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>رقم التواصل:</span>
                  <strong className="font-mono text-slate-200">{t.phone}</strong>
                </div>
              </div>

              {t.notes && (
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl italic border border-slate-800/80">
                  "{t.notes}"
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">مسجل: {t.registeredDate}</span>
              <button
                onClick={() => setAssignedTalent(t)}
                className="bg-blue-700 hover:bg-blue-600 text-amber-300 font-extrabold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-all border border-amber-500/30"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>تكليف بمبادرة</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* REGISTER NEW TALENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold font-changa text-amber-300">تسجيل كادر متطوع جديد بالبنك</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTalent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">اسم العضو المتطوع الرباعي:</label>
                <input
                  type="text"
                  placeholder="مثال: محمد عبد المنعم زاهر"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">الوحدة القروية:</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white font-bold"
                  >
                    {SAMANOUD_DISTRICTS.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">رقم المحمول:</label>
                  <input
                    type="text"
                    placeholder="010XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">التخصص الرئيسي:</label>
                <select
                  value={primarySkill}
                  onChange={(e) => setPrimarySkill(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-bold"
                >
                  <option value="طبي وصحي">طبي وصحي (أطباء وتمريض)</option>
                  <option value="تنظيم وإدارة الفعاليات">تنظيم وإدارة الفعاليات والنزول</option>
                  <option value="إعلام وصناعة محتوى">إعلام وصناعة فيديوهات</option>
                  <option value="استشارات قانونية">استشارات قانونية وخدمات نواب</option>
                  <option value="تكنولوجيا ومعلومات">تكنولوجيا ومعلومات وإدارة بيانات</option>
                  <option value="عمل ميداني وتكافل">عمل ميداني وتكافل اجتماعي</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">ملاحظات والتخصص الدقيق:</label>
                <textarea
                  rows={2}
                  placeholder="مثال: طبيب أطفال، خبرة في القوافل الطبية بالقرى..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold p-3 rounded-2xl shadow-lg cursor-pointer transition-all"
              >
                حفظ الكادر وبنك المتطوعين ✨
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ASSIGNMENT CONFIRMATION MODAL */}
      {assignedTalent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-white text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-changa">تكليف ميداني للكادر</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              تم تكليف <strong className="text-amber-300">{assignedTalent.fullName}</strong> بمبادرة القافلة الطبية والتغطية الميدانية القادمة في <strong className="text-amber-300">{assignedTalent.district}</strong>.
            </p>
            <button
              onClick={() => setAssignedTalent(null)}
              className="w-full bg-amber-500 text-slate-950 font-black p-2.5 rounded-xl text-xs cursor-pointer"
            >
              موافق وإرسال إشعار التكليف 📱
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
