import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  Zap,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert,
  Sliders,
  Calendar,
  FileText
} from 'lucide-react';
import { SAMANOUD_DISTRICTS } from '../data/mockSamanoudData';

interface ComplaintPredictorProps {
  selectedDistrict: string;
}

export const ComplaintPredictor: React.FC<ComplaintPredictorProps> = ({ selectedDistrict }) => {
  const [selectedSector, setSelectedSector] = useState<string>('الجميع');
  const [predictionMonth, setPredictionMonth] = useState<string>('أغسطس 2026');

  // Predictive algorithm mock dataset for Samanoud district
  const predictions = [
    {
      id: 'pred-1',
      district: 'قرية محلة زياد',
      sector: 'الكهرباء والطاقة',
      riskLevel: 'عالي جداً',
      riskScore: 88,
      predictedSurge: '+42%',
      estimatedComplaints: 145,
      confidence: '94%',
      primaryTrigger: 'ارتفاع الأحمال الصيفية وتذبذب المحولات الرئيسية بخط محلة زياد',
      recommendedAction: 'توجيه طلب عاجل لشركة الكهرباء واستبدال 2 محول محلي + تسيير سيارة صيانة تحسباً',
      urgencyColor: 'border-red-500/50 bg-red-950/30 text-red-400',
      badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40',
    },
    {
      id: 'pred-2',
      district: 'مدينة سمنود (حي البحر والمركز)',
      sector: 'التموين والغلاء',
      riskLevel: 'عالي',
      riskScore: 76,
      predictedSurge: '+28%',
      estimatedComplaints: 110,
      confidence: '91%',
      primaryTrigger: 'زيادة الإقبال على السلع الأساسية مع اقتراب الأعياد وسيرة المدارس',
      recommendedAction: 'افتتاح 3 منافذ "مستقبل وطن" إضافية لبيع السلع الغذائية واللحوم بأسعار مخفضة',
      urgencyColor: 'border-amber-500/50 bg-amber-950/30 text-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    {
      id: 'pred-3',
      district: 'قرية الراهبين',
      sector: 'مياه الشرب والصرف',
      riskLevel: 'متوسط',
      riskScore: 62,
      predictedSurge: '+18%',
      estimatedComplaints: 75,
      confidence: '89%',
      primaryTrigger: 'انسداد في الشبكة الفرعية بالطريق الغربي بالقرية',
      recommendedAction: 'التنسيق مع شركة مياه الشرب والدفع بـ 4 سيارات كسح وصيانة هيدروليكية',
      urgencyColor: 'border-yellow-500/50 bg-yellow-950/30 text-yellow-400',
      badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    },
    {
      id: 'pred-4',
      district: 'قرية ميت حبيب',
      sector: 'الخدمات الطبية والقوافل',
      riskLevel: 'عالي',
      riskScore: 81,
      predictedSurge: '+35%',
      estimatedComplaints: 130,
      confidence: '92%',
      primaryTrigger: 'نقص التخصصات في الوحدة الصحية المحلية بالقرية وتراكم طلبات الكشف الطبي',
      recommendedAction: 'إطلاق قافلة طبية مجانية كبرى لحزب مستقبل وطن تضم 10 تخصصات مع توفير العلاج مجاناً',
      urgencyColor: 'border-amber-500/50 bg-amber-950/30 text-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    {
      id: 'pred-5',
      district: 'قرية كفر حسان',
      sector: 'الطرق والرصف والنظافة',
      riskLevel: 'منخفض',
      riskScore: 42,
      predictedSurge: '+8%',
      estimatedComplaints: 35,
      confidence: '86%',
      primaryTrigger: 'حفر وتكسيرات ناتجة عن غاز مصر في المدخل الرئيسي',
      recommendedAction: 'متابعة إعادة الشيء لأصله مع الهيئة القومية للطرق وتسيير حملة نظافة حتمية',
      urgencyColor: 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
  ];

  // Filtered predictions
  const filteredPredictions = predictions.filter((p) => {
    const matchDistrict =
      selectedDistrict === 'الجميع' || p.district.includes(selectedDistrict);
    const matchSector =
      selectedSector === 'الجميع' || p.sector.includes(selectedSector);
    return matchDistrict && matchSector;
  });

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <BrainCircuit className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold font-changa text-white">
                المتنبه الذكي بالاحتياجات الميدانية (AI Complaint Predictor)
              </h3>
              <span className="px-2.5 py-0.5 text-[10px] font-black bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                خوارزميات التنبؤ المباشر
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              تحليل البيانات التاريخية والأحمال الميدانية لترشيح مناطق التدخل المسبق لأمانة مستقبل وطن بمركز سمنود
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">شهر التوقع:</span>
            <select
              value={predictionMonth}
              onChange={(e) => setPredictionMonth(e.target.value)}
              className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer"
            >
              <option value="أغسطس 2026" className="bg-slate-900">أغسطس 2026</option>
              <option value="سبتمبر 2026" className="bg-slate-900">سبتمبر 2026</option>
              <option value="أكتوبر 2026" className="bg-slate-900">أكتوبر 2026</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">القطاع:</span>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer"
            >
              <option value="الجميع" className="bg-slate-900">كافة القطاعات الخدمية</option>
              <option value="الكهرباء" className="bg-slate-900">الكهرباء والطاقة</option>
              <option value="التموين" className="bg-slate-900">التموين والغلاء</option>
              <option value="مياه الشرب" className="bg-slate-900">مياه الشرب والصرف</option>
              <option value="الخدمات الطبية" className="bg-slate-900">الخدمات الطبية</option>
              <option value="الطرق" className="bg-slate-900">الطرق والنظافة</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top Prediction Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-amber-500/30 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-bold">إجمالي المتوقع لمركز سمنود</div>
            <div className="text-xl font-extrabold font-changa text-amber-400 mt-0.5">490 شكوى ميدانية</div>
            <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> نسبة دقّة خوارزمية التنبؤ 91.5%
            </div>
          </div>
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <Zap className="w-6 h-6 text-amber-400" />
          </div>
        </div>

        <div className="p-4 bg-slate-950/80 rounded-2xl border border-red-500/30 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-bold">بؤرة الضغط الأعلى (High Risk Zone)</div>
            <div className="text-base font-extrabold font-changa text-red-400 mt-0.5">قرية محلة زياد (الكهرباء)</div>
            <div className="text-[10px] text-red-300 font-semibold mt-1">
              توقع +42% زيادة بسبب أحمال الصيف
            </div>
          </div>
          <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
            <AlertTriangle className="w-6 h-6 text-red-400 animate-bounce" />
          </div>
        </div>

        <div className="p-4 bg-slate-950/80 rounded-2xl border border-blue-500/30 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 font-bold">التدخل الميداني الموصى به</div>
            <div className="text-base font-extrabold font-changa text-blue-300 mt-0.5">قافلة طبية + 3 معارض سلع</div>
            <div className="text-[10px] text-blue-400 font-semibold mt-1">
              يغطي 80% من الاحتياجات المتوقعة
            </div>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <ShieldAlert className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Predictions Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            قائمة التنبؤات والتدخلات الميدانية المقترحة ({filteredPredictions.length})
          </h4>
          <span className="text-xs text-slate-400 font-medium">مرتبة حسب درجة الخطورة والاحتیاج</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredPredictions.map((pred) => (
            <motion.div
              key={pred.id}
              whileHover={{ scale: 1.005 }}
              className={`p-5 rounded-2xl bg-slate-950 border ${pred.urgencyColor} transition-all shadow-md space-y-3`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className={`px-3 py-1 rounded-full text-xs font-black border ${pred.badgeBg}`}>
                    {pred.riskLevel}
                  </span>
                  <div className="flex items-center gap-1.5 text-white font-extrabold font-changa text-base">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>{pred.district}</span>
                  </div>
                  <span className="text-xs text-slate-400">({pred.sector})</span>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold">
                  <div className="flex items-center gap-1 text-amber-400">
                    <span>نسبة الزيادة المتوقعة:</span>
                    <span className="font-mono text-sm">{pred.predictedSurge}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-300">
                    <span>الدقة:</span>
                    <span className="font-mono text-emerald-400">{pred.confidence}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    السبب الرئيسي للمشكلة المتوقعة:
                  </div>
                  <p className="text-slate-200 leading-relaxed font-medium">{pred.primaryTrigger}</p>
                </div>

                <div className="bg-blue-950/40 p-3.5 rounded-xl border border-blue-500/30 space-y-1">
                  <div className="font-bold text-blue-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    التدخل الاستباقي الموصى به لأمانة سمنود:
                  </div>
                  <p className="text-slate-100 leading-relaxed font-medium">{pred.recommendedAction}</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between text-xs gap-2">
                <span className="text-slate-400 font-medium">
                  الحمل المتوقع: <strong className="text-amber-400 font-mono">{pred.estimatedComplaints}</strong> طلب أو بلاغ
                </span>

                <button
                  onClick={() =>
                    alert(`تم تحويل توصية [${pred.district}] إلى أمانة المتابعة الميدانية بمركز سمنود لجدولة المبادرة.`)
                  }
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black transition-all cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <span>توجيه مبادرة استباقية الآن</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}

          {filteredPredictions.length === 0 && (
            <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-400 text-xs">
              لا توجد تنبؤات مطابقة للقطاع أو المنطقة المحددة حالياً.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
