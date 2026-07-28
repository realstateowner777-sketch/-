import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon,
  Shield,
  Search,
  Tag,
  Download,
  Copy,
  Check,
  Sparkles,
  Users,
  Award,
  BookOpen,
  Maximize2,
  ExternalLink,
  Layers,
  FileCheck2,
} from 'lucide-react';
import { SAMANOUD_PHOTO_LIBRARY, SamanoudPhotoAsset } from '../data/samanoudPhotoLibrary';

interface VisualIdentityLibraryProps {
  onSelectPhotoForVideo?: (photo: SamanoudPhotoAsset) => void;
}

export const VisualIdentityLibrary: React.FC<VisualIdentityLibraryProps> = ({
  onSelectPhotoForVideo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePhoto, setActivePhoto] = useState<SamanoudPhotoAsset | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'كافة الوسائط (الكل)', icon: Layers },
    { id: 'logos', label: 'الشعارات والأختام الرسمية', icon: Shield },
    { id: 'leadership', label: 'القيادة والاجتماعات السياسية', icon: Users },
    { id: 'field', label: 'النزول الميداني والشباب', icon: Sparkles },
    { id: 'training', label: 'التدريب والتثقيف (د. ياسر الصعيدي)', icon: BookOpen },
    { id: 'architecture', label: 'مخطط SamanoudOS', icon: FileCheck2 },
    { id: 'awards', label: 'دروع الاعتماد والتكريم', icon: Award },
  ];

  const filteredPhotos = SAMANOUD_PHOTO_LIBRARY.filter((photo) => {
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
    const matchesSearch =
      photo.title.includes(searchQuery) ||
      photo.description.includes(searchQuery) ||
      photo.usageTags.some((t) => t.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  const handleCopyUrl = (photo: SamanoudPhotoAsset) => {
    navigator.clipboard.writeText(photo.imageUrl);
    setCopiedId(photo.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/40">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>مكتبة الصور والهوية البصرية الرسمية — أمانة سمنود 2030</span>
          </div>
          <h3 className="text-2xl font-black font-changa text-white flex items-center gap-2">
            الأرشيف المعتمد للشعارات والصور الميدانية ودروع التثقيف
          </h3>
          <p className="text-xs text-slate-300">
            الصور الحقيقية والشعارات المعدنية والأختام الرسمية الخاصة بأمانة التدريب والتثقيف و أ. د. ياسر السعيد الصعيدي.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 shrink-0 text-xs font-mono">
          <ImageIcon className="w-4 h-4 text-amber-400" />
          <span className="text-slate-300">إجمالي الأصول: </span>
          <span className="text-amber-400 font-bold">{SAMANOUD_PHOTO_LIBRARY.length} عنصر حقيقي</span>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-amber-500/40 hover:text-amber-300'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="بحث في الصور والوسائط..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            whileHover={{ y: -4 }}
            className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-lg transition-all group flex flex-col justify-between"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer" onClick={() => setActivePhoto(photo)}>
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {photo.isPrimaryLogo && (
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 border border-amber-300 shadow-md">
                  الشعار الرئيسي 🌟
                </span>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhoto(photo);
                }}
                className="absolute bottom-2.5 left-2.5 p-1.5 rounded-lg bg-slate-950/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors backdrop-blur-sm"
                title="عرض الصورة بملء الشاشة"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Photo Metadata Details */}
            <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-400 block mb-1">
                  {photo.categoryLabel}
                </span>
                <h4 className="text-xs font-bold font-changa text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                  {photo.title}
                </h4>
                <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                  {photo.description}
                </p>
              </div>

              {/* Usage Tags */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1">
                  {photo.usageTags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[9px] font-semibold bg-slate-900 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800"
                    >
                      <Tag className="w-2.5 h-2.5 text-amber-400" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                  <button
                    onClick={() => handleCopyUrl(photo)}
                    className="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    {copiedId === photo.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-amber-400" />
                        <span>نسخ الرابط</span>
                      </>
                    )}
                  </button>

                  {onSelectPhotoForVideo && (
                    <button
                      onClick={() => onSelectPhotoForVideo(photo)}
                      className="py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-black flex items-center gap-1 shadow-sm transition-colors"
                    >
                      <span>تضمين بالفيديو</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal for Active Photo Details */}
      <AnimatePresence>
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-amber-500/50 rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              >
                ✕
              </button>

              <div className="space-y-1 text-right">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-block">
                  {activePhoto.categoryLabel}
                </span>
                <h3 className="text-xl font-bold font-changa text-white">{activePhoto.title}</h3>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-96 flex items-center justify-center bg-slate-950">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="max-h-96 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-sm text-slate-200 leading-relaxed">{activePhoto.description}</p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 block">وسوم الاستخدام والتطبيق:</span>
                <div className="flex flex-wrap gap-2">
                  {activePhoto.usageTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900 text-amber-300 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => handleCopyUrl(activePhoto)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2"
                >
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>نسخ مسار الأصل</span>
                </button>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black"
                >
                  إغلاق النافذة
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
