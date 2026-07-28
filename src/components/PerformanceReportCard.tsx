import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  CheckCircle2,
  TrendingUp,
  Award,
  Users,
  Building2,
  Printer,
  ShieldAlert,
  Calendar,
  Sparkles,
  X,
} from 'lucide-react';
import { PARTY_LOGO_PATH, SAMANOUD_DISTRICTS } from '../data/mockSamanoudData';

interface PerformanceReportCardProps {
  selectedDistrict: string;
}

export const PerformanceReportCard: React.FC<PerformanceReportCardProps> = ({ selectedDistrict }) => {
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  // Performance KPI Metrics Calculations
  const totalInitiatives = 184;
  const totalBeneficiaries = 148500;
  const totalResolvedComplaints = 1120;
  const overallResolutionRate = 96.4;
  const avgSlaTime = 18.2; // hours
  const citizenSatisfactionScore = 98.2; // %

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="bento-card-dark bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>تقرير الأداء الشهري والتنفيذي — أمانة مركز سمنود</span>
          </div>
          <h3 className="text-xl font-extrabold font-changa text-white">
            مؤشرات الأداء الرئيسية (KPIs) ونسب الإنجاز الميداني
          </h3>
          <p className="text-xs text-slate-300">
            ملخص تقرير هيئة مكتب الحزب لقطاع: <strong className="text-amber-400">{selectedDistrict}</strong>
          </p>
        </div>

        <button
          onClick={() => setShowPdfPreview(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4 fill-slate-950" />
          <span>تصدير التقرير التنفيذي PDF 📄</span>
        </button>
      </div>

      {/* KPI Performance Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            إنجاز المبادرات الميدانية
          </span>
          <div className="text-2xl font-black font-changa text-white">
            184 <span className="text-xs text-amber-400 font-sans">مبادرة</span>
          </div>
          <p className="text-[11px] text-emerald-400 font-medium">100% نجاح النزول القروي</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            نسبة الشكاوى المحلولة
          </span>
          <div className="text-2xl font-black font-changa text-white">
            {overallResolutionRate}%
          </div>
          <p className="text-[11px] text-emerald-400 font-medium">1,120 شكوى تم حسمها</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-400" />
            إجمالي المستفيدين
          </span>
          <div className="text-2xl font-black font-changa text-white">
            148.5K
          </div>
          <p className="text-[11px] text-slate-400">بمركز سمنود والـ 7 قرى</p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            معدل الاستجابة (SLA)
          </span>
          <div className="text-2xl font-black font-changa text-white">
            {avgSlaTime} <span className="text-xs text-purple-300 font-sans">ساعة</span>
          </div>
          <p className="text-[11px] text-purple-400 font-medium">سرعة قياسية مع المواطن</p>
        </div>
      </div>

      {/* Detailed Report Table Preview */}
      <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          بيان الاستجابات بجميع القطاعات والوحدات القروية لسمنود:
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold">
                <th className="py-2 px-3">الوحدة المحلية / القرية</th>
                <th className="py-2 px-3">النوع</th>
                <th className="py-2 px-3">السكان</th>
                <th className="py-2 px-3">الشكاوى النشطة</th>
                <th className="py-2 px-3">نسبة الإنجاز</th>
                <th className="py-2 px-3">الحالة المؤسسية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {SAMANOUD_DISTRICTS.map((d) => (
                <tr key={d.name} className="hover:bg-slate-900/60">
                  <td className="py-2.5 px-3 font-bold text-white">{d.name}</td>
                  <td className="py-2.5 px-3 text-slate-400">{d.type}</td>
                  <td className="py-2.5 px-3 font-mono">{d.population}</td>
                  <td className="py-2.5 px-3 font-mono text-amber-400">{d.activeComplaints}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">{d.resolvedPercentage}%</td>
                  <td className="py-2.5 px-3">
                    <span className="bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded text-[11px] border border-emerald-500/20 font-bold">
                      ممتاز
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF PRINT / PREVIEW MODAL */}
      {showPdfPreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-4xl w-full p-8 shadow-2xl space-y-6 relative border-4 border-amber-500/40">
            {/* Modal Header Actions */}
            <div className="flex items-center justify-between border-b pb-4 print:hidden">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
                <Printer className="w-4 h-4 text-amber-600" />
                معاينة تقرير الاجتماعات الشهرية لأمانة مركز سمنود
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrintPdf}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة / حفظ PDF</span>
                </button>
                <button
                  onClick={() => setShowPdfPreview(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 p-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Formatted Official Document Printable Section */}
            <div className="space-y-6 p-4 font-sans dir-rtl text-right print:p-0">
              {/* Document Header */}
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                <div className="flex items-center gap-3">
                  <img src={PARTY_LOGO_PATH} alt="حزب مستقبل وطن" className="w-16 h-16 rounded-full border-2 border-amber-500" />
                  <div>
                    <h2 className="text-xl font-extrabold font-changa text-slate-900">حزب مستقبل وطن</h2>
                    <h3 className="text-sm font-bold text-amber-700">أمانة محافظة الغربية — أمانة مركز سمنود</h3>
                    <p className="text-xs text-slate-600">أمانة الإعلام والتواصل السياسي والمتابعة الميدانية</p>
                  </div>
                </div>

                <div className="text-left text-xs font-mono space-y-1">
                  <p className="font-bold text-slate-900">رقم التقرير: REP-2026-SAM-07</p>
                  <p className="text-slate-600">التاريخ: {new Date().toLocaleDateString('ar-EG')}</p>
                  <p className="text-slate-600">الفترة: يوليو 2026</p>
                </div>
              </div>

              {/* Title */}
              <div className="text-center bg-slate-100 p-4 rounded-2xl border border-slate-300">
                <h2 className="text-lg font-black font-changa text-slate-900">
                  التقرير التنفيذي الشامل لأداء المبادرات والشكاوى الميدانية بمركز سمنود
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  شعارنا: كلنا بنبني مصر — تقرير دوري موجه لهيئة مكتب الأمانة
                </p>
              </div>

              {/* Executive Summary Grid */}
              <div className="grid grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="block text-slate-500 font-bold">المبادرات المنفذة</span>
                  <strong className="text-lg text-amber-900 font-mono">184 فعالية</strong>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="block text-slate-500 font-bold">المستفيدون المباشرون</span>
                  <strong className="text-lg text-emerald-900 font-mono">148,500 مواطن</strong>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <span className="block text-slate-500 font-bold">نسبة حسم البلاغات</span>
                  <strong className="text-lg text-blue-900 font-mono">96.4%</strong>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                  <span className="block text-slate-500 font-bold">متوسط زمن SLA</span>
                  <strong className="text-lg text-purple-900 font-mono">18.2 ساعة</strong>
                </div>
              </div>

              {/* District Breakdown Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900">بيان تفصيلي بقطاعات سمنود:</h4>
                <table className="w-full text-right text-xs border border-slate-300 border-collapse">
                  <thead>
                    <tr className="bg-slate-200 text-slate-900 font-bold">
                      <th className="p-2 border border-slate-300">القطاع / القرية</th>
                      <th className="p-2 border border-slate-300">التصنيف</th>
                      <th className="p-2 border border-slate-300">التعداد</th>
                      <th className="p-2 border border-slate-300">البلاغات النشطة</th>
                      <th className="p-2 border border-slate-300">نسبة الحسم</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SAMANOUD_DISTRICTS.map((d) => (
                      <tr key={d.name} className="border border-slate-300">
                        <td className="p-2 border border-slate-300 font-bold">{d.name}</td>
                        <td className="p-2 border border-slate-300">{d.type}</td>
                        <td className="p-2 border border-slate-300 font-mono">{d.population}</td>
                        <td className="p-2 border border-slate-300 font-mono text-amber-700">{d.activeComplaints}</td>
                        <td className="p-2 border border-slate-300 font-mono font-bold text-emerald-800">
                          {d.resolvedPercentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signatures & Seal Footer */}
              <div className="pt-8 border-t-2 border-slate-900 flex justify-between text-xs text-slate-800">
                <div className="text-center space-y-6">
                  <p className="font-bold">أمين الإعلام والتواصل السياسي</p>
                  <p className="italic text-slate-500">(التوقيع والاعتماد)</p>
                </div>
                <div className="text-center space-y-6">
                  <p className="font-bold">خاتم أمانة مركز سمنود</p>
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-600 mx-auto flex items-center justify-center text-[9px] font-bold text-amber-800">
                    مستقبل وطن
                  </div>
                </div>
                <div className="text-center space-y-6">
                  <p className="font-bold">أمين حزب مستقبل وطن بمركز سمنود</p>
                  <p className="italic text-slate-500">(التوقيع والاعتماد الرسمى)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
