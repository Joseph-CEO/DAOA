/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, ShieldCheck, Scale, Award } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToContact }) => {
  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#0B1F3A]"
    >
      {/* Structural Minimalist Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40" />

      {/* Decorative Premium Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] rounded-full bg-white/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-white/10 border border-white/20 text-[#D1D5DB] text-[10px] font-semibold uppercase tracking-[0.15em]"
            >
              <Award className="w-4 h-4 text-[#C5A880]" />
              <span>Dedicated Advocate Sole Proprietorship • Kenya</span>
            </motion.div>

            <div className="space-y-4">
              <div className="w-12 h-1 bg-[#C5A880] mx-auto lg:mx-0"></div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.1] tracking-tight text-white font-light"
              >
                Your Partner in <br />
                <span className="italic text-[#C5A880] font-normal font-serif">Legal</span> <span className="font-bold font-serif">Navigation.</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base text-[#D1D5DB] max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Providing dependable legal representation and advisory services for individuals, families, and businesses across Kenya.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#b2956f] text-[#0B1F3A] font-bold px-8 py-4 rounded-none text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg group"
              >
                Book Consultation
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToContact}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-none text-xs uppercase tracking-widest border border-white/30 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Contact Us
              </button>
            </motion.div>

            {/* Feature Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-3 justify-center lg:justify-start text-[10px] font-bold uppercase tracking-widest text-[#D1D5DB]"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Absolute Confidentiality</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#C5A880]" />
                <span>Results-Driven Counsel</span>
              </div>
            </motion.div>
          </div>

          {/* Aesthetic Law Pillar Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:col-span-5 relative lg:flex justify-center"
          >
            <div className="relative w-80 h-[480px] rounded-none bg-white/5 border border-white/15 p-8 flex flex-col justify-between overflow-hidden group hover:border-white/25 transition-all duration-500 shadow-2xl">
              
              {/* Pillar Design Line Accents */}
              <div className="absolute top-0 right-10 w-px h-full bg-white/5" />
              <div className="absolute top-1/2 left-0 w-full h-px bg-white/5" />

              {/* Decorative Scale SVG representing justice */}
              <div className="absolute -bottom-10 -right-10 text-white/5 transition-transform duration-700 group-hover:scale-105 pointer-events-none">
                <Scale className="w-64 h-64" />
              </div>

              {/* Card Header */}
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-none bg-white/10 border border-white/20 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif italic text-2xl text-white">Ethical. Practical.</h3>
                  <p className="text-xs text-[#D1D5DB] tracking-wide font-light leading-relaxed">
                    Personalized legal representation upholding professionalism, confidentiality, and integrity in every matter.
                  </p>
                </div>
              </div>

              {/* Quick Legal Precept Quote Card */}
              <div className="bg-white/10 border border-white/20 p-5 rounded-none space-y-3 relative z-10 shadow-lg">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#C5A880] flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  Legal Maxim
                </p>
                <blockquote className="text-xs text-white italic font-light leading-relaxed">
                  "Let justice be done, though the heavens may fall."
                </blockquote>
                <p className="text-[10px] text-slate-200 font-semibold">— Fiat justitia ruat caelum</p>
              </div>

              {/* Card Footer badges */}
              <div className="flex items-center justify-between text-[9px] font-mono text-[#D1D5DB] font-semibold uppercase tracking-wider">
                <span>EST. 2026</span>
                <span>NAIROBI & KIKUYU</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
