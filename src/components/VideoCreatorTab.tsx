import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VideoScript, VideoScene, PromoImageResult } from '../types';
import { INITIAL_VIDEO_SCRIPTS, MEDIA_STUDIO_PATH, PARTY_HERO_PATH, PARTY_LOGO_PATH } from '../data/mockSamanoudData';
import {
  Video,
  Sparkles,
  Copy,
  Check,
  Film,
  Image as ImageIcon,
  Clock,
  Tv,
  Layers,
  Wand2,
  RefreshCw,
  Volume2,
  Camera,
  Share2,
} from 'lucide-react';

interface VideoCreatorTabProps {
  selectedDistrict: string;
}

export const VideoCreatorTab: React.FC<VideoCreatorTabProps> = ({ selectedDistrict }) => {
  const [scripts, setScripts] = useState<VideoScript[]>(INITIAL_VIDEO_SCRIPTS);
  const [selectedScript, setSelectedScript] = useState<VideoScript>(INITIAL_VIDEO_SCRIPTS[0]);
  
  // Script Generation State
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('Facebook Reel & TikTok');
  const [videoStyle, setVideoStyle] = useState('حماسي وميداني مع صور سريعة');
  const [isGenerating, setIsGenerating] = useState(false);

  // Promo Image Generator Tool State
  const [promoPrompt, setPromoPrompt] = useState('');
  const [promoStyle, setPromoStyle] = useState('واقعي سينمائي إعلامي');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '9:16'>('16:9');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedPromoList, setGeneratedPromoList] = useState<PromoImageResult[]>([
    {
      title: 'القافلة الطبية الكبرى بقرية محلة زياد — مستقبل وطن',
      subtitle: 'أمانة مركز سمنود — الخدمات الصحية بالمجان',
      visualConcept: 'صورة واقعية سينمائية للطواقم الطبية والأهالي بالهوية الرسمية للحزب',
      suggestedColors: ['#0b1329', '#f59e0b', '#10b981'],
      partyBranding: 'شعار حزب مستقبل وطن أمانة سمنود — كلنا بنبني مصر',
      promptEnglish: 'Photorealistic Egyptian Mostaqbal Watan medical clinic event in Samanoud',
      imageUrl: PARTY_HERO_PATH,
    },
  ]);

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);

  // Teleprompter State
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [teleprompterSpeed, setTeleprompterSpeed] = useState(2);

  const handleGenerateScript = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/gemini/generate-video-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          platform,
          videoStyle,
          targetAudience: `أهالي وسكان ${selectedDistrict === 'الجميع' ? 'مركز سمنود كاملاً' : selectedDistrict}`,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const generated: VideoScript = {
          ...resData.data,
          id: `script-${Date.now()}`,
          createdAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          scenes: resData.data.scenes.map((s: VideoScene, idx: number) => ({
            ...s,
            previewImageUrl:
              idx % 3 === 0
                ? MEDIA_STUDIO_PATH
                : idx % 3 === 1
                ? PARTY_HERO_PATH
                : PARTY_LOGO_PATH,
          })),
        };

        setScripts([generated, ...scripts]);
        setSelectedScript(generated);
        setTopic('');
      }
    } catch (error) {
      console.error('Failed to generate video script:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeneratePromoImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoPrompt.trim()) return;

    setIsGeneratingImage(true);
    try {
      const response = await fetch('/api/gemini/generate-promo-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promoPrompt,
          style: promoStyle,
          aspectRatio,
          initiativeTitle: promoPrompt,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const newPromo: PromoImageResult = {
          ...resData.data,
          imageUrl: resData.data.imageUrl || PARTY_HERO_PATH,
        };
        setGeneratedPromoList([newPromo, ...generatedPromoList]);
      }
    } catch (error) {
      console.error('Failed to generate promo image:', error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text);
    if (index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 animate-fadeIn"
    >
      {/* Header Banner - Party Media Studio */}
      <motion.div
        variants={itemVariants}
        className="bento-card-dark relative overflow-hidden rounded-3xl bg-slate-900 border border-amber-500/30 p-6 md:p-8 shadow-2xl"
      >
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src={MEDIA_STUDIO_PATH}
            alt="استوديو حزب مستقبل وطن"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
            <Video className="w-4 h-4 text-amber-400" />
            استوديو المحتوى المرئي بالفيديوهات والصور — حزب مستقبل وطن سمنود
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold font-changa text-white leading-tight">
            صانع الفيديوهات والبوسترات الترويجية <span className="text-amber-400">بالذكاء الاصطناعي</span>
          </h2>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            قم بتحويل المبادرات والفعاليات الميدانية لأمانة سمنود إلى سيناريوهات فيديوهات فيروسية متكاملة المشاهد وصور ترويجية ملهمة تعكس جهود الحزب.
          </p>
        </div>
      </motion.div>

      {/* Main Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols) - Script Generator & Image Tool */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Script Generator Card */}
          <motion.div
            variants={itemVariants}
            className="bento-card-dark bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-5"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Wand2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-changa text-white">توليد سيناريو فيديو جديد</h3>
                <p className="text-xs text-slate-400">إنشاء مشاهد مصورة وتعليق صوتي بدقة عالية</p>
              </div>
            </div>

            <form onSubmit={handleGenerateScript} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  موضوع الفيديو / المبادرة الميدانية:
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="مثال: القافلة الطبية الشاملة بقرية محلة زياد وتوفير العلاج بالمجان لكبار السن والأطفال..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors h-20 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">المنصة المستهدفة:</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Facebook Reel & TikTok">Facebook Reel / TikTok</option>
                    <option value="YouTube Shorts">YouTube Shorts</option>
                    <option value="فيديو توثيقي مطول">فيديو توثيقي (صفحة الحزب)</option>
                    <option value="تقرير إعلامي مصور">تقرير إعلامي للصحافة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">طابع الفيديو:</label>
                  <select
                    value={videoStyle}
                    onChange={(e) => setVideoStyle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="حماسي وميداني مع صور سريعة">حماسي وميداني</option>
                    <option value="تأثير إنساني وقريب من المواطن">إنساني وقريب من الشارع</option>
                    <option value="إنجازات بالأرقام والمؤشرات">إنجازات بالأرقام</option>
                    <option value="رسالة وطنية رسمية">رسالة وطنية رسمية</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating || !topic.trim()}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-extrabold p-3 rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>جاري توليد مشاهد الفيديو بالذكاء الاصطناعي...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 fill-slate-950" />
                    <span>توليد القصة المصورة والسيناريو 🎬</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* AI Promo Image Generator Card (Imagen Powered) */}
          <motion.div
            variants={itemVariants}
            className="bento-card-dark bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-xl space-y-5"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-changa text-white">مولد التصاميم الإعلانية (Imagen) 🖼️</h3>
                <p className="text-xs text-amber-400">إنشاء مرئيات المبادرات بتقنية Imagen بالهوية الرسمية</p>
              </div>
            </div>

            <form onSubmit={handleGeneratePromoImage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  عنوان المبادرة / الفعالية الوطنية:
                </label>
                <input
                  type="text"
                  value={promoPrompt}
                  onChange={(e) => setPromoPrompt(e.target.value)}
                  placeholder="مثال: القافلة الطبية الكبرى بمركز سمنود - حزب مستقبل وطن..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">النمط البصري:</label>
                  <select
                    value={promoStyle}
                    onChange={(e) => setPromoStyle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="واقعي سينمائي إعلامي">واقعي سينمائي</option>
                    <option value="بوستر رسمي ملهم للحزب">بوستر إعلامي رسمي</option>
                    <option value="إنفوجرافيك بتمثيل بياني">إنفوجرافيك مدرج</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">الأبعاد:</label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="16:9">16:9 (فيسبوك وفيسبوك ريلز)</option>
                    <option value="1:1">1:1 (مربع انستجرام)</option>
                    <option value="9:16">9:16 (ستوري وتيك توك)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGeneratingImage || !promoPrompt.trim()}
                className="w-full bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-900 hover:from-blue-600 hover:to-indigo-700 text-amber-300 font-extrabold p-3 rounded-2xl border border-amber-500/40 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isGeneratingImage ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري توليد البوستر بتقنية Imagen...</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 text-amber-400" />
                    <span>توليد تصميم إعلاني ✨</span>
                  </>
                )}
              </button>
            </form>

            {/* Render Promo Image Results Grid */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>التصاميم الإعلانية المولدة ({generatedPromoList.length})</span>
                <span className="text-[10px] text-amber-400">تقنية Imagen</span>
              </h4>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {generatedPromoList.map((promo, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 space-y-3"
                  >
                    <div className="relative rounded-xl overflow-hidden aspect-video border border-slate-800 group">
                      <img
                        src={promo.imageUrl || PARTY_HERO_PATH}
                        alt={promo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                      <span className="absolute bottom-2 right-2 text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-bold">
                        Imagen AI Poster
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white font-changa">{promo.title}</h4>
                      <p className="text-xs text-slate-300">{promo.visualConcept}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                      <span className="text-amber-400 font-semibold">{promo.partyBranding}</span>
                      <button
                        onClick={() => copyToClipboard(promo.promptEnglish)}
                        className="text-slate-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>نسخ الوصف</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Saved Video Scripts Library */}
          <motion.div
            variants={itemVariants}
            className="bento-card-dark bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4"
          >
            <h3 className="text-sm font-bold font-changa text-slate-200 flex items-center justify-between">
              <span>مكتبة الفيديوهات الجاهزة ({scripts.length})</span>
              <span className="text-xs text-amber-400 font-normal">أمانة سمنود</span>
            </h3>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {scripts.map((sc) => (
                <div
                  key={sc.id || sc.title}
                  onClick={() => setSelectedScript(sc)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    selectedScript.title === sc.title
                      ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 flex-shrink-0">
                      <Film className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold line-clamp-1">{sc.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{sc.hook}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-1 rounded-lg whitespace-nowrap">
                    {sc.scenes.length} مشاهد
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right / Script Storyboard Inspector & Scene Previews (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            variants={itemVariants}
            className="bento-card-dark bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6"
          >
            {/* Script Details Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold">
                    {selectedScript.targetPlatform}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    المدة المتوقعة: {selectedScript.durationSeconds} ثانية
                  </span>
                </div>
                <h3 className="text-xl font-extrabold font-changa text-white">{selectedScript.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTeleprompterOpen(true)}
                  className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Tv className="w-4 h-4 text-amber-300" />
                  <span>قارئ النص (Teleprompter)</span>
                </button>

                <button
                  onClick={() =>
                    copyToClipboard(
                      `عنوان الفيديو: ${selectedScript.title}\nالـ Hook: ${selectedScript.hook}\n\n` +
                        selectedScript.scenes
                          .map(
                            (s) =>
                              `[مشهد ${s.sceneNumber}] (${s.duration})\nصوت: ${s.narrationText}\nصورة: ${s.visualDescription}`
                          )
                          .join('\n\n')
                    )
                  }
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-medium border border-slate-700 transition-all cursor-pointer"
                >
                  {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedScript ? 'تم النسخ!' : 'نسخ كامل السيناريو'}</span>
                </button>
              </div>
            </div>

            {/* Hook & Voiceover Tone Note */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 fill-amber-400" />
                  الجملة الافتتاحية الخاطفة (The Hook):
                </div>
                <p className="text-sm font-bold text-white leading-relaxed">"{selectedScript.hook}"</p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-1">
                <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  نبرة التعليق والموسيقى:
                </div>
                <p className="text-xs text-slate-200 font-medium">{selectedScript.voiceoverTone}</p>
                <p className="text-[11px] text-amber-300/80">🎼 {selectedScript.backgroundMusic}</p>
              </div>
            </div>

            {/* Scene-by-Scene Visual Storyboard List */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold font-changa text-amber-300 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                توزيع المشاهد المصورة والتعليق الصوتي ({selectedScript.scenes.length} مشاهد)
              </h4>

              <div className="space-y-4">
                {selectedScript.scenes.map((scene, idx) => (
                  <div
                    key={scene.sceneNumber}
                    className="bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-black">
                        المشهد {scene.sceneNumber}
                      </span>
                      <span className="font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        ⏱ {scene.duration}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Image Frame Preview */}
                      <div className="md:col-span-4 relative rounded-xl overflow-hidden border border-slate-800 aspect-video group">
                        <img
                          src={scene.previewImageUrl || MEDIA_STUDIO_PATH}
                          alt={`مشهد ${scene.sceneNumber}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                        <span className="absolute bottom-1.5 right-1.5 text-[10px] bg-slate-950/80 text-amber-300 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-500/30">
                          صورة مقترحة للمشهد
                        </span>
                      </div>

                      {/* Scene Text & Visual Instruction */}
                      <div className="md:col-span-8 space-y-2">
                        <div>
                          <span className="text-[11px] font-bold text-amber-400 block mb-0.5">
                            التعليق الصوتي (Voiceover):
                          </span>
                          <p className="text-sm font-semibold text-white leading-relaxed bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                            {scene.narrationText}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                            الوصف البصري واللقطة:
                          </span>
                          <p className="text-xs text-slate-300 italic">{scene.visualDescription}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => copyToClipboard(scene.narrationText, idx)}
                        className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedIndex === idx ? 'تم نسخ التعليق' : 'نسخ نص المشهد'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hashtags Bar */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-bold">الهاشتاجات الموصى بها:</span>
              {selectedScript.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-950 text-amber-300 px-2.5 py-1 rounded-lg border border-amber-500/20 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Teleprompter Modal View for Camera Presenters */}
      {isTeleprompterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-6 md:p-12 animate-fadeIn">
          {/* Controls Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <img src={PARTY_LOGO_PATH} alt="حزب مستقبل وطن" className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="text-lg font-bold font-changa text-white">قارئ النص المباشر (Teleprompter)</h3>
                <p className="text-xs text-amber-400">{selectedScript.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400">سرعة التمرير:</span>
                <button
                  onClick={() => setTeleprompterSpeed(Math.max(1, teleprompterSpeed - 1))}
                  className="px-2 py-0.5 bg-slate-800 rounded font-bold text-white hover:bg-slate-700"
                >
                  -
                </button>
                <span className="text-amber-300 font-mono font-bold">{teleprompterSpeed}x</span>
                <button
                  onClick={() => setTeleprompterSpeed(Math.min(5, teleprompterSpeed + 1))}
                  className="px-2 py-0.5 bg-slate-800 rounded font-bold text-white hover:bg-slate-700"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => setIsTeleprompterOpen(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold"
              >
                إغلاق ✕
              </button>
            </div>
          </div>

          {/* Teleprompter Text Canvas */}
          <div className="my-auto max-w-4xl mx-auto text-center space-y-8 overflow-y-auto py-12 px-4 max-h-[65vh] scrollbar-none">
            <div className="text-amber-400 font-extrabold text-2xl md:text-3xl leading-snug">
              "{selectedScript.hook}"
            </div>

            {selectedScript.scenes.map((scene) => (
              <div key={scene.sceneNumber} className="space-y-2 py-4 border-b border-slate-800/60">
                <span className="text-xs bg-amber-500 text-slate-950 px-3 py-1 rounded-full font-bold">
                  مشهد {scene.sceneNumber} ({scene.duration})
                </span>
                <p className="text-3xl md:text-5xl font-extrabold text-white leading-relaxed tracking-wide font-changa">
                  {scene.narrationText}
                </p>
                <p className="text-sm text-slate-400 italic">[{scene.visualDescription}]</p>
              </div>
            ))}
          </div>

          {/* Bottom Presenter Footer */}
          <div className="text-center text-xs text-slate-500 border-t border-slate-800 pt-4">
            حزب مستقبل وطن — أمانة مركز سمنود — أمانة الإعلام المرئي
          </div>
        </div>
      )}
    </motion.div>
  );
};
