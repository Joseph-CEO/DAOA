/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Laptop, Smartphone } from 'lucide-react';

interface PWAInstallBannerProps {
  addToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ addToast }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the install banner
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Also check if app is already running in standalone mode (installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the native install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      addToast('DA Omwenga Advocates App installed successfully! Access it anytime from your homescreen.', 'success');
      setIsVisible(false);
      setDeferredPrompt(null);
    } else {
      addToast('Installation dismissed.', 'info');
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        className="fixed bottom-6 left-6 right-6 md:left-auto md:w-96 z-40 bg-white border border-[#D1D5DB] rounded-none p-5 shadow-2xl flex flex-col gap-4 text-[#0B1F3A]"
        id="pwa-install-container"
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-[#F3F4F6] border border-[#D1D5DB] flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 text-[#C5A880] animate-bounce" />
            </div>
            <div>
              <p className="font-bold text-sm text-[#0B1F3A] font-serif">Install Web App</p>
              <p className="text-[11px] text-[#C5A880] mt-0.5 font-bold uppercase tracking-wider">Offline Legal Support</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 text-slate-400 hover:text-[#0B1F3A] hover:bg-[#F3F4F6] rounded-none transition-colors cursor-pointer"
            aria-label="Dismiss install banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-800 leading-relaxed font-medium">
          Install the DA Omwenga Advocates application on your phone or desktop homescreen for instant launch, offline support, and low data loading.
        </p>

        <div className="flex gap-2 text-[10px] text-slate-700 font-mono font-bold">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#F3F4F6] border border-[#D1D5DB] rounded-none">
            <Smartphone className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Mobile</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#F3F4F6] border border-[#D1D5DB] rounded-none">
            <Laptop className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Desktop</span>
          </div>
        </div>

        <button
          onClick={handleInstallClick}
          className="w-full py-3 bg-[#0B1F3A] text-white font-bold uppercase tracking-widest text-xs rounded-none hover:bg-black transition-all cursor-pointer shadow-sm"
        >
          Install Web Application
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
