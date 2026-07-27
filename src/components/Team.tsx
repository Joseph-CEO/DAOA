/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Award, CheckCircle, Mail, MessageSquare, X, ShieldAlert } from 'lucide-react';
import { TEAM_MEMBERS } from '../data';
import { TeamMember } from '../types';
import { Image } from './Image';

interface TeamProps {
  addToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

export const Team: React.FC<TeamProps> = ({ addToast }) => {
  const [selectedAttorney, setSelectedAttorney] = useState<TeamMember | null>(null);
  const [attorneyMessage, setAttorneyMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendDirectMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAttorney || attorneyMessage.trim().length < 5) return;

    setIsSending(true);

    // Simulate sending an encrypted email to the specific advocate
    setTimeout(() => {
      addToast(
        `Your direct message has been securely forwarded to ${selectedAttorney.name}. They will respond to your registered contact.`,
        'success'
      );
      setAttorneyMessage('');
      setIsSending(false);
      setSelectedAttorney(null);
    }, 1200);
  };

  return (
    <section id="team" className="py-24 bg-white border-t border-[#D1D5DB] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#0B1F3A]" />
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-light font-serif text-[#0B1F3A] tracking-tight">
            Meet Our Legal <span className="font-bold italic text-[#C5A880]">Professionals</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            Our sole proprietorship brings together dedicated advocates and legal assistants possessing deep understanding of the Kenyan judicial registry, regulatory bodies, and land transfer systems.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((adv) => (
            <div
              key={adv.id}
              className="bg-[#F3F4F6] border border-[#D1D5DB] rounded-none overflow-hidden group hover:border-slate-400 transition-all flex flex-col justify-between"
              id={`team-member-${adv.id}`}
            >
              {/* Image & Header */}
              <div>
                <div className="relative overflow-hidden bg-[#F3F4F6] w-full">
                  <Image
                    src={adv.imageUrl}
                    alt={adv.name}
                    width={400}
                    height={600}
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="top center"
                    priority
                    className="w-full group-hover:scale-102 transition-all duration-500"
                  />
                  
                  {/* Floating Credentials Badge */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-white bg-[#0B1F3A] border border-[#D1D5DB]/30 px-3 py-1 rounded-none backdrop-blur-xs">
                      {adv.role}
                    </span>
                  </div>
                </div>

                {/* Professional Qualifications */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-[#0B1F3A] font-serif tracking-tight">{adv.name}</h3>
                    <p className="text-[10px] text-[#C5A880] font-bold mt-1 uppercase tracking-widest">{adv.subRole}</p>
                  </div>

                  <p className="text-xs text-slate-850 leading-relaxed font-medium">{adv.bio}</p>

                  <div className="space-y-2 pt-2 border-t border-[#D1D5DB]">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#0B1F3A] font-bold flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#C5A880]" />
                      Academic & Licensure
                    </span>
                    <ul className="space-y-1.5">
                      {adv.qualifications.map((q, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-800 leading-relaxed font-medium">
                          <CheckCircle className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action: Direct Message Launcher */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedAttorney(adv)}
                  className="w-full py-2.5 bg-white border border-[#D1D5DB] hover:border-slate-400 text-slate-850 hover:text-[#0B1F3A] rounded-none text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
                  Message Directly
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal/Drawer Overlay for direct message */}
        <AnimatePresence>
          {selectedAttorney && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-[#0B1F3A]/60 backdrop-blur-sm"
                onClick={() => setSelectedAttorney(null)}
              />

              {/* Dialog Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white border border-[#D1D5DB] rounded-none shadow-2xl p-6 md:p-8 w-full max-w-lg text-[#0B1F3A] z-10"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-[#0B1F3A]">Encrypted Counsel Message</h3>
                    <p className="text-xs text-slate-700 mt-1 font-medium">Direct inquiries to {selectedAttorney.name}</p>
                  </div>
                  <button
                    onClick={() => setSelectedAttorney(null)}
                    className="p-1.5 text-slate-700 hover:text-[#0B1F3A] hover:bg-[#F3F4F6] rounded-none transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSendDirectMessage} className="space-y-4">
                  <div className="p-4 bg-[#F3F4F6] border border-[#D1D5DB] rounded-none space-y-2">
                    <p className="text-[9px] font-bold text-slate-750 uppercase tracking-widest">Selected Recipient</p>
                    <p className="text-sm font-bold text-[#0B1F3A]">{selectedAttorney.name}</p>
                    <p className="text-xs text-slate-800 font-medium">{selectedAttorney.subRole}</p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A] mb-2">
                      Your Legal Inquiry *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your confidential inquiry or brief context of your case..."
                      value={attorneyMessage}
                      onChange={(e) => setAttorneyMessage(e.target.value)}
                      className="w-full bg-white border border-[#D1D5DB] rounded-none p-4 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] transition-all resize-none"
                    />
                  </div>

                  <div className="bg-[#C5A880]/10 p-3 rounded-none border border-[#C5A880]/20 flex gap-2 text-[10px] text-slate-700 leading-relaxed">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-[#C5A880]" />
                    <p>All direct counsel requests are strictly confidential. We will reply to the coordinates entered on the main consultations sheet or contact form within 4 business hours.</p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedAttorney(null)}
                      className="flex-1 py-3 border border-[#D1D5DB] hover:border-slate-400 text-slate-750 hover:text-[#0B1F3A] rounded-none text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSending || attorneyMessage.trim().length < 5}
                      className={`flex-1 py-3 rounded-none text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                        attorneyMessage.trim().length >= 5 && !isSending
                          ? 'bg-[#0B1F3A] text-white hover:bg-[#111111]'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isSending ? 'Forwarding...' : 'Secure Send'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
