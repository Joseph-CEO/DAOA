/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Navigation, Copy, Check, ExternalLink, HelpCircle } from 'lucide-react';
import { OFFICE_LOCATIONS } from '../data';
import { OfficeLocation } from '../types';

interface OfficesProps {
  addToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

export const Offices: React.FC<OfficesProps> = ({ addToast }) => {
  const [selectedOfficeId, setSelectedOfficeId] = useState('nairobi');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedOffice = OFFICE_LOCATIONS.find((o) => o.id === selectedOfficeId) || OFFICE_LOCATIONS[0];

  const handleCopyDirections = (office: OfficeLocation) => {
    const textToCopy = `${office.name}: ${office.building}, ${office.room}, ${office.address}. Directions: ${office.directions}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(office.id);
      addToast(`Directions for ${office.name} copied to clipboard!`, 'success');
      setTimeout(() => setCopiedId(null), 3000);
    });
  };

  const getMapLink = (office: OfficeLocation) => {
    return `https://www.google.com/maps/search/?api=1&query=${office.coordinates.lat},${office.coordinates.lng}`;
  };

  return (
    <section id="offices" className="py-24 bg-[#F3F4F6] border-t border-[#D1D5DB] relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#0B1F3A]" />
            Where to Find Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-light font-serif text-[#0B1F3A] tracking-tight">
            Our Physical <span className="font-bold italic text-[#C5A880]">Offices</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            Visit our fully equipped branch offices in Nairobi Central Business District or Kikuyu town for secure, in-person legal consultations.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Location Switcher & Details (Col-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Select Branch Office</span>
              <div className="grid grid-cols-1 gap-3">
                {OFFICE_LOCATIONS.map((office) => (
                  <button
                    key={office.id}
                    onClick={() => setSelectedOfficeId(office.id)}
                    className={`text-left p-5 rounded-none border transition-all cursor-pointer flex flex-col gap-2 ${
                      selectedOfficeId === office.id
                        ? 'border-[#0B1F3A] bg-white shadow-md'
                        : 'border-[#D1D5DB] bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold text-sm text-[#0B1F3A] font-serif tracking-tight">{office.name}</span>
                      {selectedOfficeId === office.id && (
                        <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                      )}
                    </div>
                    <p className="text-xs text-slate-800 leading-tight font-medium">{office.building}, {office.room}</p>
                    <p className="text-[11px] text-slate-600 font-mono mt-1 font-bold">{office.address}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Location Card Details */}
            <div className="bg-white border border-[#D1D5DB] p-6 rounded-none space-y-5">
              <h3 className="text-base font-bold text-[#0B1F3A] font-serif border-b border-[#D1D5DB] pb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                Contact Info & Location Details
              </h3>

              <div className="space-y-4 text-xs">
                {/* Building / Room */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-none bg-[#F3F4F6] border border-[#D1D5DB] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#0B1F3A]" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#0B1F3A]">Office Location</span>
                    <span className="text-slate-800 leading-relaxed font-medium">
                      {selectedOffice.building}, {selectedOffice.room}, {selectedOffice.address}
                    </span>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-none bg-[#F3F4F6] border border-[#D1D5DB] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#0B1F3A]" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#0B1F3A]">Direct Telephone</span>
                    <a
                      href={`tel:${selectedOffice.phone}`}
                      className="text-[#C5A880] hover:text-[#0B1F3A] hover:underline transition-all font-bold"
                    >
                      {selectedOffice.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-none bg-[#F3F4F6] border border-[#D1D5DB] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#0B1F3A]" />
                  </div>
                  <div>
                    <span className="block font-bold text-[#0B1F3A]">Secure Email</span>
                    <a
                      href={`mailto:${selectedOffice.email}`}
                      className="text-slate-850 hover:text-[#0B1F3A] hover:underline transition-all font-bold"
                    >
                      {selectedOffice.email}
                    </a>
                  </div>
                </div>

                {/* Directions Narrative */}
                <div className="p-4 bg-[#F3F4F6] border border-[#D1D5DB] rounded-none space-y-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-750 flex items-center gap-1 font-bold">
                    <Navigation className="w-3.5 h-3.5 text-[#C5A880]" />
                    Detailed Navigation Guide
                  </span>
                  <p className="text-slate-800 leading-relaxed font-medium">{selectedOffice.directions}</p>
                </div>
              </div>

              {/* Location Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleCopyDirections(selectedOffice)}
                  className="flex-1 py-3 bg-white border border-[#D1D5DB] hover:border-[#0B1F3A] text-slate-850 hover:text-[#0B1F3A] rounded-none text-[10px] uppercase font-bold tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedId === selectedOffice.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-650" />
                      Copy Address
                    </>
                  )}
                </button>

                <a
                  href={getMapLink(selectedOffice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#0B1F3A] text-white hover:bg-black rounded-none text-[10px] uppercase font-bold tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
                  Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Right Panel: Offline Interactive Vector Map Simulator (Col-7) */}
          <div className="lg:col-span-7 bg-white border border-[#D1D5DB] p-6 md:p-8 rounded-none space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0B1F3A] font-serif">
                  Live Map Interface
                </h3>
                <p className="text-[11px] text-slate-700 mt-0.5 font-bold">High-fidelity vector simulation • Fully functional offline</p>
              </div>
              <span className="text-[10px] font-mono text-[#0B1F3A] font-bold bg-[#F3F4F6] border border-[#D1D5DB] px-2.5 py-0.5 rounded-none">
                LAT: {selectedOffice.coordinates.lat} / LNG: {selectedOffice.coordinates.lng}
              </span>
            </div>

            {/* SVG Visual Map Board */}
            <div className="relative aspect-[4/3] w-full bg-[#FFFDF9] border border-[#D1D5DB] rounded-none overflow-hidden flex items-center justify-center">
              {/* grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,31,58,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,31,58,0.03)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

              <svg viewBox="0 0 400 300" className="w-full h-full relative z-10 max-w-lg">
                {/* General Road Networks */}
                <line x1="0" y1="120" x2="400" y2="120" stroke="#0B1F3A" strokeWidth="8" strokeOpacity="0.8" strokeLinecap="round" />
                <line x1="180" y1="0" x2="180" y2="300" stroke="#0B1F3A" strokeWidth="8" strokeOpacity="0.8" strokeLinecap="round" strokeDasharray="6,4" />

                {/* Grid landmarks */}
                <rect x="30" y="30" width="80" height="50" rx="0" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
                <text x="70" y="58" fill="#0B1F3A" fontSize="8" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">REVENUE PLAZA</text>

                <rect x="250" y="30" width="110" height="50" rx="0" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
                <text x="305" y="58" fill="#0B1F3A" fontSize="8" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">COMMERCIAL COURT</text>

                <rect x="30" y="210" width="100" height="50" rx="0" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
                <text x="80" y="238" fill="#0B1F3A" fontSize="8" textAnchor="middle" fontWeight="bold" letterSpacing="0.05em">CENTRAL BANK</text>

                {/* Nairobi specific markers */}
                {selectedOfficeId === 'nairobi' && (
                  <>
                    <path d="M 230 180 Q 280 200 340 230" fill="none" stroke="#C5A880" strokeWidth="2" strokeDasharray="3,3" />
                    
                    {/* Vedic House */}
                    <rect x="230" y="160" width="110" height="70" rx="0" fill="#FFFFFF" stroke="#0B1F3A" strokeWidth="2" />
                    <text x="285" y="185" fill="#0B1F3A" fontSize="10" textAnchor="middle" fontWeight="bold">VEDIC HOUSE</text>
                    <text x="285" y="200" fill="#C5A880" fontSize="8" textAnchor="middle" fontWeight="bold">ROOM 205</text>
                    <text x="285" y="214" fill="#334155" fontSize="7" textAnchor="middle" fontWeight="bold">MAMA NGINA ST.</text>

                    {/* Opposite Landmark */}
                    <rect x="30" y="140" width="110" height="40" rx="0" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
                    <text x="85" y="163" fill="#0B1F3A" fontSize="8" textAnchor="middle" fontWeight="bold">HILTON HOTEL</text>

                    {/* Glowing Office Pin */}
                    <g transform="translate(285, 140)">
                      <circle cx="0" cy="0" r="14" fill="#C5A880" fillOpacity="0.2" className="animate-ping" />
                      <circle cx="0" cy="0" r="8" fill="#C5A880" fillOpacity="0.4" />
                      <circle cx="0" cy="0" r="4" fill="#0B1F3A" />
                      <line x1="0" y1="0" x2="0" y2="15" stroke="#0B1F3A" strokeWidth="2" />
                    </g>
                  </>
                )}

                {/* Kikuyu specific markers */}
                {selectedOfficeId === 'kikuyu' && (
                  <>
                    {/* Southern Bypass route representing Interchange */}
                    <path d="M 0 280 Q 200 150 400 280" fill="none" stroke="#0B1F3A" strokeWidth="10" strokeOpacity="0.6" strokeLinecap="round" />
                    <text x="130" y="195" fill="#C5A880" fontSize="7" fontWeight="bold" transform="rotate(-15, 130, 195)">SOUTHERN BYPASS</text>

                    {/* Victory Plaza */}
                    <rect x="220" y="140" width="120" height="70" rx="0" fill="#FFFFFF" stroke="#0B1F3A" strokeWidth="2" />
                    <text x="280" y="165" fill="#0B1F3A" fontSize="10" textAnchor="middle" fontWeight="bold">VICTORY PLAZA</text>
                    <text x="280" y="180" fill="#C5A880" fontSize="8" textAnchor="middle" fontWeight="bold">SUITE A3 (1ST FLR)</text>
                    <text x="280" y="194" fill="#334155" fontSize="7" textAnchor="middle" fontWeight="bold">BYPASS INTERCHANGE</text>

                    {/* Glowing Office Pin */}
                    <g transform="translate(280, 120)">
                      <circle cx="0" cy="0" r="14" fill="#C5A880" fillOpacity="0.2" className="animate-ping" />
                      <circle cx="0" cy="0" r="8" fill="#C5A880" fillOpacity="0.4" />
                      <circle cx="0" cy="0" r="4" fill="#0B1F3A" />
                      <line x1="0" y1="0" x2="0" y2="15" stroke="#0B1F3A" strokeWidth="2" />
                    </g>
                  </>
                )}
              </svg>

              {/* Pin Tag */}
              <div className="absolute bottom-4 left-4 bg-white/95 border border-[#D1D5DB] rounded-none px-3.5 py-2 z-10 flex items-center gap-2 max-w-xs shadow-sm">
                <MapPin className="w-4 h-4 text-[#C5A880]" />
                <div className="text-[10px]">
                  <p className="font-bold text-[#0B1F3A] uppercase tracking-wider">{selectedOffice.building}</p>
                  <p className="text-slate-800 mt-0.5 font-bold">{selectedOffice.room}</p>
                </div>
              </div>
            </div>

            {/* Offline directions notice */}
            <div className="p-4 bg-[#F3F4F6] border border-[#D1D5DB] rounded-none flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-800 leading-relaxed font-medium">
                <p className="font-bold text-[#0B1F3A]">How to use this map</p>
                <p className="mt-0.5 font-medium">Toggle between Nairobi and Kikuyu branches on the left to see precise relative layout coordinates, buildings, and suite rooms. Tap "Google Maps" for active GPS directions on your device.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
