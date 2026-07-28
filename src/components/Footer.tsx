import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Award, Heart } from 'lucide-react';
import { PARTY_LOGO_PATH } from '../data/mockSamanoudData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-amber-500/20 text-slate-400 text-xs py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <img
              src={PARTY_LOGO_PATH}
              alt="لوجو حزب مستقبل وطن"
              className="w-11 h-11 rounded-full object-cover border border-amber-400/50 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div>
              <h4 className="text-white font-extrabold font-changa text-base flex items-center gap-2">
                حزب مستقبل وطن — أمانة مركز سمنود
                <span className="text-xs font-normal text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  كلنا بنبني مصر 🇪🇬
                </span>
              </h4>
              <p className="text-slate-400 text-xs">
                أمانة الإعلام والتواصل السياسي والخدمات الميدانية بمركز سمنود والوحدات القروية
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              مقر أمانة سمنود الرئيسي، سمنود، الغربية
            </span>
            <span className="flex items-center gap-1.5 font-mono">
              <Phone className="w-4 h-4 text-emerald-400" />
              خدمة المواطنين والواتساب المباشر
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              أمانة مستقبل وطن الرسمية
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} لأمانة حزب مستقبل وطن بمركز سمنود. منصة صناعة الفيديوهات والخدمات الذكية.
          </p>
          <div className="flex items-center gap-4 text-amber-300/80">
            <span>أمانة الإعلام</span>
            <span>•</span>
            <span>أمانة العمل الجماهيري</span>
            <span>•</span>
            <span>أمانة الشباب</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

