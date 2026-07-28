import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Sparkles, Bell, X } from 'lucide-react';

export interface ToastItem {
  id: string;
  type: 'success' | 'alert' | 'info';
  title: string;
  message: string;
}

interface ToastNotificationsProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastNotifications: React.FC<ToastNotificationsProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="pointer-events-auto bg-slate-900/95 border border-amber-500/40 text-white rounded-2xl p-4 shadow-2xl backdrop-blur-md flex items-start gap-3 relative overflow-hidden"
          >
            {/* Glow Accent Bar */}
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 to-amber-600"></div>

            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : toast.type === 'alert' ? (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              ) : (
                <Bell className="w-5 h-5 text-blue-400" />
              )}
            </div>

            <div className="flex-1 space-y-0.5 text-xs pr-1">
              <h4 className="font-extrabold font-changa text-amber-300">{toast.title}</h4>
              <p className="text-slate-300 leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
