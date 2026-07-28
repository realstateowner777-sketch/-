import React, { useState } from 'react';
import { INITIAL_COMPLAINTS, SAMANOUD_DISTRICTS } from '../data/mockSamanoudData';
import { CitizenComplaint } from '../types';
import {
  Inbox,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Send,
  Sparkles,
  MapPin,
  Building2,
  Phone,
  User,
  MessageSquare,
  Search,
  Filter,
  Plus,
  Loader2,
  ArrowUpRight,
  ShieldAlert,
  X,
  Smartphone,
  Check,
  Archive,
  RotateCcw,
  History,
  CheckSquare,
  Square,
  Layers,
} from 'lucide-react';
import { WorkflowEnforcerModal } from './WorkflowEnforcerModal';
import { ComplaintsAuditLogOverlay, AuditLogRecord } from './ComplaintsAuditLogOverlay';

interface ComplaintsTriageTabProps {
  selectedDistrictFilter: string;
}

export const ComplaintsTriageTab: React.FC<ComplaintsTriageTabProps> = ({
  selectedDistrictFilter,
}) => {
  const [complaints, setComplaints] = useState<CitizenComplaint[]>(INITIAL_COMPLAINTS);
  const [archivedComplaints, setArchivedComplaints] = useState<CitizenComplaint[]>([
    {
      id: 'COMP-2026-ARCH-001',
      citizenName: 'الحاج إبراهيم متولي',
      phone: '01012345678',
      district: 'قرية ميت حبيب',
      category: 'طرق وإنارة وشوارع',
      complaintText: 'تم استبدال أعمدة الإنارة المتهالكة بطريق ميت حبيب - سمنود بـ 25 كشاف ليد حديث.',
      dateSubmitted: '12 مايو 2026',
      status: 'مكتمل',
      priority: 'عادي',
      priorityScore: 70,
      assignedDepartment: 'إدارة الشبكات والإنارة العامة',
      estimatedSLAHours: 24,
      summary: 'تم إنهاء التركيب بالكامل واختبار الإنارة ليلاً.',
      recommendedAction: 'متابعة الدورية الشهرية مع رئيس الوحدة المحلية.',
    },
    {
      id: 'COMP-2026-ARCH-002',
      citizenName: 'الأستاذة حنان مصطفى',
      phone: '01298765432',
      district: 'قرية الراهبين',
      category: 'مياه وصرف صحي',
      complaintText: 'إصلاح تسريب خط المجهود العالي بمحطة مياه الراهبين الرئيسية وإعادة ضخ المياه.',
      dateSubmitted: '28 يونيو 2026',
      status: 'مكتمل',
      priority: 'حرج',
      priorityScore: 95,
      assignedDepartment: 'شركة مياه الشرب والصرف الصحي',
      estimatedSLAHours: 6,
      summary: 'تم إصلاح الكسر واستعادة ضخ المياه بجميع أحياء القرية.',
    },
  ]);

  const [viewMode, setViewMode] = useState<'active' | 'archive'>('active');
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('الجميع');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal / Form States
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedComplaintModal, setSelectedComplaintModal] = useState<CitizenComplaint | null>(null);
  const [workflowComplaint, setWorkflowComplaint] = useState<CitizenComplaint | null>(null);

  // New Complaint Input Form
  const [newCitizenName, setNewCitizenName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDistrict, setNewDistrict] = useState('مدينة سمنود');
  const [newCategory, setNewCategory] = useState('نظافة وتراكم مخلفات');
  const [newComplaintText, setNewComplaintText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Toast / Notification simulator
  const [toastMessage, setToastMessage] = useState('');
  const [showAuditOverlay, setShowAuditOverlay] = useState(false);

  const logAuditRecord = (record: Partial<AuditLogRecord>) => {
    try {
      const saved = localStorage.getItem('samanoud_complaints_audit_log');
      const logs: AuditLogRecord[] = saved ? JSON.parse(saved) : [];
      const newEntry: AuditLogRecord = {
        id: `AUD-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        complaintId: record.complaintId || 'COMP-GENERIC',
        citizenName: record.citizenName || 'مواطن بمركز سمنود',
        district: record.district || 'سمنود',
        actionType: record.actionType || 'تغيير حالة',
        executedBy: record.executedBy || 'نظام حوكمة الشكاوى SamanoudOS',
        closureReason: record.closureReason || '',
        requiredSkill: record.requiredSkill || '',
        integrityHash: `sha256-${Math.random().toString(36).substring(2, 15)}`,
        notes: record.notes || '',
      };
      localStorage.setItem('samanoud_complaints_audit_log', JSON.stringify([newEntry, ...logs]));
    } catch (e) {
      console.error('Audit log failed', e);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Submit and Run AI Analysis via Server Gemini API
  const handleAnalyzeAndAddComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComplaintText.trim()) return;

    setAnalyzing(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/gemini/analyze-complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          complaintText: newComplaintText,
          district: newDistrict,
          category: newCategory,
        }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        const aiData = data.data;

        const newComplaint: CitizenComplaint = {
          id: `COMP-2026-0${Math.floor(100 + Math.random() * 900)}`,
          citizenName: newCitizenName || 'مواطن كريم - سمنود',
          phone: newPhone || '0100000****',
          district: newDistrict,
          category: aiData.categoryRefined || newCategory,
          complaintText: newComplaintText,
          dateSubmitted: 'الآن (توجيه ذكي)',
          status: 'تم التوجيه',
          priority: (aiData.priority as 'حرج' | 'عاجل' | 'عادي') || 'عاجل',
          priorityScore: aiData.priorityScore || 85,
          assignedDepartment: aiData.assignedDepartment || 'إدارة الخدمات والمتابعة الميدانية',
          estimatedSLAHours: aiData.estimatedSLAHours || 12,
          summary: aiData.summary,
          recommendedAction: aiData.recommendedAction,
          citizenResponseDraft: aiData.citizenResponseDraft,
        };

        setComplaints([newComplaint, ...complaints]);
        setShowAddModal(false);
        // Reset form
        setNewCitizenName('');
        setNewPhone('');
        setNewComplaintText('');
        triggerToast('تم توجيه الشكوى فوراً بالذكاء الاصطناعي وإرسال إشعار التوجيه الميداني!');
      } else {
        setErrorMsg(data.error || 'حدث خطأ أثناء تحليل الشكوى. يرجى المحاولة لاحقاً.');
      }
    } catch (err) {
      setErrorMsg('فشل الاتصال بمحرك التحليل الذكي.');
    } finally {
      setAnalyzing(false);
    }
  };

  // Change Complaint Status
  const handleUpdateStatus = (id: string, newStatus: CitizenComplaint['status']) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    if (selectedComplaintModal && selectedComplaintModal.id === id) {
      setSelectedComplaintModal({ ...selectedComplaintModal, status: newStatus });
    }
    triggerToast(`تم تحديث حالة الشكوى إلى: ${newStatus}`);
  };

  // Archive a Complaint
  const handleArchiveComplaint = (item: CitizenComplaint) => {
    setComplaints((prev) => prev.filter((c) => c.id !== item.id));
    setArchivedComplaints((prev) => [{ ...item, status: 'مكتمل' }, ...prev]);
    setSelectedComplaintModal(null);
    triggerToast(`تم نقل البلاغ "${item.id}" إلى سجل الأرشيف التاريخي 📦`);
  };

  // Restore a Complaint from Archive
  const handleRestoreComplaint = (item: CitizenComplaint) => {
    setArchivedComplaints((prev) => prev.filter((c) => c.id !== item.id));
    setComplaints((prev) => [item, ...prev]);
    triggerToast(`تم استرجاع البلاغ "${item.id}" للقائمة النشطة 🔄`);
  };

  // Batch Operations Handlers
  const toggleSelectComplaint = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAllActive = () => {
    if (selectedIds.length === filteredComplaints.length && filteredComplaints.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredComplaints.map((c) => c.id));
    }
  };

  const handleBatchUpdateStatus = (newStatus: 'جديد' | 'تم التوجيه' | 'قيد المتابعة' | 'مكتمل') => {
    if (selectedIds.length === 0) return;
    setComplaints((prev) =>
      prev.map((c) => (selectedIds.includes(c.id) ? { ...c, status: newStatus } : c))
    );
    triggerToast(`تم تحديث حالة ${selectedIds.length} بلاغات دفعة واحدة إلى "${newStatus}" ⚡`);
    setSelectedIds([]);
  };

  const handleBatchArchive = () => {
    if (selectedIds.length === 0) return;
    const itemsToArchive = complaints.filter((c) => selectedIds.includes(c.id));
    setComplaints((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
    setArchivedComplaints((prev) => [
      ...itemsToArchive.map((item) => ({ ...item, status: 'مكتمل' as const })),
      ...prev,
    ]);
    triggerToast(`تم أرشفة ${selectedIds.length} بلاغات بنجاح 📦`);
    setSelectedIds([]);
  };

  // Filter Logic for Active Complaints
  const filteredComplaints = complaints.filter((c) => {
    const matchesDistrict =
      selectedDistrictFilter === 'الجميع' || c.district === selectedDistrictFilter;
    const matchesStatus =
      activeStatusFilter === 'الجميع' || c.status === activeStatusFilter;
    const matchesSearch =
      c.complaintText.includes(searchQuery) ||
      c.citizenName.includes(searchQuery) ||
      c.id.includes(searchQuery) ||
      c.assignedDepartment.includes(searchQuery);

    return matchesDistrict && matchesStatus && matchesSearch;
  });

  // Filter Logic for Archived Complaints
  const filteredArchived = archivedComplaints.filter((c) => {
    const matchesDistrict =
      selectedDistrictFilter === 'الجميع' || c.district === selectedDistrictFilter;
    const matchesSearch =
      c.complaintText.includes(searchQuery) ||
      c.citizenName.includes(searchQuery) ||
      c.id.includes(searchQuery) ||
      c.assignedDepartment.includes(searchQuery);

    return matchesDistrict && matchesSearch;
  });

  const getSentimentBadge = (text: string, priority: string) => {
    // Simple AI Sentiment Analysis logic based on text keywords & urgency
    const isNegative =
      text.includes('انقطاع') ||
      text.includes('تسريب') ||
      text.includes('متهالكة') ||
      text.includes('خطر') ||
      text.includes('عاجل') ||
      text.includes('استغاثة') ||
      priority === 'حرج';

    const isPositive =
      text.includes('شكراً') ||
      text.includes('ممتاز') ||
      text.includes('تأكيد') ||
      text.includes('إدراج') ||
      text.includes('موافق');

    if (isNegative) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1 shadow-sm me-1">
          <Sparkles className="w-3 h-3 text-rose-600 animate-pulse" />
          <span>شعور المواطن: سلبي / حاد 🔴</span>
        </span>
      );
    } else if (isPositive) {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1 shadow-sm me-1">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>شعور المواطن: إيجابي / إشادة 🟢</span>
        </span>
      );
    } else {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1 shadow-sm me-1">
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span>شعور المواطن: محايد / استفسار 🔵</span>
        </span>
      );
    }
  };

  const getPriorityBadge = (priority: CitizenComplaint['priority'], score: number) => {
    switch (priority) {
      case 'حرج':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-600 text-white border border-rose-700 flex items-center gap-1 shadow-md animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" />
            حالات إنسانية/طوارئ حاسمة ({score} pt)
          </span>
        );
      case 'عاجل':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 border border-amber-600 flex items-center gap-1 shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5" />
            عاجل ميدانياً ({score} pt)
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            عادي ({score} pt)
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-bold animate-bounce bento-glow-emerald">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner - Bento Card */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2.5 border border-amber-500/40">
              <Sparkles className="w-4 h-4 fill-amber-400 text-slate-950" />
              <span>مكتب خدمة المواطنين واستجابات النواب — أمانة مركز سمنود</span>
            </div>
            <h2 className="text-2xl font-bold font-changa text-white">
              إدارة طلبيات وبلاغات المواطنين والتوجيه الميداني السريع
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              تصنيف تلقائي بالذكاء الاصطناعي لدرجة الأهمية، تحديد الأمانة المختصة، وتوليد الرد الشفاف السريع للمواطن.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowAuditOverlay(true)}
              className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/40 px-4 py-3.5 rounded-2xl text-xs font-bold shadow-lg transition-all cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>سجل التدقيق المؤسسي (Audit Log)</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 px-5 py-3.5 rounded-2xl text-xs font-extrabold shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>تسجيل طلب مواطن جديد والتوجيه الذكي</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          {/* View Mode Switcher + Status Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 me-2">
              <button
                onClick={() => setViewMode('active')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'active'
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>النشطة ({complaints.length})</span>
              </button>

              <button
                onClick={() => setViewMode('archive')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'archive'
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Archive className="w-3.5 h-3.5 text-amber-400" />
                <span>سجل الأرشيف ({archivedComplaints.length})</span>
              </button>
            </div>

            {viewMode === 'active' &&
              ['الجميع', 'جديد', 'تم التوجيه', 'قيد المتابعة', 'مكتمل'].map((st) => (
                <button
                  key={st}
                  onClick={() => setActiveStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeStatusFilter === st
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {st}
                </button>
              ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="بحث برقم البلاغ، المواطن، أو الإدارة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200/90 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
            />
          </div>
        </div>
      </div>

      {/* Complaints Pipeline List / Table - Bento Container */}
      <div className="bento-card overflow-hidden">
        <div className="p-5 bg-slate-950 text-white flex items-center justify-between text-xs font-bold border-b border-slate-800">
          <span className="flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-500/20 rounded-lg text-blue-400 border border-blue-500/30">
              {viewMode === 'active' ? <Inbox className="w-4 h-4" /> : <Archive className="w-4 h-4 text-amber-400" />}
            </div>
            {viewMode === 'active'
              ? `قائمة البلاغات الميدانية النشطة (${filteredComplaints.length} بلاغ)`
              : `سجل الأرشيف للبلاغات المكتملة (${filteredArchived.length} بلاغ مؤرشف)`}
          </span>
          {selectedDistrictFilter !== 'الجميع' && (
            <span className="bg-blue-600/40 px-3 py-1 rounded-full text-blue-300 border border-blue-500/30 font-medium">
              مصفى لقطاع: {selectedDistrictFilter}
            </span>
          )}
        </div>

        {/* BATCH ACTION BAR FOR ACTIVE COMPLAINTS */}
        {viewMode === 'active' && (
          <div className="bg-slate-900 border-b border-slate-800 p-3 px-5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSelectAllActive}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer transition-colors border border-slate-700"
                aria-label="تحديد أو إلغاء تحديد كافة البلاغات النشطة"
              >
                {selectedIds.length === filteredComplaints.length && filteredComplaints.length > 0 ? (
                  <CheckSquare className="w-4 h-4 text-amber-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                <span>
                  {selectedIds.length === filteredComplaints.length && filteredComplaints.length > 0
                    ? 'إلغاء تحديد الكل'
                    : 'تحديد الكل'}
                </span>
              </button>

              <span className="text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                المحدد: {selectedIds.length} من أصل {filteredComplaints.length}
              </span>
            </div>

            {selectedIds.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-bold me-1">معالجة جماعية (Batch):</span>
                <button
                  onClick={() => handleBatchUpdateStatus('مكتمل')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold cursor-pointer transition-all shadow-sm flex items-center gap-1"
                  aria-label="تغيير حالة العناصر المحددة إلى مكتمل"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>تعديل لـ "مكتمل"</span>
                </button>

                <button
                  onClick={() => handleBatchUpdateStatus('قيد المتابعة')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer transition-all shadow-sm flex items-center gap-1"
                  aria-label="تغيير حالة العناصر المحددة إلى قيد المتابعة"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>تعديل لـ "قيد المتابعة"</span>
                </button>

                <button
                  onClick={handleBatchArchive}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-black cursor-pointer transition-all shadow-sm flex items-center gap-1"
                  aria-label="أرشفة البلاغات المحددة دفعة واحدة"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>أرشفة المحددة ({selectedIds.length})</span>
                </button>
              </div>
            )}
          </div>
        )}

        {viewMode === 'active' ? (
          <div className="divide-y divide-slate-100">
            {filteredComplaints.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs font-medium">
                لا توجد بلاغات نشطة تطابق شروط البحث الحالية.
              </div>
            ) : (
              filteredComplaints.map((complaint) => {
                const isCriticalEmergency = complaint.priority === 'حرج' || complaint.priorityScore >= 90;
                return (
                  <div
                    key={complaint.id}
                    className={`p-6 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-5 border-r-4 ${
                      isCriticalEmergency
                        ? 'border-r-rose-600 bg-rose-950/10 hover:bg-rose-950/20 shadow-sm'
                        : 'border-r-transparent hover:bg-slate-50/80'
                    } ${selectedIds.includes(complaint.id) ? 'bg-amber-500/5' : ''}`}
                  >
                    <div className="flex items-start gap-3.5 max-w-2xl">
                      <button
                        onClick={() => toggleSelectComplaint(complaint.id)}
                        className="mt-1 p-1 rounded hover:bg-slate-200 transition-colors cursor-pointer text-slate-600 shrink-0"
                        aria-label={`تحديد البلاغ رقم ${complaint.id}`}
                      >
                        {selectedIds.includes(complaint.id) ? (
                          <CheckSquare className="w-5 h-5 text-amber-500" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </button>

                      <div className="space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200/60">
                            {complaint.id}
                          </span>
                          <span className="font-semibold text-blue-600 flex items-center gap-1 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">
                            <MapPin className="w-3.5 h-3.5" />
                            {complaint.district}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500 font-medium">{complaint.dateSubmitted}</span>
                          <span className="text-slate-400">•</span>
                          {getPriorityBadge(complaint.priority, complaint.priorityScore)}
                          {getSentimentBadge(complaint.complaintText, complaint.priority)}
                        </div>

                    <p className="text-xs font-bold text-slate-800 leading-relaxed">
                      "{complaint.complaintText}"
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 font-medium">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {complaint.citizenName}
                      </span>
                      <span className="flex items-center gap-1.5 text-indigo-600 font-semibold">
                        <Building2 className="w-3.5 h-3.5" />
                        المسؤول: {complaint.assignedDepartment}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-slate-600 font-bold">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        SLA: {complaint.estimatedSLAHours} ساعة
                      </span>
                    </div>
                  </div>
                </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${
                        complaint.status === 'مكتمل'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : complaint.status === 'قيد المتابعة'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {complaint.status}
                    </span>

                    <button
                      onClick={() => setSelectedComplaintModal(complaint)}
                      className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                    >
                      <span>تفاصيل والتوجيه</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
            )}
          </div>
        ) : (
          /* ARCHIVE VIEW TABLE */
          <div className="divide-y divide-slate-100">
            {filteredArchived.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs font-medium">
                لا توجد بلاغات مؤرشفة تطابق شروط البحث.
              </div>
            ) : (
              filteredArchived.map((arch) => (
                <div
                  key={arch.id}
                  className="p-6 bg-slate-50/40 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div className="space-y-2.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-slate-700 bg-slate-200 px-2.5 py-0.5 rounded-lg border border-slate-300">
                        {arch.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> مؤرشف ومحلول
                      </span>
                      <span className="font-semibold text-blue-600 flex items-center gap-1 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">
                        <MapPin className="w-3.5 h-3.5" />
                        {arch.district}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 font-medium">{arch.dateSubmitted}</span>
                    </div>

                    <p className="text-xs font-bold text-slate-800 leading-relaxed">
                      "{arch.complaintText}"
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5 font-medium">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {arch.citizenName}
                      </span>
                      <span className="flex items-center gap-1.5 text-indigo-600 font-semibold">
                        <Building2 className="w-3.5 h-3.5" />
                        المسؤول: {arch.assignedDepartment}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleRestoreComplaint(arch)}
                      className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>استرجاع للقائمة النشطة</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: Add New Complaint with Live AI Triage - Bento Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-changa text-slate-900">
                  تسجيل بلاغ مواطن والتوجيه الآلي الميداني
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAnalyzeAndAddComplaint} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">اسم المواطن:</label>
                  <input
                    type="text"
                    placeholder="مثال: خالد توفيق الحنفي"
                    value={newCitizenName}
                    onChange={(e) => setNewCitizenName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الهاتف:</label>
                  <input
                    type="text"
                    placeholder="010XXXXXXXX"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">الوحدة المحلية / القطاع:</label>
                  <select
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                  >
                    {SAMANOUD_DISTRICTS.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name} ({d.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">التصنيف المبدئي:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl px-4 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                  >
                    <option value="نظافة وتراكم مخلفات">نظافة وتراكم مخلفات</option>
                    <option value="طرق وإنارة وشوارع">طرق وإنارة وشوارع</option>
                    <option value="مياه وصرف صحي">مياه وصرف صحي</option>
                    <option value="إشغالات وتعديات">إشغالات وتعديات</option>
                    <option value="مخالفات بناء وتراخيص">مخالفات بناء وتراخيص</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">نص بلاغ المواطن التفصيلي:</label>
                <textarea
                  rows={4}
                  placeholder="اكتب البلاغ كما أورد المواطن... مثال: طفح مياه في الشارع الرئيسي بقرية محلة زياد يعيق دخول الأهالي..."
                  value={newComplaintText}
                  onChange={(e) => setNewComplaintText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all font-medium"
                  required
                ></textarea>
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-2xl border border-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={analyzing}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري التوجيه الذكي الآلي...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>تحليل الشكوى وتوجيه الإدارة</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: View Complaint Details & SMS Simulator - Bento Dialog */}
      {selectedComplaintModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-xs bg-slate-900 text-white px-3 py-1 rounded-xl">
                  {selectedComplaintModal.id}
                </span>
                <h3 className="text-base font-bold font-changa text-slate-900">
                  تفاصيل الشكوى والتوجيه المؤسسي
                </h3>
              </div>
              <button
                onClick={() => setSelectedComplaintModal(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Complaint Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 bg-slate-50/80 p-4.5 rounded-2xl text-xs border border-slate-200/70">
              <div>
                <span className="text-slate-400 block font-medium">المواطن:</span>
                <span className="font-bold text-slate-900">{selectedComplaintModal.citizenName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">الهاتف:</span>
                <span className="font-mono font-bold text-slate-800">{selectedComplaintModal.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">الوحدة/القطاع:</span>
                <span className="font-bold text-blue-600">{selectedComplaintModal.district}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium mb-1">الأولوية:</span>
                {getPriorityBadge(selectedComplaintModal.priority, selectedComplaintModal.priorityScore)}
              </div>
              <div>
                <span className="text-slate-400 block font-medium">الإدارة المسؤولة:</span>
                <span className="font-bold text-indigo-700">{selectedComplaintModal.assignedDepartment}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">الـ SLA المقدر:</span>
                <span className="font-mono font-bold text-amber-600">{selectedComplaintModal.estimatedSLAHours} ساعة</span>
              </div>
            </div>

            {/* Complaint Raw Text */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700">نص البلاغ الأصلي:</span>
              <p className="p-4 bg-slate-100/90 rounded-2xl text-xs text-slate-800 font-medium leading-relaxed border border-slate-200/60">
                "{selectedComplaintModal.complaintText}"
              </p>
            </div>

            {/* AI Action Plan */}
            {selectedComplaintModal.recommendedAction && (
              <div className="p-4.5 bg-blue-50 border border-blue-100 rounded-2xl space-y-1.5 text-xs">
                <span className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  خطة التوجيه والمتابعة الميدانية الموصى بها:
                </span>
                <p className="text-blue-950 leading-relaxed font-medium">
                  {selectedComplaintModal.recommendedAction}
                </p>
              </div>
            )}

            {/* Citizen Response SMS Draft - Dark Bento Card */}
            {selectedComplaintModal.citizenResponseDraft && (
              <div className="bento-card-dark p-5 text-white space-y-2 text-xs">
                <div className="flex items-center justify-between text-amber-300 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    مسودة الرد التلقائي للمواطن (SMS / واتساب الخدمي):
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-700">
                    إرسال شفاف
                  </span>
                </div>
                <p className="bg-slate-950/90 p-3.5 rounded-xl text-slate-200 leading-relaxed border border-slate-800">
                  {selectedComplaintModal.citizenResponseDraft}
                </p>
              </div>
            )}

            {/* Action Buttons to update status & Archive */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <button
                onClick={() => handleArchiveComplaint(selectedComplaintModal)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer border border-slate-200 flex items-center gap-1.5"
              >
                <Archive className="w-4 h-4 text-amber-600" />
                <span>أرشفة البلاغ (نقل للسجل التاريخي)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedComplaintModal.id, 'قيد المتابعة')}
                  className="px-3.5 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-bold transition-colors cursor-pointer border border-blue-200"
                >
                  قيد المتابعة الميدانية
                </button>
                <button
                  onClick={() => {
                    const comp = selectedComplaintModal;
                    setSelectedComplaintModal(null);
                    setWorkflowComplaint(comp);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تم الحل (تطبيق الحوكمة)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: WorkflowEnforcerModal for structured closure & talent mapping */}
      {workflowComplaint && (
        <WorkflowEnforcerModal
          complaint={workflowComplaint}
          onClose={() => setWorkflowComplaint(null)}
          onConfirmResolve={({ closureReason, requiredSkill, assignedVolunteerName, resolutionNotes }) => {
            const compId = workflowComplaint.id;
            handleUpdateStatus(compId, 'مكتمل');

            // Log to immutable Audit Overlay
            logAuditRecord({
              complaintId: compId,
              citizenName: workflowComplaint.citizenName,
              district: workflowComplaint.district,
              actionType: 'إغلاق بحوكمة',
              executedBy: `الكادر التنفيذي: ${assignedVolunteerName || 'أمانة المتابعة'}`,
              closureReason,
              requiredSkill,
              notes: resolutionNotes,
            });

            setWorkflowComplaint(null);
            triggerToast(
              `تم إغلاق الشكوى ${compId} بحوكمة رسمية (السبب: ${closureReason}) وتم ربط مهارة "${requiredSkill}" وتكريم الكادر ${assignedVolunteerName || ''}! 🏆`
            );
          }}
        />
      )}

      {/* Audit Log Overlay Modal Drawer */}
      <ComplaintsAuditLogOverlay
        isOpen={showAuditOverlay}
        onClose={() => setShowAuditOverlay(false)}
        closedComplaints={[
          ...archivedComplaints,
          ...complaints.filter((c) => c.status === 'مكتمل'),
        ]}
      />
    </div>
  );
};
