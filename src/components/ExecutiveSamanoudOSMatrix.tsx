import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Sparkles,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Users,
  Target,
  Download,
  Filter,
  Cpu,
  Zap,
} from 'lucide-react';

export const ExecutiveSamanoudOSMatrix: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<'slide1' | 'slide2' | 'slide3' | 'slide4'>('slide2');
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = () => {
    const promptText = `[الهدف النهائي] إعداد مخرجات عرض تقديمي تشغيلي شامل ومفصل لأمانة التدريب والتثقيف بحزب "مستقبل وطن" - مركز سمنود...`;
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Slide Switcher */}
      <div className="bento-card-dark bg-slate-900/95 border border-amber-500/40 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>المكتب التنفيذي للقيادة — العرض التقديمي القياسي لمشروع SamanoudOS</span>
            </div>
            <h2 className="text-xl md:text-3xl font-extrabold font-changa text-white">
              الخطة التشغيلية والمصفوفة التنفيذية <span className="text-amber-400">لأمانة التدريب والتثقيف</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              تحويل العمل الحزبي بسمنود إلى "نظام تشغيل مؤسسي قياسي" (Standardized Operating System) قائم على الحوكمة والبيانات والذكاء الاصطناعي (12 أسبوعاً تشغيلياً).
            </p>
          </div>

          <button
            onClick={handleCopyPrompt}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-lg shadow-amber-500/20 flex items-center gap-2 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{copied ? 'تم نسخ الأمر التشغيلي! 📋' : 'نسخ البرومبت القياسي (Executive Prompt)'}</span>
          </button>
        </div>

        {/* Slide Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          <button
            onClick={() => setActiveSlide('slide1')}
            className={`p-3.5 rounded-2xl border text-xs font-bold text-right transition-all cursor-pointer ${
              activeSlide === 'slide1'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-[10px] block opacity-80 font-mono">شريحة 1</span>
            <span className="font-changa text-sm block">لوحة القيادة الاستراتيجية</span>
          </button>

          <button
            onClick={() => setActiveSlide('slide2')}
            className={`p-3.5 rounded-2xl border text-xs font-bold text-right transition-all cursor-pointer ${
              activeSlide === 'slide2'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-[10px] block opacity-80 font-mono">شريحة 2</span>
            <span className="font-changa text-sm block">المصفوفة التنفيذية الميدانية</span>
          </button>

          <button
            onClick={() => setActiveSlide('slide3')}
            className={`p-3.5 rounded-2xl border text-xs font-bold text-right transition-all cursor-pointer ${
              activeSlide === 'slide3'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-[10px] block opacity-80 font-mono">شريحة 3</span>
            <span className="font-changa text-sm block">الجدول الزمني (12 أسبوعاً)</span>
          </button>

          <button
            onClick={() => setActiveSlide('slide4')}
            className={`p-3.5 rounded-2xl border text-xs font-bold text-right transition-all cursor-pointer ${
              activeSlide === 'slide4'
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-[10px] block opacity-80 font-mono">شريحة 4</span>
            <span className="font-changa text-sm block">بروتوكول إدارة المخاطر</span>
          </button>
        </div>
      </div>

      {/* SLIDE 1: STRATEGIC DASHBOARD */}
      {activeSlide === 'slide1' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-extrabold font-changa text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>الشريحة 1: مقارنة التحول المؤسسي عبر SamanoudOS</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-slate-200">
              <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-4">الوضع التقليدي للعمل الحزبي</th>
                  <th className="p-4">الوضع المتحول عبر SamanoudOS</th>
                  <th className="p-4">القيمة المضافة الاستراتيجية للحزب</th>
                  <th className="p-4">آلية الحوكمة والذكاء الاصطناعي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/50">
                  <td className="p-4 text-red-300 font-medium">إدارة الفعاليات بالجهود الفردية والتقارير الورقية</td>
                  <td className="p-4 text-emerald-400 font-bold">منظومة رقمية موحدة لمتابعة الفعاليات لحظياً</td>
                  <td className="p-4 text-amber-300 font-semibold">استدامة الأثر وسرعة استخراج التقارير القيادية</td>
                  <td className="p-4 font-mono text-slate-300">أرشفة رقمية وتتبع جغرافي مع تدقيق بالوقت (Timestamp)</td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="p-4 text-red-300 font-medium">توزيع المتطوعين عشوائياً بدون مراعاة التخصص</td>
                  <td className="p-4 text-emerald-400 font-bold">مصفوفة مهارات (Skills Matrix) لتكليف الكوادر بذكاء</td>
                  <td className="p-4 text-amber-300 font-semibold">استغلال الموارد وتأمين غرف العمليات بالقرى</td>
                  <td className="p-4 font-mono text-slate-300">نظام تصنيف الكفاءات (Competency Engine)</td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="p-4 text-red-300 font-medium">حل الشكاوى بصورة وقتية دون علاج الأسباب المباشرة</td>
                  <td className="p-4 text-emerald-400 font-bold">ربط كل شكوى حُسمت بمبادرة قروية قائمة مستدامة</td>
                  <td className="p-4 text-amber-300 font-semibold">بناء شعبية حقيقية وتأمين التواجد الميداني الحزبي</td>
                  <td className="p-4 font-mono text-slate-300">خريطة تحوّل الأثر (InitiativeImpactMapper)</td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="p-4 text-red-300 font-medium">اعتماد التقارير السردية دون مؤشرات أداء رقمية</td>
                  <td className="p-4 text-emerald-400 font-bold">مؤشرات أداء قياسية (KPIs) ووسائل تحقق صارمة</td>
                  <td className="p-4 text-amber-300 font-semibold">القضاء على تقديرات Results غير الواقعية</td>
                  <td className="p-4 font-mono text-slate-300">WorkflowEnforcer وتحقق بالصور والإحداثيات</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SLIDE 2: FIELD EXECUTIVE MATRIX */}
      {activeSlide === 'slide2' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-extrabold font-changa text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" />
              <span>الشريحة 2: المصفوفة التنفيذية الميدانية لأمانة التدريب والتثقيف بسمنود</span>
            </h3>
            <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/40 font-bold">
              5 برامج قياسية متخصصة
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-slate-200">
              <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">الرمز</th>
                  <th className="p-3">البرنامج والورشة التدريبية</th>
                  <th className="p-3">النطاق الجغرافي</th>
                  <th className="p-3">المستهدف الكمي</th>
                  <th className="p-3">اللوجستيات المطلوبة</th>
                  <th className="p-3">مؤشر الأداء (KPI)</th>
                  <th className="p-3">وسيلة التحقق (MoV)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                <tr className="hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-bold text-amber-400">TRN-01</td>
                  <td className="p-3 font-bold text-white">التثقيف السياسي والتواصل الجماهيري الرقمي</td>
                  <td className="p-3 text-slate-300">مدينة سمنود ومقر الحزب الرئيسي</td>
                  <td className="p-3 text-emerald-400 font-bold">45 كادراً شبابياً (18-35 سنة)</td>
                  <td className="p-3 text-slate-400">شاشة ذكية، مواد مطبوعة، منصة SamanoudOS</td>
                  <td className="p-3 text-amber-300 font-bold">اجتياز 90% من الحضور لاختبار التقييم</td>
                  <td className="p-3 font-mono text-slate-300">شهادات مميكنة + تسجيل كود SamanoudOS</td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-bold text-amber-400">TRN-02</td>
                  <td className="p-3 font-bold text-white">إعداد قادة المحليات والعمل الجماهيري بالقرى</td>
                  <td className="p-3 text-slate-300">قرية محلة زياد والوحدة المحلية</td>
                  <td className="p-3 text-emerald-400 font-bold">60 متطوعاً ورئيس وحدة قروية</td>
                  <td className="p-3 text-slate-400">معدات عرض صوتية، استبيانات احتياجات القرى</td>
                  <td className="p-3 text-amber-300 font-bold">إعداد 12 دراسة حالة ميدانية للقرى</td>
                  <td className="p-3 font-mono text-slate-300">تقارير الميدان المرفوعة + إحداثيات GPS</td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-bold text-amber-400">TRN-03</td>
                  <td className="p-3 font-bold text-white">التحليل الإحصائي للشكاوى والتحليل التنبؤي بالذكاء الاصطناعي</td>
                  <td className="p-3 text-slate-300">قرية الراهبين وميت حبيب</td>
                  <td className="p-3 text-emerald-400 font-bold">30 أمين تنظيم ومسؤول متابعة</td>
                  <td className="p-3 text-slate-400">أجهزة كمبيوتر محمولة، واجهة ComplaintPredictor</td>
                  <td className="p-3 text-amber-300 font-bold">رصد وتحليل 100% من شكاوى القطاع</td>
                  <td className="p-3 font-mono text-slate-300">سجلات منصة SamanoudOS التنبؤية</td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-bold text-amber-400">TRN-04</td>
                  <td className="p-3 font-bold text-white">حوكمة إدارة الحملات والمعارض التموينية</td>
                  <td className="p-3 text-slate-300">قرية أبو صير وبنا أبو صير</td>
                  <td className="p-3 text-emerald-400 font-bold">40 عضواً بأمانات التموين والشباب</td>
                  <td className="p-3 text-slate-400">نماذج المتابعة، نظام باركود، بطاقات المعارض</td>
                  <td className="p-3 text-amber-300 font-bold">تغطية 5,000 أسرة بخصومات دقيقة</td>
                  <td className="p-3 font-mono text-slate-300">إيصالات التسليم الرقمية المصادق عليها</td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-bold text-amber-400">TRN-05</td>
                  <td className="p-3 font-bold text-white">التواصل مع النواب وصياغة الخطابات الحكومية</td>
                  <td className="p-3 text-slate-300">مركز سمنود (كافة الوحدات)</td>
                  <td className="p-3 text-emerald-400 font-bold">25 مسؤول مكتب نواب وكوادر قانونية</td>
                  <td className="p-3 text-slate-400">نماذج خطابات المتابعة الرسمية لـ محافظة الغربية</td>
                  <td className="p-3 text-amber-300 font-bold">رد وتفاعل الجهاز التنفيذي بنسبة 85%</td>
                  <td className="p-3 font-mono text-slate-300">أرشيف الخطابات الواردة والصادرة بالمنصة</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SLIDE 3: 12-WEEK OPERATIONAL ROADMAP */}
      {activeSlide === 'slide3' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-extrabold font-changa text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>الشريحة 3: الجدول الزمني التشغيلي الأسبوعي (12 أسبوعاً)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Phase 1 */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-blue-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-extrabold font-changa text-blue-400 text-sm">المرحلة الأولى: التأسيس والحوكمة</span>
                <span className="font-mono text-slate-400">الأسابيع 1 - 4</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>الأسبوع 1: إطلاق حوكمة بنك المواهب وتصنيف الكفاءات لـ 174 كادراً.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>الأسبوع 2: تنفيذ ورشة TRN-01 للتثقيف السياسي الرقمي بمقر المركز.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>الأسبوع 3: حصر الشكاوى واحتياجات القرى بـ محلة زياد وأبو صير.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>الأسبوع 4: اعتماد المسار الميداني للشكاوى كـ "مصدر واحد للحقيقة".</span>
                </li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-extrabold font-changa text-amber-400 text-sm">المرحلة الثانية: التوسع التشغيلي</span>
                <span className="font-mono text-slate-400">الأسابيع 5 - 8</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>الأسبوع 5: تنفيذ ورشة TRN-02 لقادة المحليات بمحلة زياد.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>الأسبوع 6: إطلاق القوافل المعرضية التموينية بقرية الراهبين.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>الأسبوع 7: تفعيل نظام "تنبيه النقص" لفرق المتطوعين الميدانية.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>الأسبوع 8: تنفيذ ورشة TRN-03 للتحليل التنبؤي بالذكاء الاصطناعي.</span>
                </li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-extrabold font-changa text-emerald-400 text-sm">المرحلة الثالثة: القياس والتصدير</span>
                <span className="font-mono text-slate-400">الأسابيع 9 - 12</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>الأسبوع 9: ربط الشكاوى المحلولة بـ خريطة تحول الأثر والمبادرات القائمة.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>الأسبوع 10: تنفيذ ورشة TRN-05 للتواصل مع النواب ومتابعة التنفيذيين.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>الأسبوع 11: مراجعة دقة البيانات وصدور التقرير التجميعي لشهرية الأمانة.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>الأسبوع 12: تقديم النموذج القياسي (Benchmark) للقيادة المركزية بالحزب.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE 4: RISK MANAGEMENT & GOVERNANCE PROTOCOL */}
      {activeSlide === 'slide4' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-extrabold font-changa text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>الشريحة 4: بروتوكول الحوكمة وإدارة المخاطر التشغيلية</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-slate-200">
              <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">نوع الخطر التشغيلي</th>
                  <th className="p-3">الإجراء الوقائي الصارم</th>
                  <th className="p-3">بديل الطوارئ الميداني</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-medium">
                <tr className="hover:bg-slate-800/50">
                  <td className="p-3 text-red-400 font-bold">ضعف التغطية أو إدخال بيانات غير دقيقة من القرى</td>
                  <td className="p-3 text-slate-300">تطبيق WorkflowEnforcer الملزم بتحديد سبب الإغلاق والرفع المباشر</td>
                  <td className="p-3 text-amber-300">تكليف مراجع ميداني من أمانة المتابعة بسمنود للتحقق العشوائي</td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="p-3 text-red-400 font-bold">عجز في عدد الكوادر المتطوعة في فعاليات إحدى القرى</td>
                  <td className="p-3 text-slate-300">نظام تنبيه النقص التلقائي (Resource Shortage Alert) للفعاليات</td>
                  <td className="p-3 text-amber-300">إرسال تعزيز عاجل من المستوى الأول/الثاني بـ بنك المواهب</td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="p-3 text-red-400 font-bold">تأخر الرد من الأجهزة الحكومية بمحافظة الغربية</td>
                  <td className="p-3 text-slate-300">صياغة مذكرات متابعة أسبوعية عبر مكتب النواب معززة بالأرقام</td>
                  <td className="p-3 text-amber-300">تحويل البلاغ لمبادرة مجتمعية حرة برعاية أمانة الحزب بسمنود</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
