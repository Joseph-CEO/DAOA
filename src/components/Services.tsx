/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, ChevronUp, CalendarPlus, HelpCircle, Check, ArrowRight } from 'lucide-react';
import { LEGAL_SERVICES, PRACTICE_CATEGORIES } from '../data';
import { LegalService } from '../types';

// Precise static icon map to avoid bundling errors or slow renders
import {
  Home,
  Briefcase,
  Users,
  Scroll,
  HeartHandshake,
  ShieldAlert,
  Scale,
  Coins,
  FileText,
  TrendingDown,
  MailWarning,
  FileCheck,
  Gavel,
  Heart
} from 'lucide-react';

const ServiceIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Home': return <Home className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Scroll': return <Scroll className={className} />;
    case 'HeartHandshake': return <HeartHandshake className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'Coins': return <Coins className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'TrendingDown': return <TrendingDown className={className} />;
    case 'MailWarning': return <MailWarning className={className} />;
    case 'FileCheck': return <FileCheck className={className} />;
    case 'Gavel': return <Gavel className={className} />;
    case 'Heart': return <Heart className={className} />;
    default: return <Scale className={className} />;
  }
};

interface ServicesProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceToBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  // Clear search query
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  // Toggle card expansion safely
  const toggleExpand = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  // Filter legal services based on search text and selected category
  const filteredServices = useMemo(() => {
    return LEGAL_SERVICES.filter((srv) => {
      const matchesCategory = selectedCategory === 'all' || srv.category === selectedCategory;
      const textToSearch = `${srv.title} ${srv.description} ${srv.longDescription} ${srv.category}`.toLowerCase();
      const matchesSearch = textToSearch.includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="services" className="py-24 bg-[#F3F4F6] border-t border-[#D1D5DB] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A880] flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#0B1F3A]" />
            Our Practice Areas
          </span>
          <h2 className="text-3xl sm:text-4xl font-light font-serif text-[#0B1F3A] tracking-tight">
            Tailored Legal <span className="font-bold italic text-[#C5A880]">Solutions</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            From seamless real estate conveyancing to complex commercial transactions and empathetic family representation, we deliver ethical and results-driven advice across Kenya.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 pb-6 border-b border-[#D1D5DB]">
          
          {/* Categories Tab Bar */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {PRACTICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-none text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0B1F3A] text-white'
                    : 'bg-white text-slate-800 hover:text-[#0B1F3A] border border-[#D1D5DB]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-600">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search legal services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#D1D5DB] rounded-none pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] transition-all placeholder:text-slate-550 font-bold"
              aria-label="Search Legal Services"
            />
          </div>

        </div>

        {/* Services Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-none border border-[#D1D5DB]">
            <p className="text-sm font-bold text-slate-850">No matching legal services found</p>
            <p className="text-xs text-slate-700 mt-1 max-w-xs mx-auto font-medium">Try refining your keyword or selecting "All Practice Areas" above.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-5 py-2 bg-[#0B1F3A] hover:bg-black text-white rounded-none text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((srv) => {
                const isExpanded = expandedServiceId === srv.id;
                return (
                  <motion.div
                    key={srv.id}
                    layout="position"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`bg-white border rounded-none p-6 transition-all duration-300 flex flex-col justify-between ${
                      isExpanded
                        ? 'border-[#0B1F3A] shadow-lg ring-1 ring-[#0B1F3A]'
                        : 'border-[#D1D5DB] hover:border-slate-400 shadow-sm'
                    }`}
                    id={`service-card-${srv.id}`}
                  >
                    <div className="space-y-4">
                      {/* Top Header */}
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-none bg-[#F3F4F6] border border-[#D1D5DB] flex items-center justify-center">
                          <ServiceIcon name={srv.iconName} className="w-5 h-5 text-[#0B1F3A]" />
                        </div>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-slate-800 bg-[#F3F4F6] px-2.5 py-1 rounded-none border border-[#D1D5DB]">
                          {srv.category}
                        </span>
                      </div>

                      {/* Title & Short Description */}
                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-[#0B1F3A] font-serif tracking-tight">{srv.title}</h3>
                        <p className="text-xs text-slate-800 leading-relaxed font-medium">{srv.description}</p>
                      </div>

                      {/* Expandable Deep Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pt-4 border-t border-[#D1D5DB] space-y-4 text-xs"
                          >
                            <p className="text-slate-850 leading-relaxed font-medium">{srv.longDescription}</p>
                            
                            <div className="space-y-2">
                              <span className="font-bold text-[#0B1F3A] flex items-center gap-1.5 uppercase text-[9px] tracking-wider">
                                <HelpCircle className="w-3.5 h-3.5 text-[#C5A880]" />
                                Issues We Frequently Handle:
                              </span>
                              <ul className="space-y-1.5 pl-0.5">
                                {srv.commonIssues.map((issue, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-slate-750 leading-relaxed font-bold">
                                    <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                                    <span>{issue}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Actions Panel */}
                    <div className="mt-6 pt-4 border-t border-[#D1D5DB] flex items-center justify-between gap-4">
                      <button
                        onClick={() => toggleExpand(srv.id)}
                        className="text-[10px] font-bold text-slate-750 hover:text-[#0B1F3A] transition-colors cursor-pointer flex items-center gap-1 uppercase tracking-wider"
                        aria-label={`Learn more about ${srv.title}`}
                      >
                        {isExpanded ? (
                          <>
                            Show Less
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            Learn More
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onSelectServiceToBook(srv.id)}
                        className="flex items-center gap-1.5 bg-[#0B1F3A] text-white hover:bg-black font-bold px-4 py-2.5 rounded-none text-[10px] uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                        aria-label={`Book a consultation for ${srv.title}`}
                      >
                        <CalendarPlus className="w-3.5 h-3.5" />
                        Book
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
