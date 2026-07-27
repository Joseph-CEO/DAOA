/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Scale, ZoomIn, ZoomOut, CalendarCheck2 } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, fontSize, setFontSize }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Legal Services' },
    { id: 'team', label: 'Our Team' },
    { id: 'offices', label: 'Offices' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80; // height of navbar
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const adjustFontSize = (direction: 'in' | 'out') => {
    if (direction === 'in' && fontSize < 1.2) {
      setFontSize(parseFloat((fontSize + 0.05).toFixed(2)));
    } else if (direction === 'out' && fontSize > 0.85) {
      setFontSize(parseFloat((fontSize - 0.05).toFixed(2)));
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white border-b border-[#D1D5DB] shadow-md py-4'
          : 'bg-white/90 border-b border-[#D1D5DB]/50 backdrop-blur-md py-5'
      }`}
      id="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          onClick={() => handleScrollTo('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] rounded-sm p-1"
          aria-label="DA Omwenga Advocates Homepage"
        >
          <div className="w-14 h-10 transition-transform group-hover:scale-105 select-none shrink-0 animate-fade-in" aria-hidden="true">
            <svg viewBox="0 0 95 60" className="w-full h-full">
              <rect x="2" y="2" width="27" height="56" rx="5" fill="#005CFF" stroke="#1E1B4B" strokeWidth="0.5" />
              <text x="15.5" y="38" fill="#FFFFFF" fontSize="24" fontFamily="Georgia, serif" textAnchor="middle" fontWeight="bold">D</text>
              <rect x="34" y="2" width="27" height="56" rx="5" fill="#1E1A5F" stroke="#1E1B4B" strokeWidth="0.5" />
              <text x="47.5" y="38" fill="#FFFFFF" fontSize="22" fontFamily="Georgia, serif" textAnchor="middle" fontWeight="bold">{"&"}</text>
              <rect x="66" y="2" width="27" height="56" rx="5" fill="#005CFF" stroke="#1E1B4B" strokeWidth="0.5" />
              <text x="79.5" y="38" fill="#FFFFFF" fontSize="24" fontFamily="Georgia, serif" textAnchor="middle" fontWeight="bold">A</text>
            </svg>
          </div>
          <div>
            <span className="block text-base font-bold font-display tracking-tight text-[#0B1F3A] uppercase leading-none">
              DA Omwenga & Co.
            </span>
            <span className="block text-[10px] font-bold text-slate-700 uppercase tracking-[0.2em] mt-1">
              Advocates & Commissioners
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleScrollTo(item.id)}
                  className={`relative py-1.5 px-0.5 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] ${
                    activeSection === item.id
                      ? 'text-[#0B1F3A] font-bold'
                      : 'text-slate-800 hover:text-[#0B1F3A]'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0B1F3A]" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-slate-300" />

          {/* Accessibility Controls */}
          <div className="flex items-center gap-2" aria-label="Accessibility Text Controls">
            <button
              onClick={() => adjustFontSize('out')}
              disabled={fontSize <= 0.85}
              className="p-1.5 text-slate-800 hover:text-[#0B1F3A] disabled:opacity-30 disabled:hover:text-slate-800 bg-[#F3F4F6] border border-[#D1D5DB] transition-all cursor-pointer rounded-none"
              title="Decrease font size"
              aria-label="Decrease font size"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-slate-800 select-none w-10 text-center uppercase tracking-wider font-bold">
              {Math.round(fontSize * 100)}%
            </span>
            <button
              onClick={() => adjustFontSize('in')}
              disabled={fontSize >= 1.2}
              className="p-1.5 text-slate-800 hover:text-[#0B1F3A] disabled:opacity-30 disabled:hover:text-slate-800 bg-[#F3F4F6] border border-[#D1D5DB] transition-all cursor-pointer rounded-none"
              title="Increase font size"
              aria-label="Increase font size"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 bg-[#0B1F3A] text-white font-bold px-6 py-3 text-[11px] hover:bg-[#111111] uppercase tracking-widest transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] rounded-none"
          >
            <CalendarCheck2 className="w-3.5 h-3.5" />
            Book Consultation
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={onOpenBooking}
            className="p-2.5 bg-[#0B1F3A] text-white hover:bg-[#111111] transition-all cursor-pointer rounded-none"
            aria-label="Book Consultation Quick Launch"
          >
            <CalendarCheck2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 text-slate-700 hover:text-[#0B1F3A] bg-[#F3F4F6] border border-[#D1D5DB] transition-all cursor-pointer rounded-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-[74px] left-0 w-full h-[calc(100vh-74px)] bg-white/98 backdrop-blur-md z-30 transition-transform duration-300 transform border-t border-[#D1D5DB] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        <div className="flex flex-col justify-between h-full p-8">
          <ul className="space-y-5 text-sm uppercase tracking-wider font-semibold text-[#0B1F3A]">
            {navItems.map((item, idx) => (
              <li key={item.id}>
                <button
                  onClick={() => handleScrollTo(item.id)}
                  className="w-full text-left py-2 hover:text-[#C5A880] transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <span className="text-slate-600 font-mono text-[11px] font-bold">/0{idx + 1}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="space-y-5 pt-6 border-t border-[#D1D5DB]">
            {/* Accessibility inside mobile drawer */}
            <div className="flex items-center justify-between p-4 bg-[#F3F4F6] border border-[#D1D5DB]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Layout Text Magnifier</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjustFontSize('out')}
                  disabled={fontSize <= 0.85}
                  className="p-2 text-slate-800 bg-white border border-[#D1D5DB] hover:text-[#0B1F3A] disabled:opacity-30 cursor-pointer rounded-none"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-[#0B1F3A] w-12 text-center select-none font-bold">
                  {Math.round(fontSize * 100)}%
                </span>
                <button
                  onClick={() => adjustFontSize('in')}
                  disabled={fontSize >= 1.2}
                  className="p-2 text-slate-800 bg-white border border-[#D1D5DB] hover:text-[#0B1F3A] disabled:opacity-30 cursor-pointer rounded-none"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-[#0B1F3A] text-white hover:bg-[#111111] font-bold py-4 rounded-none text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <CalendarCheck2 className="w-4 h-4" />
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
