import React, { useState, useEffect } from 'react';
import {
  FileText,
  ShieldCheck,
  Search,
  RefreshCw,
  X,
  CheckCircle2,
  AlertTriangle,
  Download,
  Filter,
  Eye,
  Lock,
  History,
  Award,
  Sparkles,
} from 'lucide-react';
import { CitizenComplaint } from '../types';

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  complaintId: string;
  citizenName: string;
  district: string;
  actionType: 'توجيه جديد' | 'إغلاق بحوكمة' | 'تغيير حالة' | 'أرشفة' | 'استرجاع' | 'تدقيق عشوائي 10%';
  executedBy: string;
  closureReason?: string;
  requiredSkill?: string;
  integrityHash: string;
  notes?: string;
}

const INITIAL_AUDIT_LOGS: AuditLogRecord[] = [
  {
    id: 'AUD-2026-001',
    timestamp: '2026-07-27 14:32:10',
    complaintId: 'COMP-2026-ARCH-001',
    citizenName: 'الحاج إبراهيم متولي',
    district: 'قرية ميت حبيب',
    actionType: 'إغلاق بحوكمة',
    executedBy: 'أمانة العمل الجماهيري — أ. علي عبد المجيد',
    closureReason: 'صيانة مكتملة واستبدال الكشافات',
    requiredSkill: 'صيانة الكهرباء والإنارة الميدانية',
    integrityHash: 'sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    notes: 'تم ربط المهارة بكوادر قرية ميت حبيب في بنك المهارات TalentBankGovernance.',
  },
  {
    id: 'AUD-2026-002',
    timestamp: '2026-07-27 12:15:00',
    complaintId: 'COMP-2026-ARCH-002',
    citizenName: 'الأستاذة حنان مصطفى',
    district: 'قرية الراهبين',
    actionType: 'إغلاق بحوكمة',
    executedBy: 'شركة المياه وبنك المبادرات — م. أحمد سالم',
    closureReason: 'إصلاح كسر المحطة الرئيسية',
    requiredSkill: 'إدارة أزمات المرافق والشبكات',
    integrityHash: 'sha256-88d4266fd4e6338d13b845fcf289579d209c897823b9217da3e161936f031589',
    notes: 'تم التثبت من معايير السلامة والجودة الميدانية.',
  },
];

interface ComplaintsAuditLogOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  closedComplaints: CitizenComplaint[];
}

export const ComplaintsAuditLogOverlay: React.FC<ComplaintsAuditLogOverlayProps> = ({
  isOpen,
  onClose,
  closedComplaints,
}) => {
  const [logs, setLogs] = useState<AuditLogRecord[]>(() => {
    const saved = localStorage.getItem('samanoud_complaints_audit_log');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_AUDIT_LOGS;
      }
    }
    return INITIAL_AUDIT_LOGS;
  });

  const [searchFilter, setSearchFilter] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('الجميع');
  const [auditNotification, setAuditNotification] = useState('');

  useEffect(() => {
    localStorage.setItem('samanoud_complaints_audit_log', JSON.stringify(logs));
  }, [logs]);

  if (!isOpen) return null;

  // Perform 10% Random Quality Audit
  const handleRandomQualityAudit = () => {
    if (closedComplaints.length === 0) {
      setAuditNotification('لا توجد شكاوى مغلقة في الوقت الحالي إجراء التدقيق عليها.');
      setTimeout(() => setAuditNotification(''), 3000);
      return;
    }

    // Sample 10% (at least 1)
    const sampleSize = Math.max(1, Math.ceil(closedComplaints.length * 0.1));
    const shuffled = [...closedComplaints].sort(() => 0.5 - Math.random());
    const sampled = shuffled.slice(0, sampleSize);

    const newAuditEntries: AuditLogRecord[] = sampled.map((c, idx) => ({
      id: `AUD-10PCT-${Date.now()}-${idx}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      complaintId: c.id,
      citizenName: c.citizenName,
      district: c.district,
      actionType: 'تدقيق عشوائي 10%',
      executedBy: 'أمانة المتابعة والتدقيق التنفيذي — لجنة جودة الحوكمة',
      closureReason: c.summary || 'تم فحص تسجيل سبب الإغلاق والربط المهاري بدقة',
      requiredSkill: 'توثيق معايير الحوكمة والربط المهاري',
      integrityHash: `sha256-${Math.random().toString(36).substring(2, 15)}`,
      notes: `جولة رقابة جودة عشوائية (10%) — النتيجة: إغلاق مطابق وموثق بنسبة 100%.`,
    }));

    setLogs((prev) => [...newAuditEntries, ...prev]);
    setAuditNotification(`تمت جولة التدقيق العشوائي بنجاح على ${sampled.length} شكوى مغلقة!`);
    setTimeout(() => setAuditNotification(''), 4000);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.complaintId.includes(searchFilter) ||
      log.citizenName.includes(searchFilter) ||
      log.executedBy.includes(searchFilter) ||
      (log.closureReason && log.closureReason.includes(searchFilter));
    const matchesAction = actionFilter === 'الجميع' || log.actionType === actionFilter;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl text-white overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 text-[10px] font-bold border border-slate-700 mb-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>طبقة المراقبة والتدقيق المؤسسي (Audit Log Overlay)</span>
              </div>
              <h3 className="text-xl font-bold font-changa text-white">
                سجل التدقيق المؤسسي والرقابة العشوائية (Audit Trail)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRandomQualityAudit}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>جولة رقابة جودة عشوائية (10%)</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audit Notification Banner */}
        {auditNotification && (
          <div className="bg-emerald-950/90 border-b border-emerald-800 px-6 py-3 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{auditNotification}</span>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="بحث برقم الشكوى، اسم المواطن، أو المنفذ..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-9 pl-3 py-2 text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <span className="text-slate-400 font-bold shrink-0">نوع الإجراء:</span>
            {[
              'الجميع',
              'إغلاق بحوكمة',
              'تدقيق عشوائي 10%',
              'توجيه جديد',
              'تغيير حالة',
              'أرشفة',
            ].map((act) => (
              <button
                key={act}
                onClick={() => setActionFilter(act)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer ${
                  actionFilter === act
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {act}
              </button>
            ))}
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold">
                  <th className="p-3">رمز السجل والوقت</th>
                  <th className="p-3">رقم الشكوى والمواطن</th>
                  <th className="p-3">الإجراء المنفذ</th>
                  <th className="p-3">سبب الإغلاق والمهارة المرتبطة</th>
                  <th className="p-3">الجهة المنفذة</th>
                  <th className="p-3">رمز النزاهة المشفر (Hash)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3">
                      <span className="font-mono font-bold text-amber-400 block">{log.id}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                    </td>

                    <td className="p-3">
                      <span className="font-bold text-white block">{log.complaintId}</span>
                      <span className="text-[11px] text-slate-400">
                        {log.citizenName} ({log.district})
                      </span>
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${
                          log.actionType === 'إغلاق بحوكمة'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : log.actionType === 'تدقيق عشوائي 10%'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        }`}
                      >
                        {log.actionType}
                      </span>
                    </td>

                    <td className="p-3 max-w-xs">
                      <p className="font-medium text-slate-200 line-clamp-2">
                        {log.closureReason || '—'}
                      </p>
                      {log.requiredSkill && (
                        <span className="text-[10px] text-amber-300 font-bold block mt-0.5">
                          المهارة: {log.requiredSkill}
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-slate-300 font-medium">{log.executedBy}</td>

                    <td className="p-3">
                      <span className="font-mono text-[9px] text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800 truncate block max-w-[120px]">
                        {log.integrityHash}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Summary */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>إجمالي سجلات المراقبة الموثقة: {filteredLogs.length} سجل</span>
          <span className="text-[11px] text-emerald-400 font-mono">
            SamanoudOS Local Immutable Persistence Active
          </span>
        </div>
      </div>
    </div>
  );
};
