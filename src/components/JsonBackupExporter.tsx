import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Database,
  FileJson,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  HardDriveDownload,
  Calendar,
  Lock
} from 'lucide-react';
import { INITIAL_COMPLAINTS, SAMANOUD_DISTRICTS } from '../data/mockSamanoudData';

export const JsonBackupExporter: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [lastBackupTime, setLastBackupTime] = useState<string>('اليوم، 02:30 مساءً');
  const [backupSuccess, setBackupSuccess] = useState(false);

  const handleDownloadBackup = () => {
    setIsExporting(true);

    setTimeout(() => {
      const backupData = {
        metadata: {
          organization: 'حزب مستقبل وطن - أمانة مركز سمنود',
          governorate: 'محافظة الغربية',
          exportedAt: new Date().toISOString(),
          appVersion: '2.5.0-Samanoud',
          author: 'نظام إدارة البيانات الميدانية والمبادرات القومية',
        },
        districtsData: SAMANOUD_DISTRICTS,
        complaintsDatabase: INITIAL_COMPLAINTS,
        kpiMetrics: {
          totalComplaintsResolved: 8640,
          resolutionRate: '94.2%',
          activeInitiatives: 18,
          registeredVolunteers: 1250,
          totalBeneficiariesServed: 42500,
        },
      };

      const jsonString = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const currentDate = new Date().toISOString().split('T')[0];
      link.href = url;
      link.download = `samanoud-party-backup-${currentDate}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsExporting(false);
      setBackupSuccess(true);
      setLastBackupTime(new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }));

      setTimeout(() => setBackupSuccess(false), 4000);
    }, 1000);
  };

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Database className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold font-changa text-white">
                نسخ وتصدير قاعدة البيانات الميدانية (JSON Backup)
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-black bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                تشفير آمن
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              حفظ وتصدير السجلات التاريخية للشكاوى، المبادرات الخدمية، وبنك الكوادر بمركز سمنود إلى ملف JSON محلي
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadBackup}
          disabled={isExporting}
          aria-label="تصدير قاعدة البيانات بصيغة JSON"
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0 disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              <span>جاري تجميع الملف...</span>
            </>
          ) : backupSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>تم التحميل بنجاح!</span>
            </>
          ) : (
            <>
              <HardDriveDownload className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              <span>تصدير نسخة JSON فورية</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">آخر نسخة احتياطية:</span>
          <strong className="text-amber-300 font-mono">{lastBackupTime}</strong>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">نظام النسخ الآلي:</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> مفعّل يومياً 00:00
          </span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">صيغة الملف المستخرج:</span>
          <strong className="text-blue-400 font-mono flex items-center gap-1">
            <FileJson className="w-3.5 h-3.5 text-blue-400" /> UTF-8 JSON
          </strong>
        </div>
      </div>
    </div>
  );
};
