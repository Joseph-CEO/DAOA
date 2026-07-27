/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUp, 
  Scale, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  WifiOff, 
  Globe 
} from 'lucide-react';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Team } from './components/Team';
import { Offices } from './components/Offices';
import { Contact } from './components/Contact';
import { BookingModal } from './components/BookingModal';
import { ConsultationsTracker } from './components/ConsultationsTracker';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { ToastContainer, ToastMessage } from './components/Toast';

import { PHONE_NUMBERS, MAIN_EMAIL } from './data';

export default function App() {
  // Application State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState('');
  const [fontSize, setFontSize] = useState(1.0); // Font scale factor (0.85 to 1.2)
  const [bookingsToggle, setBookingsToggle] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Custom Toast Notifier Helper
  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, text, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Monitor Network Connectivity (Offline Indicator)
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      addToast('Application back online. Secure registry synchronization enabled.', 'success');
    };

    const handleOffline = () => {
      setIsOnline(false);
      addToast('Offline mode active. Appointments and forms are safely saved in local offline sync.', 'info');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Register PWA Service Worker & Schema.org JSON-LD on Mount
  useEffect(() => {
    // 1. Service Worker Registration
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('PWA ServiceWorker registered with scope: ', registration.scope);
          })
          .catch((error) => {
            console.error('ServiceWorker registration failed: ', error);
          });
      });
    }

    // 2. Dynamic Schema.org injection
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Attorney",
      "name": "DA Omwenga & Co. Advocates",
      "telephone": "+254725871807",
      "email": "omwengaadvocates87@gmail.com",
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "Mama Ngina Street, Vedic House, Room 205",
          "addressLocality": "Nairobi",
          "addressRegion": "Nairobi CBD",
          "addressCountry": "KE"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "Victory Plaza, Kikuyu Southern Bypass Interchange, Suite A3",
          "addressLocality": "Kikuyu",
          "addressRegion": "Kiambu County",
          "addressCountry": "KE"
        }
      ],
      "logo": "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      "description": "Progressive Web App for DA Omwenga & Co. Advocates, a professional legal firm specializing in Property Law, Commercial Law, Successions and Litigation in Kenya.",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "17:30"
      },
      "priceRange": "$$"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // 3. Splash Screen exit delay
    const splashTimer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1500);

    // 4. Scroll-to-top button threshold listener
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.head.removeChild(script);
      clearTimeout(splashTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to targeted node safely
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Navbar height offset
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Launch modal with selected practice area prefilled
  const handleSelectServiceToBook = (serviceId: string) => {
    setPreSelectedService(serviceId);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = () => {
    setBookingsToggle((prev) => !prev); // Re-render local tracker
  };

  return (
    <div 
      className="min-h-screen bg-[#F3F4F6] text-[#111111] flex flex-col selection:bg-[#0B1F3A] selection:text-white"
      style={{ fontSize: `${fontSize}rem` }}
    >
      {/* 1. Splendid Branding Splash Loading Screen */}
      <AnimatePresence>
        {isAppLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#0B1F3A] z-[9999] flex flex-col items-center justify-center gap-6"
            id="splash-screen"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-white/10 border border-white/20 p-6 rounded-none flex items-center justify-center shadow-2xl w-16 h-16"
            >
              <span className="text-white font-serif font-bold text-3xl">O</span>
            </motion.div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-serif font-bold tracking-wider text-white uppercase">
                DA Omwenga & Co. Advocates
              </h2>
              <div className="w-12 h-[2px] bg-[#C5A880] mx-auto"></div>
              <p className="text-[10px] font-semibold text-[#D1D5DB] uppercase tracking-[0.2em]">
                Advocates & Commissioners
              </p>
            </div>
            <div className="w-16 h-[2px] bg-white/10 rounded-full overflow-hidden mt-4">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                className="w-full h-full bg-[#C5A880]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Network Offline Ribbon */}
      {!isOnline && (
        <div className="fixed top-[74px] left-0 w-full bg-amber-600 text-slate-950 text-center py-2 px-4 z-30 flex items-center justify-center gap-2 font-semibold text-xs shadow-md">
          <WifiOff className="w-4 h-4 text-slate-950" />
          <span>Offline mode active. Inquiries and schedules will sync immediately upon connection.</span>
        </div>
      )}

      {/* Layout Content */}
      {!isAppLoading && (
        <>
          {/* Sticky Navigation */}
          <Navbar 
            onOpenBooking={() => setIsBookingOpen(true)}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />

          {/* Main App Nodes */}
          <main className="flex-grow">
            {/* Hero Stage */}
            <Hero 
              onOpenBooking={() => setIsBookingOpen(true)}
              onScrollToContact={() => handleScrollToSection('contact')}
            />

            {/* About Firm */}
            <About />

            {/* Practice Areas / Services Grid */}
            <Services onSelectServiceToBook={handleSelectServiceToBook} />

            {/* Attorneys profiles */}
            <Team addToast={addToast} />

            {/* Offices & Offline Navigation Maps */}
            <Offices addToast={addToast} />

            {/* Elegant Bookings Tracker Console */}
            <section className="py-16 max-w-7xl mx-auto px-6">
              <div className="border border-[#D1D5DB] bg-white rounded-none p-6 md:p-8 shadow-sm">
                <ConsultationsTracker 
                  bookingsUpdatedToggle={bookingsToggle}
                  onCancelBooking={handleBookingSuccess}
                  addToast={addToast}
                />
              </div>
            </section>

            {/* Contact Center Form Sheet */}
            <Contact addToast={addToast} />
          </main>

          {/* Premium Footer */}
          <footer className="bg-[#0B1F3A] border-t border-white/10 py-16" id="site-footer">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start text-xs text-slate-200">
              
              {/* Brand Col */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-10 select-none shrink-0" aria-hidden="true">
                    <svg viewBox="0 0 95 60" className="w-full h-full">
                      <rect x="2" y="2" width="27" height="56" rx="5" fill="#005CFF" stroke="#FFFFFF" strokeWidth="0.5" />
                      <text x="15.5" y="38" fill="#FFFFFF" fontSize="24" fontFamily="Georgia, serif" textAnchor="middle" fontWeight="bold">D</text>
                      <rect x="34" y="2" width="27" height="56" rx="5" fill="#1E1A5F" stroke="#FFFFFF" strokeWidth="0.5" />
                      <text x="47.5" y="38" fill="#FFFFFF" fontSize="22" fontFamily="Georgia, serif" textAnchor="middle" fontWeight="bold">{"&"}</text>
                      <rect x="66" y="2" width="27" height="56" rx="5" fill="#005CFF" stroke="#FFFFFF" strokeWidth="0.5" />
                      <text x="79.5" y="38" fill="#FFFFFF" fontSize="24" fontFamily="Georgia, serif" textAnchor="middle" fontWeight="bold">A</text>
                    </svg>
                  </div>
                  <div>
                    <span className="block font-bold text-white uppercase tracking-wider">
                      DA Omwenga & Co.
                    </span>
                    <span className="block text-[9px] uppercase tracking-widest text-[#C5A880] font-bold">
                      Advocates
                    </span>
                  </div>
                </div>
                <p className="leading-relaxed font-light text-slate-200">
                  A professional sole proprietorship legal practice registered in Kenya, delivering dependable, practical, and ethical representation.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-200 font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-pulse" />
                  <span>Licensed under LSK Code</span>
                </div>
              </div>

              {/* Quick Links Col */}
              <div className="space-y-4">
                <h4 className="font-bold text-white uppercase tracking-wider text-[10px] font-mono">Quick Navigation</h4>
                <ul className="space-y-2">
                  {[
                    { id: 'home', name: 'Home/Welcome' },
                    { id: 'about', name: 'Our Credentials' },
                    { id: 'services', name: 'Practice Areas' },
                    { id: 'team', name: 'Our Legal Team' },
                    { id: 'offices', name: 'Offices Location' },
                    { id: 'contact', name: 'Consultation Form' }
                  ].map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => handleScrollToSection(link.id)}
                        className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
                      >
                        • {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Major Practice Areas Col */}
              <div className="space-y-4">
                <h4 className="font-bold text-white uppercase tracking-wider text-[10px] font-mono">Core Practices</h4>
                <ul className="space-y-2 text-slate-200">
                  <li>• Property Conveyancing & Title Searches</li>
                  <li>• Commercial Law & LLPs Registration</li>
                  <li>• Succession Law & Administration of Estates</li>
                  <li>• Family Separation & Child Custody</li>
                  <li>• Criminal Representation & Arraignment</li>
                  <li>• Debt Recovery & Letters of Demand</li>
                </ul>
              </div>

              {/* Branch Offices Information */}
              <div className="space-y-4">
                <h4 className="font-bold text-white uppercase tracking-wider text-[10px] font-mono">Our Branch Contacts</h4>
                <div className="space-y-3">
                  <div>
                    <span className="block font-semibold text-slate-100">Nairobi CBD Branch:</span>
                    <span className="block mt-0.5 font-light text-slate-200">Vedic House, Room 205, Mama Ngina Street</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-100">Kikuyu Branch Office:</span>
                    <span className="block mt-0.5 font-light text-slate-200">Victory Plaza, Suite A3, Southern Bypass Interchange</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 text-[11px] font-light text-slate-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Mon - Fri • 08:00 AM - 05:30 PM</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Lower Footer */}
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-300 font-medium">
              <p>© {new Date().getFullYear()} DA Omwenga & Co. Advocates. All Rights Reserved.</p>
              <div className="flex gap-6">
                <button className="hover:text-white cursor-pointer focus:outline-none">Terms of Use</button>
                <button className="hover:text-white cursor-pointer focus:outline-none">Privacy Protection Policy</button>
                <button className="hover:text-white cursor-pointer focus:outline-none">LSK Guidelines</button>
              </div>
            </div>
          </footer>

          {/* Floating Action: Scroll back to top */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 z-30 p-3 bg-white text-slate-950 rounded-full shadow-2xl hover:bg-slate-200 transition-all cursor-pointer border border-slate-200"
                aria-label="Scroll back to top of page"
              >
                <ArrowUp className="w-4 h-4 stroke-[3]" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Consultation Scheduling Form Dialogue */}
          <AnimatePresence>
            {isBookingOpen && (
              <BookingModal 
                isOpen={isBookingOpen}
                onClose={() => {
                  setIsBookingOpen(false);
                  setPreSelectedService('');
                }}
                preSelectedServiceId={preSelectedService}
                addToast={addToast}
                onBookingSuccess={handleBookingSuccess}
              />
            )}
          </AnimatePresence>

          {/* PWA Direct Installation Prompt Banner */}
          <PWAInstallBanner addToast={addToast} />

          {/* Toast Notification Mount Console */}
          <ToastContainer toasts={toasts} removeToast={removeToast} />
        </>
      )}
    </div>
  );
}
