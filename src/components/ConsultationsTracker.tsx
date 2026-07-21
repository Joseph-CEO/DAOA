/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Briefcase, Trash2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ConsultationBooking } from '../types';
import { LEGAL_SERVICES, TEAM_MEMBERS } from '../data';

interface ConsultationsTrackerProps {
  bookingsUpdatedToggle: boolean;
  onCancelBooking: () => void;
  addToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

export const ConsultationsTracker: React.FC<ConsultationsTrackerProps> = ({
  bookingsUpdatedToggle,
  onCancelBooking,
  addToast
}) => {
  const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage with simulation delay
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const stored = localStorage.getItem('da_omwenga_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        setBookings([]);
      }
      setIsLoading(false);
    }, 1000); // Elegant skeleton loaders transition
    return () => clearTimeout(timer);
  }, [bookingsUpdatedToggle]);

  const handleCancel = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to cancel this legal consultation?');
    if (!confirmed) return;

    const updated = bookings.map((b) => {
      if (b.id === id) {
        return { ...b, status: 'Cancelled' as const };
      }
      return b;
    });

    setBookings(updated);
    localStorage.setItem('da_omwenga_bookings', JSON.stringify(updated));
    addToast('Consultation cancelled successfully.', 'info');
    onCancelBooking();
  };

  const getServiceTitle = (id: string) => {
    const srv = LEGAL_SERVICES.find((s) => s.id === id);
    return srv ? srv.title : 'General Legal Advice';
  };

  const getAttorneyName = (id: string) => {
    const att = TEAM_MEMBERS.find((t) => t.id === id);
    return att ? att.name : 'Dominic Omwenga';
  };

  const activeBookings = bookings.filter((b) => b.status !== 'Cancelled');
  const cancelledBookings = bookings.filter((b) => b.status === 'Cancelled');

  return (
    <div className="w-full bg-white rounded-none border border-[#D1D5DB] p-6 md:p-8" id="consultations-dashboard">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="text-lg font-bold font-serif tracking-tight text-[#0B1F3A]">Your Scheduled Consultations</h4>
          <p className="text-xs text-slate-800 mt-1 font-medium">Manage and track your upcoming appointments with our legal team.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="text-[10px] font-bold text-[#0B1F3A] uppercase tracking-wider">Local Offline Sync Active</span>
        </div>
      </div>

      {isLoading ? (
        // Premium Skeleton Loader
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-[#F3F4F6] border border-[#D1D5DB] rounded-none p-5 animate-pulse flex flex-col gap-3">
              <div className="h-4 bg-slate-300 rounded-none w-1/3" />
              <div className="h-3 bg-slate-300 rounded-none w-2/3" />
              <div className="flex gap-4 pt-2">
                <div className="h-3 bg-slate-300 rounded-none w-20" />
                <div className="h-3 bg-slate-300 rounded-none w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-10 px-4 bg-[#F3F4F6]/40 border border-dashed border-[#D1D5DB] rounded-none">
          <Calendar className="w-8 h-8 text-[#C5A880] mx-auto mb-3" />
          <p className="text-sm text-[#0B1F3A] font-bold">No consultations scheduled yet</p>
          <p className="text-xs text-slate-700 mt-1 max-w-sm mx-auto font-medium">
            Book an appointment using our consultation form. Your scheduled visits will appear here for easy management.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Consultations */}
          {activeBookings.length > 0 && (
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest block mb-1">Upcoming Sessions</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {activeBookings.map((b) => (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-[#F3F4F6] border border-[#D1D5DB] rounded-none p-5 hover:border-slate-400 transition-all flex flex-col justify-between"
                      id={`booking-card-${b.id}`}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs font-bold text-[#0B1F3A] px-2.5 py-1 bg-white rounded-none border border-[#D1D5DB] flex items-center gap-1.5">
                            <Briefcase className="w-3 h-3 text-[#C5A880]" />
                            {getServiceTitle(b.serviceId)}
                          </span>
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-none flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-500" />
                            Confirmed
                          </span>
                        </div>

                        <div className="space-y-2 text-xs text-slate-900 font-medium">
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-[#C5A880]" />
                            <span className="font-bold text-[#0B1F3A]">{getAttorneyName(b.attorneyId)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                            <span>{new Date(b.date).toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                            <span>{b.timeSlot} (East Africa Time)</span>
                          </div>
                          {b.notes && (
                            <div className="p-2.5 bg-white rounded-none text-[11px] text-slate-750 border border-[#D1D5DB] font-medium">
                              <span className="font-bold block text-[#0B1F3A] mb-0.5">Your Notes:</span>
                              "{b.notes}"
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#D1D5DB] flex justify-between items-center text-[10px] text-slate-700 font-bold">
                        <span>Booked on {new Date(b.createdAt).toLocaleDateString()}</span>
                        <button
                          onClick={() => handleCancel(b.id)}
                          className="flex items-center gap-1 px-2.5 py-1 text-rose-600 hover:text-white hover:bg-rose-600 rounded-none border border-transparent hover:border-rose-600 transition-all font-bold uppercase tracking-wider text-[9px] cursor-pointer"
                          title="Cancel Consultation"
                        >
                          <Trash2 className="w-3 h-3 text-[#C5A880]" />
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Cancelled Sessions */}
          {cancelledBookings.length > 0 && (
            <div className="space-y-2">
              <button 
                type="button"
                className="text-[10px] font-bold text-slate-700 uppercase tracking-widest block mb-1 mt-4"
              >
                History (Cancelled)
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 opacity-75">
                {cancelledBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#F3F4F6] border border-[#D1D5DB] rounded-none p-4 flex justify-between items-center text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-700 line-through">{getServiceTitle(b.serviceId)}</p>
                      <p className="text-[11px] text-slate-600 mt-0.5 font-bold">With {getAttorneyName(b.attorneyId)} on {b.date}</p>
                    </div>
                    <span className="text-[9px] font-bold text-rose-700 bg-rose-50 border border-rose-300 px-2 py-0.5 rounded-none">
                      Cancelled
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
