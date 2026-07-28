import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { SAMANOUD_DISTRICTS, INITIAL_COMPLAINTS } from './data/mockSamanoudData';
import { Navbar } from './components/Navbar';
import { AnalyticsDashboardTab } from './components/AnalyticsDashboardTab';
import { ContentStrategyTab } from './components/ContentStrategyTab';
import { VideoCreatorTab } from './components/VideoCreatorTab';
import { InitiativesTab } from './components/InitiativesTab';
import { DigitalTransformationTab } from './components/DigitalTransformationTab';
import { ComplaintsTriageTab } from './components/ComplaintsTriageTab';
import { PromptStudioTab } from './components/PromptStudioTab';
import { VisualIdentityLibrary } from './components/VisualIdentityLibrary';
import { MunicipalCoPilotDrawer } from './components/MunicipalCoPilotDrawer';
import { Footer } from './components/Footer';
import { ToastNotifications, ToastItem } from './components/ToastNotifications';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('video-creator');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('الجميع');
  const [readingMode, setReadingMode] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    // Welcome real-time system toast
    const welcomeToast: ToastItem = {
      id: 'welcome-1',
      type: 'info',
      title: 'مكتب المتابعة الرقمية — سمنود',
      message: 'تم تحديث خريطة القطاعات ولوحة المؤشرات الميدانية بالذكاء الاصطناعي بنجاح ✨',
    };
    setToasts([welcomeToast]);

    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== 'welcome-1'));
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const unreadComplaintsCount = INITIAL_COMPLAINTS.filter(
    (c) => c.status === 'جديد' || c.status === 'تم التوجيه'
  ).length;

  const districtNames = SAMANOUD_DISTRICTS.map((d) => d.name);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans dir-rtl selection:bg-amber-500 selection:text-slate-950 ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900 light-theme-active'
      } ${readingMode ? 'reading-mode-active bg-slate-900 text-white' : ''}`}
    >
      {/* Toast Notifications Overlay */}
      <ToastNotifications toasts={toasts} onDismiss={dismissToast} />

      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        districtsList={districtNames}
        unreadComplaintsCount={unreadComplaintsCount}
        readingMode={readingMode}
        setReadingMode={setReadingMode}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Workspace Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'analytics-dashboard' && (
          <AnalyticsDashboardTab selectedDistrict={selectedDistrict} />
        )}

        {activeTab === 'video-creator' && <VideoCreatorTab selectedDistrict={selectedDistrict} />}

        {activeTab === 'initiatives' && <InitiativesTab selectedDistrict={selectedDistrict} />}

        {activeTab === 'content-strategy' && <ContentStrategyTab />}

        {activeTab === 'digital-roadmap' && <DigitalTransformationTab />}

        {activeTab === 'complaints-triage' && (
          <ComplaintsTriageTab selectedDistrictFilter={selectedDistrict} />
        )}

        {activeTab === 'media-library' && (
          <VisualIdentityLibrary
            onSelectPhotoForVideo={() => {
              setActiveTab('video-creator');
            }}
          />
        )}

        {activeTab === 'prompt-studio' && <PromptStudioTab />}

        {activeTab === 'co-pilot' && <MunicipalCoPilotDrawer />}
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}

