import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingUp,
  Users,
  CheckCircle2,
  Award,
  Share2,
  Filter,
  Sparkles,
  BarChart3,
  MapPin,
} from 'lucide-react';
import { SAMANOUD_DISTRICTS } from '../data/mockSamanoudData';
import { SamanoudInteractiveMap } from './SamanoudInteractiveMap';
import { PerformanceReportCard } from './PerformanceReportCard';
import { PartyNewsFeedWidget } from './PartyNewsFeedWidget';
import { ComplaintPredictor } from './ComplaintPredictor';
import { CentralEventsCalendar } from './CentralEventsCalendar';
import { JsonBackupExporter } from './JsonBackupExporter';
import { TaskScheduler } from './TaskScheduler';
import { MemberGuide } from './MemberGuide';
import { FieldOperationTracker } from './FieldOperationTracker';
import { WeeklyAchievementSummary } from './WeeklyAchievementSummary';

interface AnalyticsDashboardTabProps {
  selectedDistrict: string;
}

export const DashboardOverview: React.FC<{ districtFilter: string; setDistrictFilter: (d: string) => void }> = ({
  districtFilter,
  setDistrictFilter,
}) => {
  // Monthly trends data
  const monthlyTrendsData = [
    { month: 'يناير', initiatives: 12, beneficiaries: 14500, resolvedComplaints: 210 },
    { month: 'فبراير', initiatives: 18, beneficiaries: 22000, resolvedComplaints: 340 },
    { month: 'مارس', initiatives: 24, beneficiaries: 28500, resolvedComplaints: 420 },
    { month: 'أبريل', initiatives: 31, beneficiaries: 35000, resolvedComplaints: 510 },
    { month: 'مايو', initiatives: 42, beneficiaries: 48000, resolvedComplaints: 680 },
    { month: 'يونيو', initiatives: 57, beneficiaries: 62000, resolvedComplaints: 890 },
    { month: 'يوليو', initiatives: 68, beneficiaries: 84000, resolvedComplaints: 1120 },
  ];

  // Category Distribution Data
  const categoryData = [
    { name: 'القوافل الطبية والصحة', value: 38, color: '#10b981' },
    { name: 'معارض السلع التموينية', value: 28, color: '#f59e0b' },
    { name: 'دوري الشباب والرياضة', value: 18, color: '#1d4ed8' },
    { name: 'خدمات النواب والشكاوى', value: 16, color: '#a855f7' },
  ];

  // District Coverage Data
  const districtCoverageData = SAMANOUD_DISTRICTS.map((d) => ({
    name: d.name,
    active: d.activeComplaints,
    resolvedRate: d.resolvedPercentage,
    population: parseInt(d.population.replace(/[^0-9]/g, '')) || 50,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 animate-fadeIn"
    >
      {/* Executive Header Banner - Bento Style */}
      <motion.div
        variants={cardVariants}
        className="bento-card-dark bg-slate-900/95 border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span>لوحة القيادة الميدانية وإحصائيات الأثر — أمانة مركز سمنود 2030</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-changa text-white">
              مؤشرات الأداء الميداني ونسب <span className="text-amber-400">إنجاز المبادرات</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              متابعة لمؤشرات الأثر الاجتماعي لقوافل حزب مستقبل وطن، الاستجابة السريعة للطلبات، والتغطية بالوحدات المحلية الـ 7 بمركز سمنود.
            </p>
          </div>

          {/* District Filter Dropdown */}
          <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 shrink-0">
            <Filter className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-400 font-bold">القطاع:</span>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-slate-900 text-amber-300 font-bold text-xs p-2 rounded-xl focus:outline-none cursor-pointer border border-amber-500/20"
            >
              <option value="الجميع">كافة القرى والوحدات المحلية</option>
              {SAMANOUD_DISTRICTS.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name} ({d.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4 Core KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            variants={cardVariants}
            className="bg-slate-950/80 border border-amber-500/30 p-5 rounded-2xl space-y-2 hover:border-amber-500 transition-all bento-glow-blue"
          >
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-xs font-bold text-slate-400">المبادرات المنفذة</span>
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl md:text-3xl font-black font-changa text-white">
              184 <span className="text-xs text-amber-400 font-sans">فعالية</span>
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +24% مقارنة بالشهر السابق
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-amber-500/40 transition-all"
          >
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-bold text-slate-400">المستفيدون المباشرون</span>
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl md:text-3xl font-black font-changa text-white">
              148,500+ <span className="text-xs text-emerald-400 font-sans">مواطن</span>
            </div>
            <p className="text-[11px] text-slate-400">بقرى ومدن سمنود</p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-amber-500/40 transition-all"
          >
            <div className="flex items-center justify-between text-blue-400">
              <span className="text-xs font-bold text-slate-400">نسبة حسم الشكاوى</span>
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-2xl md:text-3xl font-black font-changa text-white">
              96.4% <span className="text-xs text-blue-400 font-sans">نجاح</span>
            </div>
            <p className="text-[11px] text-blue-300 font-semibold">متوسط الاستجابة &lt; 24 ساعة</p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-2 hover:border-amber-500/40 transition-all"
          >
            <div className="flex items-center justify-between text-purple-400">
              <span className="text-xs font-bold text-slate-400">الوصول الإعلامي</span>
              <Share2 className="w-5 h-5" />
            </div>
            <div className="text-2xl md:text-3xl font-black font-changa text-white">
              1.8M+ <span className="text-xs text-purple-400 font-sans">مشاهدة</span>
            </div>
            <p className="text-[11px] text-purple-300">عبر منصات التواصل للحزب</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Charts Grid - 2 Main Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Trend Area Chart (7 cols) */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-extrabold font-changa text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                تطور أعداد المبادرات والمستفيدين شهرياً بمركز سمنود
              </h3>
              <p className="text-xs text-slate-400">نمو مطرد في التغطية الميدانية للقرى والقطاعات</p>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              2026
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendsData}>
                <defs>
                  <linearGradient id="colorBeneficiaries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '1rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="beneficiaries"
                  name="عدد المستفيدين"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorBeneficiaries)"
                />
                <Area
                  type="monotone"
                  dataKey="resolvedComplaints"
                  name="الشكاوى المحلولة"
                  stroke="#1d4ed8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorComplaints)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Initiatives Category Pie Chart (5 cols) */}
        <motion.div
          variants={cardVariants}
          className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4"
        >
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-extrabold font-changa text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              توزيع المبادرات حسب القطاع الخدمي
            </h3>
            <p className="text-xs text-slate-400">النسب المئوية للأنشطة الميدانية المنفذة</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '1rem',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.color }}></span>
                <span className="text-slate-300 font-bold truncate">{c.name}</span>
                <span className="text-amber-400 font-mono font-black mr-auto">{c.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Village / District Coverage BarChart */}
      <motion.div
        variants={cardVariants}
        className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-extrabold font-changa text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              نسبة حسم الطلبات والشكاوى بالقرى والوحدات المحلية بمركز سمنود (%)
            </h3>
            <p className="text-xs text-slate-400">معدلات إنجاز مكتب خدمة المواطنين ونواب الحزب</p>
          </div>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            استجابة قياسية
          </span>
        </div>

        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={districtCoverageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '1rem',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="resolvedRate" name="نسبة الحل (%)" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Weekly Analytical Summary Component */}
      <motion.div variants={cardVariants}>
        <WeeklyAchievementSummary />
      </motion.div>

      {/* NEW: Field Operation Tracker for Village Initiatives and Resource Shortage Alerts */}
      <motion.div variants={cardVariants}>
        <FieldOperationTracker selectedDistrict={districtFilter} />
      </motion.div>

      {/* NEW: Party News Feed Widget */}
      <motion.div variants={cardVariants}>
        <PartyNewsFeedWidget />
      </motion.div>

      {/* NEW: Interactive SVG District Map */}
      <motion.div variants={cardVariants}>
        <SamanoudInteractiveMap
          selectedDistrict={districtFilter}
          onSelectDistrict={(dist) => setDistrictFilter(dist)}
        />
      </motion.div>

      {/* NEW: AI Complaint Predictor Widget */}
      <motion.div variants={cardVariants}>
        <ComplaintPredictor selectedDistrict={districtFilter} />
      </motion.div>

      {/* NEW: Interactive Central Events Calendar */}
      <motion.div variants={cardVariants}>
        <CentralEventsCalendar />
      </motion.div>

      {/* NEW: Executive Performance Report Card with PDF Export */}
      <motion.div variants={cardVariants}>
        <PerformanceReportCard selectedDistrict={districtFilter} />
      </motion.div>

      {/* NEW: Task Scheduler for Secretariat Tasks linked to Initiatives */}
      <motion.div variants={cardVariants}>
        <TaskScheduler />
      </motion.div>

      {/* NEW: Member Guide for Party Bylaws & Policies */}
      <motion.div variants={cardVariants}>
        <MemberGuide />
      </motion.div>

      {/* NEW: Local Data JSON Backup Exporter */}
      <motion.div variants={cardVariants}>
        <JsonBackupExporter />
      </motion.div>
    </motion.div>
  );
};

export const AnalyticsDashboardTab: React.FC<AnalyticsDashboardTabProps> = ({
  selectedDistrict: initialDistrict,
}) => {
  const [districtFilter, setDistrictFilter] = useState<string>(initialDistrict || 'الجميع');

  return <DashboardOverview districtFilter={districtFilter} setDistrictFilter={setDistrictFilter} />;
};
