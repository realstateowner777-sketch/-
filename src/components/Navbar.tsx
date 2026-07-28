import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TabType } from '../types';
import { PARTY_LOGO_PATH } from '../data/mockSamanoudData';
import {
  Share2,
  Video,
  Inbox,
  Terminal,
  Bot,
  Activity,
  Building2,
  Users,
  BookOpen,
  Moon,
  Sun,
  Image as ImageIcon,
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  districtsList: string[];
  unreadComplaintsCount: number;
  readingMode: boolean;
  setReadingMode: (val: boolean) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedDistrict,
  setSelectedDistrict,
  districtsList,
  unreadComplaintsCount,
  readingMode,
  setReadingMode,
  darkMode,
  setDarkMode,
}) => {
  const [isCompactLogo, setIsCompactLogo] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-amber-500/30 text-white shadow-2xl">
      {/* Top Ticker / Official Party Header Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-950 to-blue-900 px-4 py-2 border-b border-amber-500/25 text-xs text-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              شعارنا: كلنا بنبني مصر 🇪🇬
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="font-semibold text-slate-200 hidden sm:inline">
              حزب مستقبل وطن — أمانة محافظة الغربية — أمانة مركز سمنود
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all cursor-pointer"
              title="تبديل المظهر العام بين السمة الداكنة والفاتحة"
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>السمة الفاتحة</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-300" />
                  <span>السمة الداكنة (الرسمية)</span>
                </>
              )}
            </button>

            {/* Reading Mode Toggle Button */}
            <button
              onClick={() => setReadingMode(!readingMode)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                readingMode
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/30 font-black'
                  : 'bg-slate-900/90 text-amber-300 border-amber-500/30 hover:bg-slate-800'
              }`}
              title="تفعيل/إلغاء وضع القراءة المريح وتوضيح التباين للعين"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{readingMode ? 'وضع القراءة المريح (مفعّل)' : 'وضع القراءة المريح'}</span>
            </button>

            {/* District Selector Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 px-3 py-1 rounded-lg border border-amber-500/30 transition-colors cursor-pointer text-xs">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">الوحدة المحلية/القطاع:</span>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer"
              >
                <option value="الجميع" className="bg-slate-900 text-white">
                  جميع القرى والقطاعات بمركز سمنود
                </option>
                {districtsList.map((d) => (
                  <option key={d} value={d} className="bg-slate-900 text-white">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs font-bold">
              <Activity className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              <span>أمانة سمنود 2030</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand Identity */}
          <div
            className="flex items-center gap-3.5 cursor-pointer group select-none"
            onClick={() => {
              setIsCompactLogo((prev) => !prev);
              setActiveTab('analytics-dashboard');
            }}
            title="انقر لتبديل العرض بين النسخة الكاملة والمختصرة للشعار"
          >
            {/* Logo Image with Animated Hover Tooltip displaying Future of Samanoud 2030 Mission Statement */}
            <div className="relative group/logo inline-block shrink-0">
              <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-600 p-0.5 shadow-xl shadow-amber-500/25 group-hover:scale-110 group-hover:shadow-amber-400/40 transition-all duration-300">
                <img
                  src={PARTY_LOGO_PATH}
                  alt="لوجو حزب مستقبل وطن - أمانة سمنود 2030"
                  className="w-full h-full rounded-full object-cover border border-slate-900 group-hover:brightness-110 group-hover:contrast-105 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Mission Statement Hover Tooltip */}
              <div className="absolute top-full right-0 mt-2 z-50 pointer-events-none opacity-0 group-hover/logo:opacity-100 group-hover/logo:pointer-events-auto transition-all duration-300 transform translate-y-1 group-hover/logo:translate-y-0 w-64 bg-slate-950/95 border border-amber-500/60 rounded-xl p-3 shadow-2xl backdrop-blur-md text-right border-t-2 border-t-amber-400">
                <div className="text-[10px] font-black text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  <span>رؤية مستقبل سمنود 2030</span>
                </div>
                <p className="text-xs font-bold text-white leading-relaxed">
                  مستقبل سمنود 2030: نظام تشغيل التحول الرقمي، الحوكمة المؤسسية، والتنمية المستدامة القائمة على الأداء والبيانات اللحظية.
                </p>
              </div>
            </div>

            {/* Smooth Animated Brand Text: Toggle between Full and Compact Version */}
            <div className="overflow-hidden transition-all duration-300">
              <AnimatePresence mode="wait">
                {!isCompactLogo ? (
                  <motion.div
                    key="full-logo"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-extrabold font-changa text-white tracking-wide">
                        حزب مستقبل وطن
                      </h1>
                      <span className="px-2.5 py-0.5 text-[10px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-md shadow-sm">
                        أمانة مركز سمنود
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-200/80 font-medium">
                      أمانة الإعلام والتواصل السياسي — منصة الفيديوهات والخدمات الذكية
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="compact-logo"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <h1 className="text-lg font-extrabold font-changa text-amber-300 tracking-wide">
                      سمنود 2030
                    </h1>
                    <span className="px-2 py-0.5 text-[10px] font-black bg-slate-800 text-amber-400 border border-amber-500/40 rounded-md shadow-sm">
                      عرض مختصر ⚡
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tab Navigation Buttons - Bento Nav Pills */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-amber-500/30 shadow-inner">
            <button
              onClick={() => setActiveTab('analytics-dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'analytics-dashboard'
                  ? 'bg-gradient-to-r from-blue-800 via-blue-900 to-indigo-950 text-amber-300 border border-amber-500/50 shadow-lg shadow-blue-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Activity className="w-4 h-4 text-amber-400" />
              <span>لوحة البيانات</span>
            </button>

            <button
              onClick={() => setActiveTab('content-strategy')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'content-strategy'
                  ? 'bg-gradient-to-r from-blue-800 via-blue-900 to-indigo-950 text-amber-300 border border-amber-500/50 shadow-lg shadow-blue-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>المحتوى الفيروسي</span>
            </button>

            <button
              onClick={() => setActiveTab('video-creator')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'video-creator'
                  ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-slate-950 font-black shadow-lg shadow-amber-500/30'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>صانع الفيديوهات والصور</span>
            </button>

            <button
              onClick={() => setActiveTab('initiatives')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'initiatives'
                  ? 'bg-gradient-to-r from-blue-800 via-blue-900 to-indigo-950 text-amber-300 border border-amber-500/50 shadow-lg shadow-blue-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>المبادرات والأنشطة</span>
            </button>

            <button
              onClick={() => setActiveTab('complaints-triage')}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'complaints-triage'
                  ? 'bg-gradient-to-r from-blue-800 via-blue-900 to-indigo-950 text-amber-300 border border-amber-500/50 shadow-lg shadow-blue-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Inbox className="w-4 h-4 text-amber-400" />
              <span>التوجيه والخدمات</span>
              {unreadComplaintsCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-black bg-amber-400 text-slate-950 rounded-full animate-bounce shadow-sm">
                  {unreadComplaintsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('media-library')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'media-library'
                  ? 'bg-gradient-to-r from-blue-800 via-blue-900 to-indigo-950 text-amber-300 border border-amber-500/50 shadow-lg shadow-blue-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <span>مكتبة الصور والهوية</span>
            </button>

            <button
              onClick={() => setActiveTab('prompt-studio')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'prompt-studio'
                  ? 'bg-gradient-to-r from-blue-800 via-blue-900 to-indigo-950 text-amber-300 border border-amber-500/50 shadow-lg shadow-blue-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>استوديو الأوامر</span>
            </button>

            <button
              onClick={() => setActiveTab('co-pilot')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'co-pilot'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/30'
                  : 'text-emerald-400 hover:bg-emerald-950/40'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>مساعد الأمانة</span>
            </button>
          </nav>

          {/* Quick Video Creator CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('video-creator')}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Video className="w-4 h-4 fill-slate-950" />
              <span className="hidden sm:inline">توليد تصميم إعلاني بالذكاء الاصطناعي</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs Bar */}
        <div className="lg:hidden flex overflow-x-auto gap-1.5 py-2 border-t border-slate-800 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('analytics-dashboard')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'analytics-dashboard' ? 'bg-blue-800 text-amber-300' : 'text-slate-300 bg-slate-900'
            }`}
          >
            📊 لوحة البيانات
          </button>
          <button
            onClick={() => setActiveTab('content-strategy')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'content-strategy' ? 'bg-blue-800 text-amber-300' : 'text-slate-300 bg-slate-900'
            }`}
          >
            المحتوى الفيروسي
          </button>
          <button
            onClick={() => setActiveTab('video-creator')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'video-creator' ? 'bg-amber-500 text-slate-950 font-black' : 'text-amber-400 bg-slate-900'
            }`}
          >
            🎬 صانع الفيديوهات والصور
          </button>
          <button
            onClick={() => setActiveTab('initiatives')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'initiatives' ? 'bg-blue-800 text-amber-300' : 'text-slate-300 bg-slate-900'
            }`}
          >
            المبادرات
          </button>
          <button
            onClick={() => setActiveTab('complaints-triage')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'complaints-triage' ? 'bg-blue-800 text-amber-300' : 'text-slate-300 bg-slate-900'
            }`}
          >
            الشكاوى والخدمات ({unreadComplaintsCount})
          </button>
          <button
            onClick={() => setActiveTab('prompt-studio')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'prompt-studio' ? 'bg-blue-800 text-amber-300' : 'text-slate-300 bg-slate-900'
            }`}
          >
            أوامر إعلامية
          </button>
          <button
            onClick={() => setActiveTab('co-pilot')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-bold transition-colors ${
              activeTab === 'co-pilot' ? 'bg-emerald-600 text-white' : 'text-slate-300 bg-slate-900'
            }`}
          >
            مساعد الأمانة
          </button>
        </div>
      </div>
    </header>
  );
};
