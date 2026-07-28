import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Bell,
  BellRing,
  Plus,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Users,
  CheckCircle2,
  X,
  Building2,
  Tag
} from 'lucide-react';
import { SAMANOUD_DISTRICTS } from '../data/mockSamanoudData';

export interface PartyEventItem {
  id: string;
  title: string;
  category: 'قافلة طبية' | 'معرض تمويني' | 'دوري شباب' | 'ندوة توعوية' | 'اجتماع تنظيمي';
  district: string;
  date: string;
  time: string;
  location: string;
  expectedBeneficiaries: number;
  hasReminder: boolean;
  notes?: string;
}

export const CentralEventsCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // August 2026
  const [events, setEvents] = useState<PartyEventItem[]>([
    {
      id: 'evt-1',
      title: 'القافلة الطبية الكبرى للكشف المجاني وتحويل الحالات',
      category: 'قافلة طبية',
      district: 'قرية محلة زياد',
      date: '2026-08-05',
      time: '10:00 صباحاً',
      location: 'المركز الطبي بالوحدة المحلية بمحلة زياد',
      expectedBeneficiaries: 1500,
      hasReminder: true,
      notes: 'تضم 10 تخصصات طبية مع صيدلية صرف علاج مجانية',
    },
    {
      id: 'evt-2',
      title: 'افتتاح معرض "مستقبل وطن" المخفض للسلع واللحوم',
      category: 'معرض تمويني',
      district: 'مدينة سمنود',
      date: '2026-08-10',
      time: '11:00 صباحاً',
      location: 'حي البحر - بجوار موقف سمنود الجديد',
      expectedBeneficiaries: 4000,
      hasReminder: false,
      notes: 'خصومات تصل إلى 30% على السلع الأساسية والتموينية',
    },
    {
      id: 'evt-3',
      title: 'نهائي دوري مستقبل وطن الخماسي للشباب',
      category: 'دوري شباب',
      district: 'قرية الراهبين',
      date: '2026-08-15',
      time: '05:00 عصراً',
      location: 'ملعب مركز شباب الراهبين',
      expectedBeneficiaries: 800,
      hasReminder: true,
      notes: 'توزيع الجوائز والكؤوس بحضور قيادات النواب والأمانة',
    },
    {
      id: 'evt-4',
      title: 'ندوة توعية بحماية الأسرة والتكافل الاجتماعي',
      category: 'ندوة توعوية',
      district: 'قرية ميت حبيب',
      date: '2026-08-20',
      time: '04:00 عصراً',
      location: 'قاعة المناسبات الكبرى بميت حبيب',
      expectedBeneficiaries: 350,
      hasReminder: false,
      notes: 'تستهدف دعم المرأة الريفية والمشروعات متناهية الصغر',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('الجميع');
  const [selectedEvent, setSelectedEvent] = useState<PartyEventItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Event Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<PartyEventItem['category']>('قافلة طبية');
  const [newDistrict, setNewDistrict] = useState('مدينة سمنود');
  const [newDate, setNewDate] = useState('2026-08-25');
  const [newTime, setNewTime] = useState('10:00 صباحاً');
  const [newLocation, setNewLocation] = useState('');

  const toggleReminder = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === id) {
          const nextState = !evt.hasReminder;
          if (nextState) {
            alert(`تم تفعيل التذكير للفعالية: "${evt.title}" 🔔`);
          }
          return { ...evt, hasReminder: nextState };
        }
        return evt;
      })
    );
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const item: PartyEventItem = {
      id: `evt-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      district: newDistrict,
      date: newDate,
      time: newTime,
      location: newLocation || 'القطاع الرئيسي بمركز سمنود',
      expectedBeneficiaries: 500,
      hasReminder: true,
    };

    setEvents([...events, item]);
    setShowAddModal(false);
    setNewTitle('');
    setNewLocation('');
  };

  const filteredEvents = events.filter((evt) => {
    if (selectedCategory === 'الجميع') return true;
    return evt.category === selectedCategory;
  });

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Top Title & Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <CalendarIcon className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold font-changa text-white">
                التقويم المركزي الموحد للفعاليات والمبادرات القومية
              </h3>
              <span className="px-2.5 py-0.5 text-[10px] font-black bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                سمنود 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              متابعة مواعيد القوافل، المعارض التموينية، والدوري الرياضي مع تفعيل التذكيرات الميدانية
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          aria-label="إضافة فعالية جديدة للتقويم"
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
          <span>إضافة فعالية جديدة</span>
        </button>
      </div>

      {/* Category Pills & Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
        {['الجميع', 'قافلة طبية', 'معرض تمويني', 'دوري شباب', 'ندوة توعوية', 'اجتماع تنظيمي'].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-label={`تصفية حسب ${cat}`}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-amber-300'
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Grid of Events Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredEvents.map((evt) => (
          <motion.div
            key={evt.id}
            whileHover={{ y: -4 }}
            onClick={() => setSelectedEvent(evt)}
            className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl transition-all shadow-md flex flex-col justify-between space-y-3 cursor-pointer group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-[11px]">
                  {evt.category}
                </span>
                <button
                  onClick={(e) => toggleReminder(evt.id, e)}
                  aria-label={evt.hasReminder ? 'إلغاء التذكير' : 'تفعيل التذكير'}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    evt.hasReminder
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-amber-400'
                  }`}
                  title={evt.hasReminder ? 'التذكير مفعّل' : 'تفعيل التذكير'}
                >
                  {evt.hasReminder ? <BellRing className="w-4 h-4 text-amber-400 animate-bounce" /> : <Bell className="w-4 h-4" />}
                </button>
              </div>

              <h4 className="text-sm font-extrabold font-changa text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                {evt.title}
              </h4>

              <div className="space-y-1 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{evt.district} • {evt.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{evt.date} الساعة {evt.time}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-medium">
                المستفيدون المقدرون: <strong className="text-amber-300 font-mono">{evt.expectedBeneficiaries}</strong>
              </span>
              <span className="text-amber-400 font-bold group-hover:translate-x-[-2px] transition-transform">
                التفاصيل ➔
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EVENT DETAIL MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 text-white"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
                    {selectedEvent.category}
                  </span>
                  <span className="text-xs text-slate-400">{selectedEvent.district}</span>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  aria-label="إغلاق التقييم"
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-extrabold font-changa text-white">{selectedEvent.title}</h3>
                
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">المكان والموقع الميداني:</span>
                    <strong className="text-amber-300">{selectedEvent.location}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">التاريخ والوقت:</span>
                    <strong className="text-emerald-400 font-mono">{selectedEvent.date} — {selectedEvent.time}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">المستفيدون المباشرون:</span>
                    <strong className="text-amber-400 font-mono">{selectedEvent.expectedBeneficiaries} مواطن</strong>
                  </div>
                </div>

                {selectedEvent.notes && (
                  <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl italic border border-slate-800">
                    "{selectedEvent.notes}"
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <button
                  onClick={() => toggleReminder(selectedEvent.id)}
                  aria-label="تعديل حالة التذكير"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    selectedEvent.hasReminder
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  <span>{selectedEvent.hasReminder ? 'التذكير مفعّل (إلغاء)' : 'تفعيل التذكير الفوري'}</span>
                </button>

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD NEW EVENT MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-white"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-extrabold font-changa text-amber-300">إضافة فعالية بالتقويم المركزي</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">اسم المبادرة / الفعالية:</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="مثال: القافلة الطبية بقرية طليمة"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">التصنيف:</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-bold"
                    >
                      <option value="قافلة طبية">قافلة طبية</option>
                      <option value="معرض تمويني">معرض تمويني</option>
                      <option value="دوري شباب">دوري شباب</option>
                      <option value="ندوة توعوية">ندوة توعوية</option>
                      <option value="اجتماع تنظيمي">اجتماع تنظيمي</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">الوحدة القروية:</label>
                    <select
                      value={newDistrict}
                      onChange={(e) => setNewDistrict(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-bold"
                    >
                      {SAMANOUD_DISTRICTS.map((d) => (
                        <option key={d.name} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">التاريخ:</label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">الوقت:</label>
                    <input
                      type="text"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      placeholder="10:00 صباحاً"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">الموقع والتفاصيل:</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="مقر الوحدة الصحية / مركز الشباب..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold p-3 rounded-xl shadow-lg cursor-pointer transition-all mt-2"
                >
                  حفظ الفعالية بالتقويم ✨
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
