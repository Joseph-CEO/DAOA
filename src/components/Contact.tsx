/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { PHONE_NUMBERS, MAIN_EMAIL, WHATSAPP_NUMBER } from '../data';

interface ContactProps {
  addToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

export const Contact: React.FC<ContactProps> = ({ addToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Simple validation checks
  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      name.trim().length >= 3 &&
      emailRegex.test(email) &&
      phone.trim().length >= 9 &&
      subject.trim().length >= 4 &&
      message.trim().length >= 10
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);

    // Simulate sending messages with latency
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      addToast('Inquiry sent successfully! Our administrative desk will call you shortly.', 'success');
      
      // Reset after brief success message
      setTimeout(() => {
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent("Hello DA Omwenga & Co. Advocates, I would like to book a quick consultation.");
    return `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${text}`;
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-[#D1D5DB] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#0B1F3A]" />
            Contact Center
          </span>
          <h2 className="text-3xl sm:text-4xl font-light font-serif text-[#0B1F3A] tracking-tight">
            Consult With Our <span className="font-bold italic text-[#C5A880]">Experts</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-650 font-light leading-relaxed">
            Reach out via phone, email, direct encrypted WhatsApp chat, or complete the secure inquiry sheet below to establish advocate-client communications.
          </p>
        </div>

        {/* Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Channels & Cards (Col-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F3F4F6] border border-[#D1D5DB] p-6 rounded-none space-y-6">
              <h3 className="text-base font-bold font-serif text-[#0B1F3A] pb-3 border-b border-[#D1D5DB]">
                Direct Communication Channels
              </h3>

              {/* Telephone Hotlines */}
              <div className="space-y-3">
                <span className="block text-[9px] uppercase font-bold tracking-widest text-slate-550 font-mono">
                  Telephones (Click to Call)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {PHONE_NUMBERS.map((ph, idx) => (
                    <a
                      key={idx}
                      href={`tel:${ph.value}`}
                      className="p-3 bg-white border border-[#D1D5DB] hover:border-slate-400 rounded-none flex items-center gap-2 text-xs font-bold text-[#0B1F3A] transition-all cursor-pointer"
                      title={`Call ${ph.display}`}
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                      <span>{ph.display}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Email Addresses */}
              <div className="space-y-2">
                <span className="block text-[9px] uppercase font-bold tracking-widest text-slate-550 font-mono">
                  Email Correspondence
                </span>
                <a
                  href={`mailto:${MAIN_EMAIL}`}
                  className="p-3.5 bg-white border border-[#D1D5DB] hover:border-slate-400 rounded-none flex items-center gap-2 text-xs font-bold text-[#0B1F3A] transition-all cursor-pointer w-full"
                >
                  <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span className="truncate">{MAIN_EMAIL}</span>
                </a>
              </div>

              {/* WhatsApp Hotlink */}
              <div className="space-y-2">
                <span className="block text-[9px] uppercase font-bold tracking-widest text-slate-550 font-mono">
                  Instant Messaging Support
                </span>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white border border-[#C5A880] hover:border-[#0B1F3A] text-[#C5A880] hover:text-[#0B1F3A] rounded-none flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer w-full"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Confidentiality Notice */}
            <div className="bg-white border border-[#D1D5DB] p-5 rounded-none flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-650 leading-relaxed">
                <p className="font-bold text-[#0B1F3A]">Confidentiality Safeguard</p>
                <p className="mt-0.5">Please do not submit highly classified evidence or transaction receipts via general contact forms. Secure channels or physical meetings are preferred for handling sensitive litigation materials.</p>
              </div>
            </div>
          </div>

          {/* Right: Embedded Contact Form (Col-7) */}
          <div className="lg:col-span-7 bg-[#F3F4F6] border border-[#D1D5DB] p-6 md:p-8 rounded-none relative overflow-hidden">
            {isSuccess && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-xs z-10 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-none bg-emerald-50 border border-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1F3A] font-serif">Inquiry Lodge Complete</h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-sm">
                    Thank you. Your request was securely delivered to the registry. An Advocate will review and call you back in short order.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold font-serif text-[#0B1F3A] pb-3 border-b border-[#D1D5DB] mb-2">
                Secure Client Intake Form
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Client Name */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Njuguna"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#D1D5DB] rounded-none px-4 py-3 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] transition-all"
                  />
                </div>

                {/* Telephone */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A] mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 0715 570 050"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#D1D5DB] rounded-none px-4 py-3 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. samuel@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#D1D5DB] rounded-none px-4 py-3 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] transition-all"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A] mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Land registration inquiry / Sale agreement drafting"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-[#D1D5DB] rounded-none px-4 py-3 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A]">
                    Your Message / Situation context *
                  </label>
                  <span className="text-[9px] text-slate-500 font-mono">
                    {message.length} / 1000 chars
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  maxLength={1000}
                  placeholder="Provide essential details regarding your legal request..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-[#D1D5DB] rounded-none p-4 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid()}
                className={`w-full py-4 rounded-none text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isFormValid() && !isSubmitting
                    ? 'bg-[#0B1F3A] text-white hover:bg-black shadow-sm'
                    : 'bg-slate-200 text-slate-450 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4 text-[#C5A880]" />
                {isSubmitting ? 'Sending Request...' : 'Send Secure Inquiry'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
