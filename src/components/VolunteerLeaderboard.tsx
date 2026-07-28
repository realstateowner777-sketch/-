import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Award,
  Medal,
  Clock,
  Sparkles,
  Users,
  Search,
  Filter,
  Plus,
  Zap,
  Heart,
  Stethoscope,
  ShoppingBag,
  CheckCircle2,
  X,
  Star,
} from 'lucide-react';
import { VOLUNTEER_MEMBERS } from '../data/mockSamanoudData';
import { VolunteerMember } from '../types';

interface VolunteerLeaderboardProps {
  selectedDistrict: string;
}

export const VolunteerLeaderboard: React.FC<VolunteerLeaderboardProps> = ({ selectedDistrict }) => {
  const [volunteers, setVolunteers] = useState<VolunteerMember[]>(VOLUNTEER_MEMBERS as VolunteerMember[]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerMember | null>(null);
  const [showLogHoursModal, setShowLogHoursModal] = useState(false);

  // New Volunteer Hours Form
  const [memberId, setMemberId] = useState(VOLUNTEER_MEMBERS[0].id);
  const [hoursToAdd, setHoursToAdd] = useState(5);
  const [initiativeName, setInitiativeName] = useState('القافلة الطبية بقرية محلة زياد');

  const handleAddHours = (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteers((prev) =>
      prev.map((v) =>
        v.id === memberId
          ? {
              ...v,
              volunteerHours: v.volunteerHours + Number(hoursToAdd),
              initiativesAttended: v.initiativesAttended + 1,
            }
          : v
      )
    );
    setShowLogHoursModal(false);
  };

  const filteredVolunteers = volunteers
    .filter((v) => {
      const matchesDistrict = selectedDistrict === 'الجميع' || v.district.includes(selectedDistrict);
      const matchesSearch = v.name.includes(searchQuery) || v.role.includes(searchQuery) || v.district.includes(searchQuery);
      return matchesDistrict && matchesSearch;
    })
    .sort((a, b) => b.volunteerHours - a.volunteerHours);

  const top3 = filteredVolunteers.slice(0, 3);
  const restList = filteredVolunteers.slice(3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner - Bento Leaderboard Card */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="bento-card-dark bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>لوحة شرف الشباب والمتطوعين — حزب مستقبل وطن مركز سمنود</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-changa text-white">
              منصة تكريم وشارات الشباب <span className="text-amber-400">الأكثر عطاءً</span>
            </h2>
            <p className="text-xs text-slate-300">
              تسجيل ومتابعة ساعات التطوع الميداني للشباب في القوافل والمعارض والخدمات بقرى سمنود.
            </p>
          </div>

          <button
            onClick={() => setShowLogHoursModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold px-5 py-3 rounded-2xl text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل ساعات تطوع جديدة +</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="بحث باسم المتطوع، القرية، أو المهارة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-300 font-bold bg-slate-950 px-3.5 py-2 rounded-2xl border border-slate-800">
            <Users className="w-4 h-4 text-amber-400" />
            <span>إجمالي المتطوعين المسجلين: {volunteers.length} شاب وفتاة</span>
          </div>
        </div>

        {/* TOP 3 PODIUM (framer-motion animation) */}
        <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {top3.map((v, index) => {
            const isFirst = index === 0;
            const isSecond = index === 1;
            const isThird = index === 2;

            return (
              <motion.div
                key={v.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedVolunteer(v)}
                className={`bento-card-dark rounded-3xl p-6 relative overflow-hidden cursor-pointer transition-all border ${
                  isFirst
                    ? 'bg-gradient-to-b from-amber-950/80 via-slate-900 to-slate-950 border-amber-500/80 shadow-2xl shadow-amber-500/20 md:order-2 md:-translate-y-4'
                    : isSecond
                    ? 'bg-slate-900/90 border-slate-700 shadow-xl md:order-1'
                    : 'bg-slate-900/90 border-amber-800/40 shadow-xl md:order-3'
                }`}
              >
                {/* Podium Rank Badge */}
                <div className="absolute top-4 right-4 flex items-center justify-center">
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shadow-lg ${
                      isFirst
                        ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30'
                        : isSecond
                        ? 'bg-slate-300 text-slate-950'
                        : 'bg-amber-700 text-white'
                    }`}
                  >
                    #{index + 1}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="relative">
                    <img
                      src={v.avatar}
                      alt={v.name}
                      className={`w-20 h-20 rounded-full object-cover border-2 ${
                        isFirst ? 'border-amber-400 shadow-lg shadow-amber-500/30' : 'border-slate-700'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    {isFirst && (
                      <Trophy className="w-6 h-6 text-amber-400 absolute -top-3 -right-2 fill-amber-400 drop-shadow" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold font-changa text-white">{v.name}</h3>
                    <p className="text-xs text-amber-300 font-medium">{v.role}</p>
                    <p className="text-[11px] text-slate-400">{v.district}</p>
                  </div>

                  <div className="bg-slate-950/90 w-full p-3 rounded-2xl border border-slate-800 space-y-1">
                    <div className="text-xl font-mono font-black text-amber-400">
                      {v.volunteerHours} <span className="text-xs text-slate-400 font-sans">ساعة تطوع</span>
                    </div>
                    <p className="text-[11px] text-emerald-400 font-semibold">
                      {v.initiativesAttended} مبادرات ميدانية
                    </p>
                  </div>

                  {/* Badges preview */}
                  <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                    {v.badges.map((b) => (
                      <span
                        key={b.id}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${b.color}`}
                        title={b.description}
                      >
                        {b.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* REST OF VOLUNTEERS LIST */}
      <div className="bento-card-dark bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold font-changa text-slate-200 flex items-center justify-between">
          <span>قائمة باقي الكوادر والتطوع الميداني</span>
          <span className="text-xs text-amber-400 font-normal">أمانة مركز سمنود</span>
        </h3>

        <div className="divide-y divide-slate-800/80">
          {restList.map((vol, idx) => (
            <motion.div
              key={vol.id}
              whileHover={{ x: -4 }}
              onClick={() => setSelectedVolunteer(vol)}
              className="py-4 px-2 hover:bg-slate-950/50 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono font-bold text-slate-400 w-6">#{idx + 4}</span>
                <img
                  src={vol.avatar}
                  alt={vol.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-white font-changa">{vol.name}</h4>
                  <p className="text-xs text-slate-400">
                    {vol.role} • <strong className="text-amber-300">{vol.district}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs shrink-0">
                <div className="text-right">
                  <span className="font-mono font-bold text-amber-400 text-sm block">
                    {vol.volunteerHours} ساعة
                  </span>
                  <span className="text-[11px] text-slate-400">{vol.initiativesAttended} مبادرة</span>
                </div>

                <div className="flex items-center gap-1">
                  {vol.badges.map((b) => (
                    <span
                      key={b.id}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${b.color}`}
                    >
                      {b.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LOG HOURS MODAL */}
      {showLogHoursModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold font-changa text-amber-300">تسجيل ساعات تطوع ميداني</h3>
              <button
                onClick={() => setShowLogHoursModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddHours} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">اختر العضو المتطوع:</label>
                <select
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-bold"
                >
                  {volunteers.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.district})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">اسم المبادرة / الفعالية:</label>
                <input
                  type="text"
                  value={initiativeName}
                  onChange={(e) => setInitiativeName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">ساعات التطوع المنجزة:</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={hoursToAdd}
                  onChange={(e) => setHoursToAdd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold p-3 rounded-2xl shadow-lg cursor-pointer transition-all"
              >
                اعتماد إضافة الساعات والشارات ✨
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VOLUNTEER DETAIL PROFILE MODAL */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-white relative">
            <button
              onClick={() => setSelectedVolunteer(null)}
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <img
                src={selectedVolunteer.avatar}
                alt={selectedVolunteer.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-amber-400"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-lg font-extrabold font-changa">{selectedVolunteer.name}</h3>
                <p className="text-xs text-amber-300 font-semibold">{selectedVolunteer.role}</p>
                <p className="text-xs text-slate-400">الوحدة القروية: {selectedVolunteer.district}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400">ساعات التطوع المسجلة</span>
                <span className="text-xl font-bold font-mono text-amber-400 block">
                  {selectedVolunteer.volunteerHours} ساعة
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400">المبادرات الحاضرة</span>
                <span className="text-xl font-bold font-mono text-emerald-400 block">
                  {selectedVolunteer.initiativesAttended} فعالية
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-300 block">الأوسمة والشارات المكتسبة:</span>
              <div className="space-y-2">
                {selectedVolunteer.badges.map((b) => (
                  <div key={b.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                    <Award className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <h4 className="font-bold text-white">{b.name}</h4>
                      <p className="text-[11px] text-slate-400">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
