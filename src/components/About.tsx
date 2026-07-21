/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, EyeOff, Gavel, Scale, FileCheck, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'values' | 'integrity'>('mission');

  const pillars = [
    {
      icon: <Shield className="w-5 h-5 text-[#C5A880]" />,
      title: 'Trust & Credibility',
      desc: 'We earn client trust through unwavering excellence, legal accuracy, and clear expectations.'
    },
    {
      icon: <EyeOff className="w-5 h-5 text-[#C5A880]" />,
      title: 'Strict Confidentiality',
      desc: 'All communications, records, and files are protected under absolute advocate-client privilege.'
    },
    {
      icon: <FileCheck className="w-5 h-5 text-[#C5A880]" />,
      title: 'Ethical Integrity',
      desc: 'We operate with transparent billing, objective legal guidance, and complete honesty.'
    },
    {
      icon: <Scale className="w-5 h-5 text-[#C5A880]" />,
      title: 'Results-Driven Focus',
      desc: 'Our strategic priority is finding practical, legal pathways that deliver optimal results.'
    }
  ];

  const philosophyContent = {
    mission: {
      title: 'Our Commitment to Legal Excellence',
      text: 'To deliver practical, robust, and results-driven legal counsel that addresses client problems seamlessly. We exist to simplify the legal process for our clients while securing their assets, businesses, and family inheritance rights with absolute diligence under Kenyan law.',
      bullets: [
        'Personalized care for every file with a lead Advocate.',
        'Pragmatic options designed to resolve issues cost-effectively.',
        'Regular, clear communication regarding file progress and court schedules.'
      ]
    },
    values: {
      title: 'Core Values & Professional Conduct',
      text: 'DA Omwenga & Co. Advocates operates on the founding principles of ethical legal practice. We reject short-cuts, ensuring that every land transaction, corporate registration, or representation is fully verified and legally pristine.',
      bullets: [
        'Uncompromising adherence to professional code of ethics.',
        'Continuous legal learning to stay ahead of land and tax reforms.',
        'Direct advocate accessibility for urgent, sensitive matters.'
      ]
    },
    integrity: {
      title: 'Advocate-Client Trust Protocol',
      text: 'We understand that legal matters often involve personal anxiety and high financial stakes. Our firm is structured to provide an oasis of trust, security, and competence, protecting your business intelligence and family privacy.',
      bullets: [
        'Encrypted, secure backup of all deed files and land documents.',
        'Clear, written retainer agreements with transparent flat fees.',
        'Proactive conflict search before opening any new client file.'
      ]
    }
  };

  return (
    <section id="about" className="py-24 bg-white border-t border-[#D1D5DB] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Narrative Summary */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#0B1F3A]" />
              Who We Are
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-light font-serif tracking-tight text-[#0B1F3A] leading-tight">
              DA Omwenga & Co. <br /><span className="font-bold italic text-[#C5A880]">Advocates</span>
            </h2>
            
            <p className="text-sm text-slate-700 leading-relaxed font-light">
              DA Omwenga & Co. Advocates is a distinguished sole proprietorship law firm committed to delivering practical, ethical, and results-driven legal services in Kenya.
            </p>
            
            <p className="text-sm text-slate-800 leading-relaxed font-normal">
              We provide personalized legal solutions while upholding professionalism, confidentiality, and integrity in every single matter entrusted to our care. Our primary objective is to offer stellar representation, safeguarding our clients' interests in corporate deals, land transfers, or tribunal disputes.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="border border-[#D1D5DB] bg-[#F3F4F6] p-4 rounded-none">
                <span className="block text-2xl font-bold font-serif text-[#0B1F3A]">100%</span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-700">Sole proprietorship dedication</span>
              </div>
              <div className="border border-[#D1D5DB] bg-[#F3F4F6] p-4 rounded-none">
                <span className="block text-2xl font-bold font-serif text-[#0B1F3A]">4+</span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-700">Office lines available</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Philosophy Tabs & Pillar cards */}
          <div className="lg:col-span-7 space-y-10">
            {/* Value Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-[#F3F4F6] border border-[#D1D5DB] p-5 rounded-none hover:shadow-md transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-none bg-white border border-[#D1D5DB] flex items-center justify-center mb-3.5">
                    {p.icon}
                  </div>
                  <h3 className="font-bold text-sm text-[#0B1F3A] uppercase tracking-tight">{p.title}</h3>
                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed font-medium">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Interactive Philosophy Tab Switcher */}
            <div className="bg-[#F3F4F6] border border-[#D1D5DB] rounded-none p-6 md:p-8 space-y-6">
              {/* Tab selectors */}
              <div className="flex border-b border-[#D1D5DB] pb-2 flex-wrap gap-2">
                {(['mission', 'values', 'integrity'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-none transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'bg-[#0B1F3A] text-white'
                        : 'text-slate-700 hover:text-[#0B1F3A]'
                    }`}
                  >
                    {tab === 'mission' ? 'Our Purpose' : tab === 'values' ? 'Professional Code' : 'Client Trust'}
                  </button>
                ))}
              </div>

              {/* Dynamic Content */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#0B1F3A] font-serif">
                  {philosophyContent[activeTab].title}
                </h3>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {philosophyContent[activeTab].text}
                </p>
                <ul className="space-y-2 pt-2">
                  {philosophyContent[activeTab].bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
