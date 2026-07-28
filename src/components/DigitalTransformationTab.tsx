import React, { useState } from 'react';
import { ROADMAP_PHASES, WORKFORCE_TRAINING } from '../data/mockSamanoudData';
import { RoadmapPhase, WorkforceTraining } from '../types';
import {
  Cpu,
  CheckCircle2,
  Clock,
  ChevronLeft,
  Users,
  Award,
  BarChart,
  Calendar,
  Layers,
  Sparkles,
  Check,
  ShieldCheck,
  BarChart2,
} from 'lucide-react';
import { ExecutiveSamanoudOSMatrix } from './ExecutiveSamanoudOSMatrix';
import { RACI_Matrix_Viewer } from './DigitalTransformation/RACI_Matrix_Viewer';
import { CitizenPollEngine } from './CitizenPortal/CitizenPollEngine';

export const DigitalTransformationTab: React.FC = () => {
  const [phases, setPhases] = useState<RoadmapPhase[]>(ROADMAP_PHASES);
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase>(ROADMAP_PHASES[1]); // Phase 2 default
  const [activeSection, setActiveSection] = useState<'roadmap' | 'raci' | 'polls' | 'presentation'>('roadmap');

  const toggleMilestone = (phaseId: number, milestoneIndex: number) => {
    setPhases((prevPhases) =>
      prevPhases.map((phase) => {
        if (phase.id === phaseId) {
          const newMilestones = [...phase.milestones];
          newMilestones[milestoneIndex].completed = !newMilestones[milestoneIndex].completed;
          const completedCount = newMilestones.filter((m) => m.completed).length;
          const newProgress = Math.round((completedCount / newMilestones.length) * 100);
          const newStatus =
            newProgress === 100 ? 'completed' : newProgress > 0 ? 'in-progress' : 'upcoming';

          const updatedPhase = {
            ...phase,
            milestones: newMilestones,
            progressPercentage: newProgress,
            status: newStatus as 'completed' | 'in-progress' | 'upcoming',
          };

          if (selectedPhase.id === phaseId) {
            setSelectedPhase(updatedPhase);
          }

          return updatedPhase;
        }
        return phase;
      })
    );
  };

  const getStatusBadge = (status: 'completed' | 'in-progress' | 'upcoming') => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5" />
            مكتملة 100%
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
            قيد التنفيذ الميداني
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
            مخطط تنفيذها
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Navigation Sub-Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 shadow-lg text-xs">
        <button
          onClick={() => setActiveSection('roadmap')}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSection === 'roadmap'
              ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>خريطة ومراحل الميكنة</span>
        </button>

        <button
          onClick={() => setActiveSection('raci')}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSection === 'raci'
              ? 'bg-blue-600 text-white shadow-md font-extrabold'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>مصفوفة المسؤوليات (RACI Viewer)</span>
        </button>

        <button
          onClick={() => setActiveSection('polls')}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSection === 'polls'
              ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>محرك استبيانات رضا القرى</span>
        </button>

        <button
          onClick={() => setActiveSection('presentation')}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeSection === 'presentation'
              ? 'bg-purple-600 text-white shadow-md font-extrabold'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>العرض التنفيذي الشامل (Executive Presentation)</span>
        </button>
      </div>

      {/* SECTION 1: ROADMAP & WORKFORCE TRAINING */}
      {(activeSection === 'roadmap' || activeSection === 'presentation') && (
        <>
          {/* Top Section Header - Main Bento Card */}
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-800 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2.5 border border-amber-500/40">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>خطة الميكنة الذكية — حزب مستقبل وطن سمنود</span>
                </div>
                <h2 className="text-2xl font-bold font-changa text-white">
                  مراحل الميكنة الذكية وبناء كوادر الأمانة بمركز سمنود
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  جدول زمني مرحلي مدعوم بنظام متابعة المعالم الإنجازية والتأهيل الكوادر الإعلامية والشبابية لأمانة سمنود
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-500 block font-medium">إجمالي نسبة التحول الرقمي</span>
                  <span className="text-2xl sm:text-3xl font-black font-changa text-blue-600">70.5%</span>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg font-changa shadow-inner">
                  70%
                </div>
              </div>
            </div>

            {/* Timeline Stepper / Bento Phase selector bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
              {phases.map((phase) => (
                <div
                  key={phase.id}
                  onClick={() => setSelectedPhase(phase)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    selectedPhase.id === phase.id
                      ? 'bg-gradient-to-br from-blue-900 to-indigo-950 text-white border-blue-700 shadow-lg shadow-blue-900/20 ring-2 ring-blue-500/50'
                      : 'bg-slate-50 hover:bg-slate-100/80 text-slate-800 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span
                      className={`font-bold px-2.5 py-0.5 rounded-lg ${
                        selectedPhase.id === phase.id
                          ? 'bg-blue-800/80 text-blue-200 border border-blue-700'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {phase.months}
                    </span>
                    <span className="font-mono font-bold">{phase.progressPercentage}%</span>
                  </div>

                  <h4
                    className={`text-xs font-bold font-changa line-clamp-2 mb-3 ${
                      selectedPhase.id === phase.id ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {phase.title}
                  </h4>

                  {/* Mini progress bar */}
                  <div className="w-full h-2 bg-slate-200/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        phase.progressPercentage === 100
                          ? 'bg-emerald-400'
                          : selectedPhase.id === phase.id
                          ? 'bg-blue-400'
                          : 'bg-blue-600'
                      }`}
                      style={{ width: `${phase.progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Phase Active Card Detail - Bento Dark Module */}
          <div className="bento-card-dark text-white p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-sm">
                    المرحلة النشطة رقم {selectedPhase.id}
                  </span>
                  {getStatusBadge(selectedPhase.status)}
                </div>
                <h3 className="text-xl font-bold font-changa text-amber-300">
                  {selectedPhase.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  {selectedPhase.description}
                </p>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shrink-0 text-xs space-y-1">
                <span className="text-slate-400 block font-medium">الإدارة التنفيذية المسؤولة:</span>
                <div className="font-bold text-blue-400">{selectedPhase.leadDepartment}</div>
              </div>
            </div>

            {/* Milestones Checklist Interactive Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold font-changa text-slate-200 flex items-center gap-2">
                  <div className="p-1.5 bg-blue-900/50 rounded-lg text-blue-400 border border-blue-800">
                    <Layers className="w-4 h-4" />
                  </div>
                  المعالم المستهدفة والمخرجات التنفيذية (اضغط للتحديث الميداني):
                </h4>
                <span className="text-xs text-slate-400 font-medium">
                  إنجاز {selectedPhase.milestones.filter((m) => m.completed).length} من أصل{' '}
                  {selectedPhase.milestones.length} معلم
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedPhase.milestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleMilestone(selectedPhase.id, idx)}
                    className={`p-4.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      milestone.completed
                        ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-100 hover:bg-emerald-950/70'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        milestone.completed
                          ? 'bg-emerald-500 text-slate-950'
                          : 'border-2 border-slate-600 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs font-medium leading-relaxed">{milestone.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Workforce Training Matrix */}
          <div className="bento-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-changa text-slate-900">
                    المصفوفة التدريبية وبناء الكوادر الرقمية (الجانب البشري)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    رفع كفاءة العنصر البشري وتدريب 100% من كوادر الصف الأول والقيادات التنفذية بسمنود
                  </p>
                </div>
              </div>

              <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200">
                إجمالي المتدربين: 147 / 179 كوادر
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-950 border-y border-slate-800 text-slate-300 font-bold">
                    <th className="p-4 rounded-r-2xl">البرنامج التدريبي</th>
                    <th className="p-4">الفئة المستهدفة</th>
                    <th className="p-4">المدة</th>
                    <th className="p-4">عدد المتدربين</th>
                    <th className="p-4 rounded-l-2xl">الحالة المؤسسية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {WORKFORCE_TRAINING.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-white">{row.programTitle}</td>
                      <td className="p-4 text-amber-400 font-bold">{row.targetAudience}</td>
                      <td className="p-4 text-slate-300 font-mono">{row.duration}</td>
                      <td className="p-4 text-emerald-400 font-mono font-bold">{row.traineesCount} متدرب</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                            row.status === 'مكتملة'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* SECTION 2: RACI MATRIX VIEWER */}
      {(activeSection === 'raci' || activeSection === 'presentation') && (
        <RACI_Matrix_Viewer />
      )}

      {/* SECTION 3: CITIZEN POLL ENGINE */}
      {(activeSection === 'polls' || activeSection === 'presentation') && (
        <CitizenPollEngine />
      )}

      {/* SECTION 4: EXECUTIVE PRESENTATION MATRIX */}
      {(activeSection === 'presentation' || activeSection === 'roadmap') && (
        <ExecutiveSamanoudOSMatrix />
      )}
    </div>
  );
};
