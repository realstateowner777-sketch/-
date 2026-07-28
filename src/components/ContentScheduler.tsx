import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Send,
  Eye,
  Plus,
  Trash2,
  CheckCircle2,
  Globe2,
  MessageSquare,
  Radio,
  Share2,
  Sparkles,
  X,
  Megaphone,
  Check,
  Building2,
  Tag
} from 'lucide-react';
import { PARTY_LOGO_PATH, PARTY_HERO_PATH, SAMANOUD_DISTRICTS } from '../data/mockSamanoudData';

export interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  platform: 'فيسبوك' | 'واتساب' | 'تليجرام' | 'تيك توك';
  district: string;
  pillar: string;
  scheduledTime: string;
  status: 'مجدول' | 'جاري النشر' | 'تم النشر';
  likesCount?: number;
  sharesCount?: number;
}

export const ContentScheduler: React.FC = () => {
  const [scheduledList, setScheduledList] = useState<ScheduledPost[]>([
    {
      id: 'sch-1',
      title: 'إطلاق القافلة الطبية الكبرى بقرية محلة زياد - حزب مستقبل وطن',
      content: 'تعلن أمانة حزب مستقبل وطن بمركز سمنود عن تسيير القافلة الطبية الكبرى الشاملة بقرية محلة زياد، لتوفير للكشف المجاني في 10 تخصصات وتحويل الحالات الحرجة للمستشفيات.',
      platform: 'فيسبوك',
      district: 'قرية محلة زياد',
      pillar: 'المبادرات الخدمية والنزول الميداني',
      scheduledTime: 'غداً، 10:00 صباحاً',
      status: 'مجدول',
      likesCount: 1420,
      sharesCount: 380,
    },
    {
      id: 'sch-2',
      title: 'توفير معرض السلع التموينية المخفضة بحي البحر بمدينة سمنود',
      content: 'ضمن المبادرة القومية لحزب مستقبل وطن لتخفيف الأعباء عن المواطنين، افتتحت أمانة سمنود منفذاً ثابتاً لبيع اللحوم والسلع الأساسية بأسعار مخفضة بنسبة 30%.',
      platform: 'تليجرام',
      district: 'مدينة سمنود',
      pillar: 'دعم السلع والتموين',
      scheduledTime: 'اليوم، 06:00 مساءً',
      status: 'جاري النشر',
      likesCount: 890,
      sharesCount: 210,
    },
    {
      id: 'sch-3',
      title: 'انطلاق تصفيات دوري مستقبل وطن الخماسي للشباب بالراهبين',
      content: 'تحت رعاية أمانة الشباب بمركز سمنود، تنطلق اليوم المباراة الافتتاحية لدوري مستقبل وطن للشباب بمركز شباب الراهبين بحضور القيادات التنفيذية والحزبية.',
      platform: 'واتساب',
      district: 'قرية الراهبين',
      pillar: 'دوري الشباب والرياضة',
      scheduledTime: 'أمس، 04:00 مساءً',
      status: 'تم النشر',
      likesCount: 2300,
      sharesCount: 540,
    },
  ]);

  // Form States
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [platform, setPlatform] = useState<'فيسبوك' | 'واتساب' | 'تليجرام' | 'تيك توك'>('فيسبوك');
  const [district, setDistrict] = useState('جميع القرى والقطاعات');
  const [pillar, setPillar] = useState('المبادرات الخدمية والنزول الميداني');
  const [scheduledTime, setScheduledTime] = useState('غداً، 12:00 ظهراً');

  // Preview Modal State
  const [previewPost, setPreviewPost] = useState<ScheduledPost | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postContent) return;

    const newPost: ScheduledPost = {
      id: `sch-${Date.now()}`,
      title: postTitle,
      content: postContent,
      platform,
      district,
      pillar,
      scheduledTime,
      status: 'مجدول',
      likesCount: 0,
      sharesCount: 0,
    };

    setScheduledList([newPost, ...scheduledList]);
    setPostTitle('');
    setPostContent('');
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setScheduledList((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePublishNow = (id: string) => {
    setScheduledList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'تم النشر' } : item))
    );
  };

  const getPlatformBadge = (p: string) => {
    switch (p) {
      case 'فيسبوك':
        return (
          <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 font-bold text-xs border border-blue-500/40 flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5" /> فيسبوك
          </span>
        );
      case 'تليجرام':
        return (
          <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-400 font-bold text-xs border border-purple-500/40 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5" /> تليجرام
          </span>
        );
      case 'واتساب':
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-600/20 text-emerald-400 font-bold text-xs border border-emerald-500/40 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" /> واتساب
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-amber-600/20 text-amber-400 font-bold text-xs border border-amber-500/40 flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5" /> تيك توك
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Calendar className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold font-changa text-white">
                جدول النشر التلقائي والمتابعة الإعلامية (Content Scheduler)
              </h3>
              <span className="px-2.5 py-0.5 text-[10px] font-black bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
                أمانة الإعلام
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              جدولة المنشورات والبيانات الحزبية عبر وسائل التواصل الاجتماعي مع خيار معاينة القالب الرسمية قبل النشر
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
          <span>جدولة منشور جديد</span>
        </button>
      </div>

      {/* Scheduled Posts List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            جدول المنشورات والبيانات القادمة ({scheduledList.length})
          </h4>
          <span className="text-xs text-slate-400 font-medium">محدث فورياً وفق خطة النشر</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {scheduledList.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl transition-all shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {getPlatformBadge(item.platform)}
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-300 text-xs font-semibold border border-slate-800 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-amber-400" /> {item.district}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      item.status === 'مجدول'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : item.status === 'جاري النشر'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/30 animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h5 className="text-sm font-extrabold font-changa text-white">{item.title}</h5>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{item.content}</p>

                <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>موعد النشر: <strong className="text-amber-300">{item.scheduledTime}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                <button
                  onClick={() => setPreviewPost(item)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold transition-all cursor-pointer border border-amber-500/30"
                  title="معاينة القالب قبل النشر"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>معاينة القالب</span>
                </button>

                {item.status !== 'تم النشر' && (
                  <button
                    onClick={() => handlePublishNow(item.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-emerald-600/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>نشر الآن</span>
                  </button>
                )}

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 transition-colors cursor-pointer border border-slate-800"
                  title="حذف الجدولة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD SCHEDULED POST MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-extrabold font-changa text-white">
                    جدولة بيان أو منشور إعلامي جديد
                  </h3>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddPost} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">عنوان البيان / المنشور:</label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="عنوان حماسي يبرز المبادرة أو الخدمة..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">نص المنشور والتفاصيل الميدانية:</label>
                  <textarea
                    rows={4}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="اكتب تفاصيل القافلة، المعرض، أو الخدمة المقدمة بمركز سمنود..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-white focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">منصة النشر:</label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-white"
                    >
                      <option value="فيسبوك">فيسبوك (الصفحة الرسمية)</option>
                      <option value="واتساب">واتساب (مجموعات القرى)</option>
                      <option value="تليجرام">تليجرام (القناة الرسمية)</option>
                      <option value="تيك توك">تيك توك / فيديوهات قصيرة</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">المنطقة / القرية:</label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2 text-xs text-white"
                    >
                      <option value="جميع القرى والقطاعات">جميع القرى والقطاعات</option>
                      {SAMANOUD_DISTRICTS.map((d) => (
                        <option key={d.name} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">تاريخ ووقت النشر:</label>
                  <input
                    type="text"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    placeholder="مثال: غداً، 03:00 عصراً"
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs text-white"
                    required
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black"
                  >
                    إضافة للجدول
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TEMPLATE PREVIEW MODAL */}
      <AnimatePresence>
        {previewPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  معاينة المنشور على قالب منصة {previewPost.platform}
                </span>
                <button
                  onClick={() => setPreviewPost(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Social Card Mockup Box */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4 text-xs shadow-inner">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={PARTY_LOGO_PATH}
                      alt="حزب مستقبل وطن"
                      className="w-10 h-10 rounded-full border border-amber-500/40 object-cover"
                    />
                    <div>
                      <div className="font-black text-white text-sm">حزب مستقبل وطن - أمانة سمنود</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span>منشور موثق</span> • <span>{previewPost.scheduledTime}</span>
                      </div>
                    </div>
                  </div>
                  {getPlatformBadge(previewPost.platform)}
                </div>

                {/* Body Text */}
                <div className="space-y-2 text-slate-200">
                  <h4 className="font-extrabold text-amber-300 font-changa text-base">
                    {previewPost.title}
                  </h4>
                  <p className="leading-relaxed whitespace-pre-line text-slate-200">
                    {previewPost.content}
                  </p>
                  <div className="text-amber-400 font-bold pt-1">
                    #مستقبل_وطن #أمانة_سمنود #كلنا_بنبني_مصر #{previewPost.district.replace(/\s+/g, '_')}
                  </div>
                </div>

                {/* Banner Graphic Preview */}
                <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 h-40">
                  <img
                    src={PARTY_HERO_PATH}
                    alt="فعاليات حزب مستقبل وطن"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-3">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-[10px]">
                      {previewPost.pillar}
                    </span>
                  </div>
                </div>

                {/* Footer Reactions Mock */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-bold">
                  <span>❤️ 👍 {previewPost.likesCount || 1200} تفاعل</span>
                  <span>🔄 {previewPost.sharesCount || 240} مشاركة</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setPreviewPost(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  إغلاق المعاينة
                </button>
                <button
                  onClick={() => {
                    handlePublishNow(previewPost.id);
                    setPreviewPost(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>اعتماد ونشر الآن</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
