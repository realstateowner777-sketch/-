import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckSquare,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Plus,
  UserCheck,
  Building2,
  Sparkles,
  X,
  Megaphone,
  ChevronLeft
} from 'lucide-react';
import { SAMANOUD_DISTRICTS } from '../data/mockSamanoudData';

export interface SecretariatTask {
  id: string;
  title: string;
  linkedEvent: string;
  assignedMember: string;
  department: string;
  district: string;
  dueDate: string;
  status: 'قيد التنفيذ' | 'قيد الانتظار' | 'مكتملة';
  isUrgent?: boolean;
}

export const TaskScheduler: React.FC = () => {
  const [tasks, setTasks] = useState<SecretariatTask[]>([
    {
      id: 'task-1',
      title: 'تجهيز مقر الوحدة الصحية بالقافلة الطبية وتأمين حركة المواطنين',
      linkedEvent: 'القافلة الطبية بمحلة زياد (5 أغسطس)',
      assignedMember: 'المهندس أحمد عبدالحميد (أمانة العمل الجماهيري)',
      department: 'العمل الجماهيري والخدمات',
      district: 'قرية محلة زياد',
      dueDate: 'غداً، 09:00 صباحاً',
      status: 'قيد التنفيذ',
      isUrgent: true,
    },
    {
      id: 'task-2',
      title: 'تأمين مخزون اللحوم والسلع بمعرض "مستقبل وطن" وتجهيز البانرات',
      linkedEvent: 'افتتاح معرض السلع التموينية (10 أغسطس)',
      assignedMember: 'الأستاذة مروة الشناوي (أمانة التموين)',
      department: 'أمانة التموين والتجارة',
      district: 'مدينة سمنود',
      dueDate: 'خلال 3 أيام',
      status: 'قيد التنفيذ',
      isUrgent: false,
    },
    {
      id: 'task-3',
      title: 'إصدار التغطية المصورة والمواد الفيروسية لبطولة دوري الشباب',
      linkedEvent: 'نهائي دوري مستقبل وطن (15 أغسطس)',
      assignedMember: 'الكابتن محمود الجمال (أمانة الإعلام والشباب)',
      department: 'أمانة الإعلام والشباب',
      district: 'قرية الراهبين',
      dueDate: '15 أغسطس 2026',
      status: 'قيد الانتظار',
      isUrgent: false,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newLinkedEvent, setNewLinkedEvent] = useState('القافلة الطبية الكبرى');
  const [newAssignedMember, setNewAssignedMember] = useState('');
  const [newDepartment, setNewDepartment] = useState('أمانة التنظيم والمتابعة');
  const [newDistrict, setNewDistrict] = useState('مدينة سمنود');
  const [newDueDate, setNewDueDate] = useState('غداً، 10:00 صباحاً');

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus =
            t.status === 'قيد التنفيذ'
              ? 'مكتملة'
              : t.status === 'قيد الانتظار'
              ? 'قيد التنفيذ'
              : 'قيد التنفيذ';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: SecretariatTask = {
      id: `task-${Date.now()}`,
      title: newTitle,
      linkedEvent: newLinkedEvent,
      assignedMember: newAssignedMember || 'عضو أمانة سمنود المكلف',
      department: newDepartment,
      district: newDistrict,
      dueDate: newDueDate,
      status: 'قيد التنفيذ',
    };

    setTasks([newTask, ...tasks]);
    setShowAddModal(false);
    setNewTitle('');
    setNewAssignedMember('');
  };

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <CheckSquare className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold font-changa text-white">
                جدول المهام والتكليفات الميدانية للكوادر (Task Scheduler)
              </h3>
              <span className="px-2.5 py-0.5 text-[10px] font-black bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                مربوط بالفاعليات القومية
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              ربط التكليفات اليومية لأعضاء هيئة المكتب بأجندة المبادرات والتنبيه الفوري بمواعيد التنفيذ
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
          <span>إضافة تكليف ميداني جديد</span>
        </button>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-slate-950 border p-5 rounded-2xl transition-all shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              task.status === 'مكتملة'
                ? 'border-emerald-500/30 opacity-80'
                : task.isUrgent
                ? 'border-amber-500/60 bg-amber-500/5'
                : 'border-slate-800'
            }`}
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span
                  className={`px-3 py-1 rounded-full font-bold text-[11px] border ${
                    task.status === 'مكتملة'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : task.status === 'قيد التنفيذ'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  {task.status}
                </span>

                <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 font-bold border border-blue-500/30">
                  {task.linkedEvent}
                </span>

                <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-300 font-medium border border-slate-800 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-amber-400" /> {task.district}
                </span>

                {task.isUrgent && (
                  <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-black border border-red-500/30 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> عاجل جداً
                  </span>
                )}
              </div>

              <h4
                className={`text-sm font-extrabold font-changa text-white ${
                  task.status === 'مكتملة' ? 'line-through text-slate-400' : ''
                }`}
              >
                {task.title}
              </h4>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300 font-bold">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" /> {task.assignedMember}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-mono text-amber-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> موعد التسليم: {task.dueDate}
                </span>
              </div>
            </div>

            <button
              onClick={() => toggleTaskStatus(task.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                task.status === 'مكتملة'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{task.status === 'مكتملة' ? 'تم الإنجاز ✅' : 'تحديث الحالة'}</span>
            </button>
          </div>
        ))}
      </div>

      {/* ADD TASK MODAL */}
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
                <h3 className="text-base font-extrabold font-changa text-amber-300">إضافة تكليف ميداني لعضو أمانة</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddTask} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">عنوان التكليف أو المهمة:</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="مثال: مراجعة قوائم المستفيدين بقافلة محلة زياد..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">المبادرة / الفعالية المرتبطة:</label>
                  <input
                    type="text"
                    value={newLinkedEvent}
                    onChange={(e) => setNewLinkedEvent(e.target.value)}
                    placeholder="اسم القافلة أو الفعالية..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">العضو المكلف:</label>
                    <input
                      type="text"
                      value={newAssignedMember}
                      onChange={(e) => setNewAssignedMember(e.target.value)}
                      placeholder="اسم الكادر أو العضو..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">الوحدة المحلية:</label>
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

                <div>
                  <label className="block font-bold text-slate-300 mb-1">موعد التسليم النهائي:</label>
                  <input
                    type="text"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    placeholder="مثال: غداً، 05:00 عصراً"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold p-3 rounded-xl shadow-lg cursor-pointer transition-all mt-2"
                >
                  إضافة التكليف فوراً ✨
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
