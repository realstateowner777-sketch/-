import React, { useState } from 'react';
import { CitizenComplaint } from '../types';
import {
  CheckCircle2,
  X,
  ShieldCheck,
  Award,
  Users,
  Briefcase,
  Stethoscope,
  Scale,
  Video,
  Cpu,
  HeartHandshake,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

interface WorkflowEnforcerModalProps {
  complaint: CitizenComplaint;
  onClose: () => void;
  onConfirmResolve: (data: {
    closureReason: string;
    requiredSkill: string;
    assignedVolunteerName?: string;
    resolutionNotes: string;
  }) => void;
}

export const WorkflowEnforcerModal: React.FC<WorkflowEnforcerModalProps> = ({
  complaint,
  onClose,
  onConfirmResolve,
}) => {
  const [closureReason, setClosureReason] = useState('حل تنفيذي مباشر بالتنسيق مع الجهاز الحكومي');
  const [requiredSkill, setRequiredSkill] = useState<'طبي وصحي' | 'تنظيم وإدارة الفعاليات' | 'إعلام وصناعة محتوى' | 'استشارات قانونية' | 'تكنولوجيا ومعلومات' | 'عمل ميداني وتكافل'>('عمل ميداني وتكافل');
  const [assignedVolunteerName, setAssignedVolunteerName] = useState('د. طارق الحنفي (عضو أمانة الصحة)');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!closureReason || !requiredSkill) {
      setErrorMsg('يرجى تحديد سبب الإغلاق المؤسسي ومهارة بنك المواهب المرتبطة.');
      return;
    }

    onConfirmResolve({
      closureReason,
      requiredSkill,
      assignedVolunteerName,
      resolutionNotes: resolutionNotes.trim() || 'تم الحسم والمتابعة وفق معايير حوكمة الحزب.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-500 block">
                محددات الحوكمة — WorkflowEnforcer
              </span>
              <h3 className="text-base font-extrabold font-changa text-slate-900">
                إغلاق البلاغ رقم <span className="font-mono text-blue-600">{complaint.id}</span>
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-1">
          <span className="font-bold text-slate-900 block">موضوع الشكوى:</span>
          <p className="text-slate-700 font-medium leading-relaxed">"{complaint.complaintText}"</p>
          <span className="text-blue-600 font-bold block pt-1">
            القطاع: {complaint.district} — الإدارة: {complaint.assignedDepartment}
          </span>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          {/* STEP 1: Reason for Closure */}
          <div>
            <label className="block font-extrabold text-slate-800 mb-1.5">
              1. سبب الإغلاق وحسم البلاغ (مطلوب إلزامياً):
            </label>
            <select
              value={closureReason}
              onChange={(e) => setClosureReason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="حل تنفيذي مباشر بالتنسيق مع الجهاز الحكومي">
                1. حل تنفيذي مباشر بالتنسيق مع الجهاز الحكومي بمحافظة الغربية
              </option>
              <option value="إدراج الشكوى ضمن مبادرة حزبية قادمة">
                2. إدراج الشكوى وتوسيع حلها ضمن مبادرة حزبية قائمة أو قادمة
              </option>
              <option value="تدخل نيابي مباشر عبر مكتب نواب الحزب">
                3. تدخل نيابي مباشر عبر مكتب نواب حزب مستقبل وطن
              </option>
              <option value="معالجة مجتمعية عبر جهود الكوادر التطوعية">
                4. معالجة مجتمعية وتكافلية عبر جهود المتطوعين المباشرة
              </option>
            </select>
          </div>

          {/* STEP 2: Link to Skill in Talent Bank */}
          <div>
            <label className="block font-extrabold text-slate-800 mb-1.5">
              2. التخصص والمهارة المستفاد منها ببنك المواهب (ربط إجباري):
            </label>
            <select
              value={requiredSkill}
              onChange={(e) => setRequiredSkill(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 font-bold text-amber-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="عمل ميداني وتكافل">عمل ميداني وتكافل الجماهير</option>
              <option value="طبي وصحي">طبي وصحي (استشارات ورعاية علاجية)</option>
              <option value="استشارات قانونية">استشارات وصياغة مذكرات قانونية</option>
              <option value="تنظيم وإدارة الفعاليات">تنظيم وإدارة المبادرات الميدانية</option>
              <option value="إعلام وصناعة محتوى">إعلام وتوثيق وإرسال الردود</option>
              <option value="تكنولوجيا ومعلومات">تكنولوجيا ومعلومات ومتابعة رقمية</option>
            </select>
          </div>

          {/* STEP 3: Volunteer Recognition / Attribution */}
          <div>
            <label className="block font-extrabold text-slate-800 mb-1.5">
              3. الكادر/المتطوع المسهم ببنك المواهب (لتسجيل النقاط والساعات):
            </label>
            <input
              type="text"
              placeholder="اسم الكادر المسؤول..."
              value={assignedVolunteerName}
              onChange={(e) => setAssignedVolunteerName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* STEP 4: Resolution Notes */}
          <div>
            <label className="block font-extrabold text-slate-800 mb-1.5">
              4. ملاحظات وتفاصيل الحسم النهائية:
            </label>
            <textarea
              rows={3}
              placeholder="اكتب موجز النتيجة الميدانية لإخطار المواطن والأرشيف التاريخي..."
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            ></textarea>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              سيتم منح +10 ساعات تطوعية للكادر المسهم تلقائياً
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
              >
                إلغاء
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>اعتماد الإغلاق والحسم</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
