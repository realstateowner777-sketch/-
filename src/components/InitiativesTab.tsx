import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PARTY_HERO_PATH, MEDIA_STUDIO_PATH, PARTY_LOGO_PATH } from '../data/mockSamanoudData';
import { InitiativeGalleryItem } from '../types';
import {
  Award,
  Users,
  MapPin,
  CheckCircle2,
  ShoppingBag,
  Trophy,
  Stethoscope,
  Camera,
  Maximize2,
  X,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { VolunteerLeaderboard } from './VolunteerLeaderboard';
import { TalentBankManager } from './TalentBankManager';
import { InitiativeImpactMapper } from './InitiativeImpactMapper';
import { TalentBankGovernance } from './TalentBankGovernance';
import { GitCommit, ShieldCheck } from 'lucide-react';

interface InitiativesTabProps {
  selectedDistrict: string;
}

export const InitiativesGallery: React.FC<{
  filteredPhotos: InitiativeGalleryItem[];
  setSelectedPhoto: (photo: InitiativeGalleryItem | null) => void;
}> = ({ filteredPhotos, setSelectedPhoto }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {filteredPhotos.map((photo) => (
        <motion.div
          key={photo.id}
          variants={itemVariants}
          onClick={() => setSelectedPhoto(photo)}
          className="bento-card-dark bg-slate-900/90 border border-slate-800 hover:border-amber-500/60 rounded-3xl overflow-hidden shadow-xl transition-all group hover:-translate-y-1 cursor-pointer flex flex-col"
        >
          {/* Photo Container with Hover Zoom Effect */}
          <div className="relative overflow-hidden aspect-video border-b border-slate-800">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

            <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/90 text-slate-950 shadow-md backdrop-blur-sm">
              {photo.category}
            </span>

            <button className="absolute top-3 left-3 w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4 text-amber-400" />
            </button>

            <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-[11px] text-slate-200">
              <span className="flex items-center gap-1 font-bold text-amber-300 truncate">
                <MapPin className="w-3.5 h-3.5" />
                {photo.location}
              </span>
              <span className="bg-slate-950/90 px-2.5 py-1 rounded-lg border border-slate-800 font-mono text-slate-300 shrink-0">
                {photo.date}
              </span>
            </div>
          </div>

          {/* Photo Description Box */}
          <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <h3 className="text-sm font-extrabold font-changa text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                {photo.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed line-clamp-2">{photo.caption}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                المستفيدين: <strong className="text-amber-300">{photo.beneficiaries}</strong>
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1 text-[11px]">
                عرض الفعالية ←
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export const InitiativesTab: React.FC<InitiativesTabProps> = ({ selectedDistrict }) => {
  const [activeTabSection, setActiveTabSection] = useState<'initiatives' | 'gallery' | 'leaderboard' | 'talent' | 'impact' | 'talent-governance'>('impact');
  const [activeCategory, setActiveCategory] = useState<string>('الجميع');
  const [selectedPhoto, setSelectedPhoto] = useState<InitiativeGalleryItem | null>(null);

  const categories = [
    { id: 'الجميع', label: 'كافة المبادرات الميدانية' },
    { id: 'صحة ورعاية', label: 'القوافل الطبية والعلاج' },
    { id: 'حماية اجتماعية', label: 'معارض السلع المخفضة' },
    { id: 'شباب ورياضة', label: 'دوري مستقبل وطن والرياضة' },
    { id: 'خدمات النواب', label: 'استجابة طلبات الأهالي' },
  ];

  const galleryCategories = [
    'الجميع',
    'القوافل الطبية',
    'معارض السلع',
    'بطولات الشباب',
    'تكريم الحفظة',
    'خدمة المواطنين',
  ];

  const photoGallery: InitiativeGalleryItem[] = [
    {
      id: 'photo-1',
      title: 'القافلة الطبية المجانية بالوحدة الصحية بقرية محلة زياد',
      category: 'القوافل الطبية',
      location: 'قرية محلة زياد — سمنود',
      date: '25 يوليو 2026',
      beneficiaries: '3,450 مواطن',
      imageUrl: PARTY_HERO_PATH,
      aspectRatio: 'video',
      caption: 'جانب من توقيع الكشف الطبي وصرف الأدوية بالمجان لأهالينا في قرية محلة زياد برعاية نواب حزب مستقبل وطن.',
      tags: ['صحة', 'محلة زياد', 'علاج مجاني'],
    },
    {
      id: 'photo-2',
      title: 'معرض السلع الغذائية التموينية بأسعار مخفضة بمدينة سمنود',
      category: 'معارض السلع',
      location: 'ميدان البدراوي — مدينة سمنود',
      date: '20 يوليو 2026',
      beneficiaries: '12,000 أسرة',
      imageUrl: MEDIA_STUDIO_PATH,
      aspectRatio: 'square',
      caption: 'إقبال كثيف من المواطنين على منافذ حزب مستقبل وطن لبيع السلع التموينية واللحوم البلدية بخصومات تصل إلى 30%.',
      tags: ['سلع مخفضة', 'سمنود', 'حماية الأسرة'],
    },
    {
      id: 'photo-3',
      title: 'نهائي دوري مستقبل وطن الخماسي لشباب مركز سمنود',
      category: 'بطولات الشباب',
      location: 'مركز شباب الراهبين — سمنود',
      date: '15 يوليو 2026',
      beneficiaries: '64 فريقاً رياضيًا',
      imageUrl: PARTY_HERO_PATH,
      aspectRatio: 'portrait',
      caption: 'أجواء حماسية وتتويج الفرق الفائزة بكأس دوري مستقبل وطن بمركز سمنود بحضور قيادات أمانة الغربية.',
      tags: ['شباب', 'الراهبين', 'دوري كروي'],
    },
    {
      id: 'photo-4',
      title: 'احتفالية تكريم حفظة القرآن الكريم بالوحدة المحلية بأبو صير',
      category: 'تكريم الحفظة',
      location: 'قرية أبو صير — مركز سمنود',
      date: '10 يوليو 2026',
      beneficiaries: '250 طالب وطالبة',
      imageUrl: MEDIA_STUDIO_PATH,
      aspectRatio: 'video',
      caption: 'تكريم المتميزين وحفظة كتاب الله الكامل بقرى أبو صير وتوزيع جوائز رحلات عمرة ومكافآت مالية تشجيعية.',
      tags: ['تكريم', 'أبو صير', 'قرآن كريم'],
    },
    {
      id: 'photo-5',
      title: 'مكتب استقبال خدمة المواطنين وتلقي الطلبات بمقر الحزب',
      category: 'خدمة المواطنين',
      location: 'المقر الرئيسي بسمنود',
      date: 'لقاء أسبوعي دوري',
      beneficiaries: '850 طلب شهرياً',
      imageUrl: PARTY_LOGO_PATH,
      aspectRatio: 'square',
      caption: 'متابعة طلبات العلاج على نفقة الدولة والشكاوى الميدانية بحضور هيئة مكتب ونواب حزب مستقبل وطن.',
      tags: ['خدمات النواب', 'سمنود', 'طلبات الأهالي'],
    },
    {
      id: 'photo-6',
      title: 'قافلة توزيع المواد التموينية بالقرى الأكثر احتياجاً',
      category: 'معارض السلع',
      location: 'قرى بنا أبوصير وميت حبيب وكفر حسان',
      date: '5 يوليو 2026',
      beneficiaries: '4,500 أسرة',
      imageUrl: PARTY_HERO_PATH,
      aspectRatio: 'video',
      caption: 'وصول القوافل التكافلية لحزب مستقبل وطن حتى أبعد القرى برعاية أمانة العمل الجماهيري بسمنود.',
      tags: ['تضامن', 'بنا أبوصير', 'قوافل الخير'],
    },
  ];

  const filteredPhotos = photoGallery.filter((p) => {
    const matchesCat = activeCategory === 'الجميع' || p.category === activeCategory;
    const matchesDistrict = selectedDistrict === 'الجميع' || p.location.includes(selectedDistrict);
    return matchesCat && matchesDistrict;
  });

  const initiatives = [
    {
      id: 'init-1',
      title: 'القافلة الطبية المجانية الشاملة بمركز سمنود',
      category: 'صحة ورعاية',
      district: 'محلة زياد والوحدات القروية',
      date: '25 يوليو 2026',
      beneficiaries: '3,450 مواطن',
      status: 'جارية المتابعة',
      image: PARTY_HERO_PATH,
      description: 'تقديم الفحوصات والأدوية بالمجان لكبار السن وأصحاب الأمراض المزمنة والأطفال برعاية نواب حزب مستقبل وطن وبالتنسيق مع أمانة الصحة.',
      highlights: ['تخصصات باطنة وأطفال وعظام', 'صرف العلاج بالمجان 100%', 'تحويل الحالات الحرجة للمستشفيات'],
      icon: Stethoscope,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    {
      id: 'init-2',
      title: 'معرض حزب مستقبل وطن للسلع الغذائية والمواد التموينية المخفضة',
      category: 'حماية اجتماعية',
      district: 'مدينة سمنود - ميدان البدراوي',
      date: '20 يوليو 2026',
      beneficiaries: '12,000 أسرة',
      status: 'مستمر طوال الشهر',
      image: MEDIA_STUDIO_PATH,
      description: 'توفير كافة السلع الأساسية (زيت، أرز، سكر، لحوم طازجة) بخصومات تصل إلى 30% لدعم الأسر وتخفيف الأعباء المعيشية.',
      highlights: ['أسعار بتخفيضات تصل لـ 30%', 'لحوم بلدية طازجة يومياً', 'منافذ متحركة تجوب القرى'],
      icon: ShoppingBag,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    {
      id: 'init-3',
      title: 'دوري مستقبل وطن للشباب بمركز سمنود - الموسم الخامس',
      category: 'شباب ورياضة',
      district: 'قرية الراهبين ومراكز الشباب',
      date: '15 يوليو 2026',
      beneficiaries: '64 فريقاً رياضيًا',
      status: 'التصفيات النهائية',
      image: PARTY_HERO_PATH,
      description: 'أكبر بطولة كروية لشباب القرى والمدن بمركز سمنود لاكتشاف المواهب الشابة وتعزيز الروح الرياضية والعمل الجماعي.',
      highlights: ['مشاركات واسعة من قرى سمنود', 'جوائز مالية وكؤوس للمراكز الأولى', 'حضور قيادات الحزب والشخصيات العامة'],
      icon: Trophy,
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    },
    {
      id: 'init-4',
      title: 'مكتب خدمة المواطنين وتلقي الطلبات برعاية نواب الحزب',
      category: 'خدمات النواب',
      district: 'مقر أمانة سمنود الرئيسي',
      date: 'أسبوعي - الأحد والأربعاء',
      beneficiaries: 'أكثر من 850 طلب شهرياً',
      status: 'خدمة يومية مستمرة',
      image: MEDIA_STUDIO_PATH,
      description: 'استقبال مواطني مركز سمنود لمتابعة طلبات العلاج على نفقة الدولة، الشكاوى التنفيذية، وإيصال صوت المواطن للجهات المختصة.',
      highlights: ['متابعة رقمية مباشرة للطلبات', 'فريق قانوني وتنفيذي مخصص', 'ربط مباشر مع الوزارات والهيئات'],
      icon: Users,
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    },
  ];

  const filtered = initiatives.filter((item) => {
    const matchesCategory = activeCategory === 'الجميع' || item.category === activeCategory;
    const matchesDistrict = selectedDistrict === 'الجميع' || item.district.includes(selectedDistrict);
    return matchesCategory && matchesDistrict;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-amber-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <img src={PARTY_HERO_PATH} alt="مبادرات مستقبل وطن سمنود" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>سجل المبادرات والمعرض الفوتوغرافي — حزب مستقبل وطن مركز سمنود</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold font-changa text-white leading-tight">
            مبادراتنا الميدانية في خدمة <span className="text-amber-400">أهالي سمنود</span>
          </h2>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            نصل إلى كل بيت وقرية بمركز سمنود عبر القوافل الطبية، معارض حماية الأسرة، بطولات الشباب، ومكاتب خدمة المواطنين المباشرة برعاية نواب وأعضاء الحزب.
          </p>

          {/* Sub-Section Switcher Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTabSection('impact')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTabSection === 'impact'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:text-amber-300'
              }`}
            >
              <GitCommit className="w-4 h-4" />
              <span>خريطة أثر الشكاوى والمبادرات 🔗</span>
            </button>

            <button
              onClick={() => setActiveTabSection('talent-governance')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTabSection === 'talent-governance'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:text-amber-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>حوكمة بنك المواهب والمهارات 🛡️</span>
            </button>

            <button
              onClick={() => setActiveTabSection('gallery')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTabSection === 'gallery'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:text-amber-300'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>معرض صور الفعاليات 📸</span>
            </button>

            <button
              onClick={() => setActiveTabSection('initiatives')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTabSection === 'initiatives'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:text-amber-300'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>سجل المبادرات الخدمية</span>
            </button>

            <button
              onClick={() => setActiveTabSection('leaderboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTabSection === 'leaderboard'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:text-amber-300'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>لوحة الشرف 🏆</span>
            </button>

            <button
              onClick={() => setActiveTabSection('talent')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTabSection === 'talent'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:text-amber-300'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>سجل الكوادر 💼</span>
            </button>
          </div>
        </div>
      </div>

      {/* PHOTO GALLERY VIEW (BENTO GRID WITH HOVER ZOOM) */}
      {activeTabSection === 'gallery' && (
        <div className="space-y-6">
          {/* Gallery Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-500/40 hover:text-amber-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Bento Grid Photo Showcase Component */}
          <InitiativesGallery filteredPhotos={filteredPhotos} setSelectedPhoto={setSelectedPhoto} />

          {/* Photo Lightbox Modal */}
          {selectedPhoto && (
            <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
              <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative space-y-4">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-slate-950/80 border border-slate-700 text-white flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative aspect-video w-full border-b border-slate-800">
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 right-3 bg-slate-950/90 px-3 py-1 rounded-full border border-amber-500/30 text-xs font-bold text-amber-300">
                    {selectedPhoto.category}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedPhoto.location}</span>
                      <span>•</span>
                      <span>{selectedPhoto.date}</span>
                    </div>
                    <h2 className="text-xl font-extrabold font-changa text-white">{selectedPhoto.title}</h2>
                  </div>

                  <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                    {selectedPhoto.caption}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
                    <span className="text-slate-400 font-medium">
                      إجمالي المستفيدين: <strong className="text-amber-300 font-bold">{selectedPhoto.beneficiaries}</strong>
                    </span>
                    <div className="flex items-center gap-1.5">
                      {selectedPhoto.tags.map((t) => (
                        <span key={t} className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg text-[11px]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* INITIATIVES CARDS GRID VIEW */}
      {activeTabSection === 'initiatives' && (
        <div className="space-y-6">
          {/* Categories Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-500/40 hover:text-amber-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bento-card-dark bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-xl transition-all group hover:-translate-y-1 space-y-4 p-6"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${item.badgeColor}`}
                  >
                    {item.category}
                  </span>

                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-[11px] text-slate-200">
                    <span className="flex items-center gap-1 font-bold text-amber-300">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.district}
                    </span>
                    <span className="bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 font-mono text-slate-300">
                      {item.date}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-extrabold font-changa text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                  <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-400 block">أبرز نتائج الفعالية:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-slate-900 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <span className="text-slate-400 font-medium">المستفيدون: <strong className="text-amber-300">{item.beneficiaries}</strong></span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      {item.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* IMPACT MAPPER VIEW */}
      {activeTabSection === 'impact' && (
        <InitiativeImpactMapper selectedDistrict={selectedDistrict} />
      )}

      {/* TALENT GOVERNANCE VIEW */}
      {activeTabSection === 'talent-governance' && (
        <TalentBankGovernance selectedDistrict={selectedDistrict} />
      )}

      {/* VOLUNTEER LEADERBOARD VIEW */}
      {activeTabSection === 'leaderboard' && (
        <VolunteerLeaderboard selectedDistrict={selectedDistrict} />
      )}

      {/* TALENT BANK MANAGER VIEW */}
      {activeTabSection === 'talent' && (
        <TalentBankManager selectedDistrict={selectedDistrict} />
      )}
    </div>
  );
};
