import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, CheckCircle2, AlertTriangle, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { SAMANOUD_DISTRICTS } from '../data/mockSamanoudData';

interface SamanoudInteractiveMapProps {
  selectedDistrict: string;
  onSelectDistrict: (districtName: string) => void;
}

export const SamanoudInteractiveMap: React.FC<SamanoudInteractiveMapProps> = ({
  selectedDistrict,
  onSelectDistrict,
}) => {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  // Map zone shapes coordinates for stylized SVG layout
  const mapZonePaths = [
    {
      id: 'مدينة سمنود',
      name: 'مدينة سمنود',
      path: 'M 180,120 L 290,100 L 320,170 L 240,210 L 170,180 Z',
      color: 'fill-blue-600/60 stroke-amber-400',
      center: { x: 240, y: 150 },
    },
    {
      id: 'الراهبين',
      name: 'الراهبين',
      path: 'M 140,40 L 250,30 L 290,100 L 180,120 Z',
      color: 'fill-indigo-700/60 stroke-amber-400',
      center: { x: 215, y: 70 },
    },
    {
      id: 'ميت حبيب',
      name: 'ميت حبيب',
      path: 'M 290,100 L 400,70 L 420,150 L 320,170 Z',
      color: 'fill-emerald-700/60 stroke-amber-400',
      center: { x: 350, y: 120 },
    },
    {
      id: 'محلة زياد',
      name: 'محلة زياد',
      path: 'M 320,170 L 420,150 L 410,250 L 300,270 Z',
      color: 'fill-amber-600/60 stroke-amber-400',
      center: { x: 360, y: 210 },
    },
    {
      id: 'أبو صير',
      name: 'أبو صير',
      path: 'M 140,230 L 240,210 L 300,270 L 190,310 Z',
      color: 'fill-blue-700/60 stroke-amber-400',
      center: { x: 220, y: 250 },
    },
    {
      id: 'بشتيل',
      name: 'بشتيل',
      path: 'M 90,150 L 180,120 L 240,210 L 140,230 Z',
      color: 'fill-purple-700/60 stroke-amber-400',
      center: { x: 160, y: 180 },
    },
    {
      id: 'طليمة',
      name: 'طليمة',
      path: 'M 60,60 L 140,40 L 180,120 L 90,150 Z',
      color: 'fill-cyan-700/60 stroke-amber-400',
      center: { x: 120, y: 90 },
    },
    {
      id: 'بنا أبوصير',
      name: 'بنا أبوصير',
      path: 'M 80,240 L 140,230 L 190,310 L 110,320 Z',
      color: 'fill-teal-700/60 stroke-amber-400',
      center: { x: 130, y: 275 },
    },
  ];

  const activeZoneData = SAMANOUD_DISTRICTS.find(
    (d) => d.name === (hoveredZone || selectedDistrict)
  ) || SAMANOUD_DISTRICTS[0];

  return (
    <div className="bento-card-dark bg-slate-900/95 border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 mb-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>خريطة سمنود التفاعلية للقطاعات والقرى الـ 7</span>
          </div>
          <h3 className="text-xl font-extrabold font-changa text-white">
            متابعة كثافة الطلبات والتغطية بالقطاعات
          </h3>
          <p className="text-xs text-slate-400">مرر بالماوس أو اضغط على أي قطاع للاستعراض والتصفية السريعة</p>
        </div>

        {selectedDistrict !== 'الجميع' && (
          <button
            onClick={() => onSelectDistrict('الجميع')}
            className="text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-md self-start sm:self-auto"
          >
            إلغاء التصفية (عرض الجميع)
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Interactive Map Canvas (7 cols) */}
        <div className="lg:col-span-7 relative bg-slate-950/90 rounded-2xl border border-slate-800 p-4 min-h-[340px] flex items-center justify-center overflow-hidden">
          {/* Subtle background grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

          <svg viewBox="0 0 480 350" className="w-full h-auto max-h-[320px] z-10 drop-shadow-2xl">
            {mapZonePaths.map((zone) => {
              const isSelected = selectedDistrict === zone.name;
              const isHovered = hoveredZone === zone.name;
              const districtInfo = SAMANOUD_DISTRICTS.find((d) => d.name === zone.name);

              return (
                <g key={zone.id} className="cursor-pointer transition-all duration-300">
                  <path
                    d={zone.path}
                    className={`${zone.color} transition-all duration-300 ${
                      isSelected || isHovered
                        ? 'stroke-[3.5] filter drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] brightness-125'
                        : 'stroke-[1.5] hover:brightness-110'
                    }`}
                    onMouseEnter={() => setHoveredZone(zone.name)}
                    onMouseLeave={() => setHoveredZone(null)}
                    onClick={() => onSelectDistrict(zone.name)}
                  />
                  {/* Zone Label Text */}
                  <text
                    x={zone.center.x}
                    y={zone.center.y}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    className="pointer-events-none font-changa drop-shadow-md select-none"
                  >
                    {zone.name}
                  </text>
                  {/* Complaint badge indicator dot */}
                  {districtInfo && districtInfo.activeComplaints > 0 && (
                    <circle
                      cx={zone.center.x + 28}
                      cy={zone.center.y - 10}
                      r="7"
                      className="fill-amber-500 stroke-slate-950 stroke-2 animate-pulse"
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Map Compass & Legend */}
          <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-[10px] space-y-1 z-20">
            <span className="font-bold text-amber-300 block">دليل الألوان:</span>
            <div className="flex items-center gap-3 text-slate-300">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                كثافة مرتفعة
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                استجابة فائقة
              </span>
            </div>
          </div>
        </div>

        {/* Selected Zone Inspector Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-amber-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold font-changa text-white">{activeZoneData.name}</h4>
                <p className="text-xs text-amber-400 font-medium">{activeZoneData.type}</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-slate-900 px-2.5 py-1 rounded-lg text-slate-300 border border-slate-800">
              سمنود
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                التعداد السكاني
              </span>
              <span className="text-base font-bold font-mono text-white block">
                {activeZoneData.population} نسمة
              </span>
            </div>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                البلاغات النشطة
              </span>
              <span className="text-base font-bold font-mono text-amber-300 block">
                {activeZoneData.activeComplaints} طلبات
              </span>
            </div>
          </div>

          {/* Resolution percentage bar */}
          <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                نسبة الاستجابة وحسم الشكاوى:
              </span>
              <span className="text-emerald-400 font-mono font-bold">{activeZoneData.resolvedPercentage}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${activeZoneData.resolvedPercentage}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => onSelectDistrict(activeZoneData.name)}
            className="w-full bg-blue-700 hover:bg-blue-600 text-amber-300 font-extrabold text-xs p-3 rounded-xl border border-amber-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>عرض نتائج وتحليلات {activeZoneData.name}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
