import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Newspaper,
  Megaphone,
  Sparkles,
  Calendar,
  Share2,
  X,
  Building2,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react';
import { PARTY_NEWS_ITEMS, PARTY_LOGO_PATH } from '../data/mockSamanoudData';
import { PartyNewsItem } from '../types';

export const PartyNewsFeedWidget: React.FC = () => {
  const [newsList] = useState<PartyNewsItem[]>(PARTY_NEWS_ITEMS as PartyNewsItem[]);
  const [selectedNews, setSelectedNews] = useState<PartyNewsItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('الجميع');

  const filteredNews = newsList.filter((item) => {
    if (activeCategory === 'الجميع') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="bento-card-dark bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-5">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold font-changa text-white">شريط أخبار وفعاليات الحزب الميدانية</h3>
              <span className="px-2 py-0.5 rounded text-[10px] bg-red-600 text-white font-extrabold animate-pulse">
                عاجل 🔴
              </span>
            </div>
            <p className="text-xs text-slate-400">آخر بيانات الأمانة المركزية وأخبار التواجد الميداني بمركز سمنود</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {['الجميع', 'القومية', 'أمانة سمنود', 'توجيهات إعلامية'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-amber-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Items Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredNews.map((news) => (
          <motion.div
            key={news.id}
            whileHover={{ y: -4 }}
            onClick={() => setSelectedNews(news)}
            className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold ${
                    news.category === 'القومية'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : news.category === 'أمانة سمنود'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  }`}
                >
                  {news.category}
                </span>
                <span className="text-slate-400 font-mono">{news.date}</span>
              </div>

              <h4 className="text-sm font-extrabold font-changa text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                {news.title}
              </h4>

              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{news.summary}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-amber-400 font-bold">
              <span>قراءة البيان الكامل</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* FULL NEWS READ MODAL */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 text-white relative">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
                <Building2 className="w-4 h-4" />
                <span>{selectedNews.author}</span>
                <span>•</span>
                <span className="text-slate-400">{selectedNews.date}</span>
              </div>
              <h3 className="text-xl font-extrabold font-changa">{selectedNews.title}</h3>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
              {selectedNews.content}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400">حزب مستقبل وطن — أمانة الإعلام والتواصل</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${selectedNews.title}\n\n${selectedNews.content}`);
                  alert('تم نسخ الخبر للشير الإعلامي!');
                }}
                className="bg-amber-500 text-slate-950 font-extrabold px-3.5 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>مشاركة الخبر</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
