/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Check, Briefcase, ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react';
import { LEGAL_SERVICES, TEAM_MEMBERS } from '../data';
import { ConsultationBooking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  addToast: (text: string, type: 'success' | 'error' | 'info') => void;
  onBookingSuccess?: () => void;
}

const TIME_SLOTS = [
  '08:30 AM',
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM'
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId = '',
  addToast,
  onBookingSuccess
}) => {
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(preSelectedServiceId || '');
  const [attorneyId, setAttorneyId] = useState('dominic');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize when the modal opens with a pre-selected service
  useEffect(() => {
    if (isOpen && preSelectedServiceId) {
      setServiceId(preSelectedServiceId);
      setStep(1); // Reset to first step when opened with a service
    }
  }, [isOpen, preSelectedServiceId]);

  // Handle outside clicks to close the modal safely
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Simple step validation
  const isStepValid = () => {
    if (step === 1) return serviceId !== '';
    if (step === 2) return date !== '' && timeSlot !== '';
    if (step === 3) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(?:\+254|0)[17]\d{8}$/; // Kenyan format: 07... or 01... or +254...
      return (
        clientName.trim().length >= 3 &&
        emailRegex.test(clientEmail) &&
        clientPhone.trim().length >= 9
      );
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      const existingBookingsRaw = localStorage.getItem('da_omwenga_bookings');
      const existingBookings: ConsultationBooking[] = existingBookingsRaw
        ? JSON.parse(existingBookingsRaw)
        : [];

      // Check double-booking slot
      const isDoubleBooked = existingBookings.some(
        (b) => b.date === date && b.timeSlot === timeSlot && b.attorneyId === attorneyId && b.status !== 'Cancelled'
      );

      if (isDoubleBooked) {
        addToast(
          `The selected slot (${timeSlot} on ${date}) is already reserved for this Advocate. Please choose another slot.`,
          'error'
        );
        setIsSubmitting(false);
        setStep(2); // Go back to date-time selection
        return;
      }

      const newBooking: ConsultationBooking = {
        id: `book-${Date.now()}`,
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientPhone: clientPhone.trim(),
        serviceId,
        attorneyId,
        date,
        timeSlot,
        notes: notes.trim() || undefined,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };

      existingBookings.push(newBooking);
      localStorage.setItem('da_omwenga_bookings', JSON.stringify(existingBookings));

      addToast(
        `Consultation booked successfully! Dominic & team look forward to meeting you.`,
        'success'
      );

      setIsSubmitting(false);
      resetForm();
      onClose();
      if (onBookingSuccess) onBookingSuccess();
    }, 1200);
  };

  const resetForm = () => {
    setStep(1);
    setServiceId(preSelectedServiceId || '');
    setAttorneyId('dominic');
    setDate('');
    setTimeSlot('');
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setNotes('');
  };

  // Safe minimum date is tomorrow
  const getMinDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0B1F3A]/60 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-white border border-[#D1D5DB] rounded-none shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-[#0B1F3A]"
        id="booking-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#D1D5DB] shrink-0">
          <div>
            <h3 className="text-xl font-bold font-serif tracking-tight text-[#0B1F3A]">Book a Consultation</h3>
            <p className="text-xs text-[#C5A880] mt-1 font-bold uppercase tracking-widest">DA Omwenga & Co. Advocates • Legal Excellence</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-[#0B1F3A] hover:bg-[#F3F4F6] rounded-none transition-all"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress bar */}
        <div className="bg-[#F3F4F6] px-6 py-3 border-b border-[#D1D5DB] flex justify-between text-xs shrink-0">
          <div className="flex items-center gap-1.5 font-bold">
            <span className={`w-5 h-5 rounded-none flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#0B1F3A] text-white' : 'bg-slate-200 text-slate-500 border border-[#D1D5DB]'}`}>1</span>
            <span className={step === 1 ? 'text-[#0B1F3A]' : 'text-slate-800'}>Select Service & Advocate</span>
          </div>
          <div className="h-px bg-[#D1D5DB] flex-1 mx-4 self-center" />
          <div className="flex items-center gap-1.5 font-bold">
            <span className={`w-5 h-5 rounded-none flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#0B1F3A] text-white' : 'bg-slate-200 text-slate-500 border border-[#D1D5DB]'}`}>2</span>
            <span className={step === 2 ? 'text-[#0B1F3A]' : 'text-slate-800'}>Date & Time</span>
          </div>
          <div className="h-px bg-[#D1D5DB] flex-1 mx-4 self-center" />
          <div className="flex items-center gap-1.5 font-bold">
            <span className={`w-5 h-5 rounded-none flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#0B1F3A] text-white' : 'bg-slate-200 text-slate-500 border border-[#D1D5DB]'}`}>3</span>
            <span className={step === 3 ? 'text-[#0B1F3A]' : 'text-slate-800'}>Contact Details</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* STEP 1: SERVICE & ATTORNEY */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1F3A] mb-2.5 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#C5A880]" />
                    Select Practice Area *
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full bg-white border border-[#D1D5DB] rounded-none px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] transition-all"
                    required
                  >
                    <option value="" disabled>-- Select a Legal Service --</option>
                    {LEGAL_SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        [{srv.category}] {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1F3A] mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#C5A880]" />
                    Choose Legal Professional *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {TEAM_MEMBERS.map((adv) => (
                      <button
                        key={adv.id}
                        type="button"
                        onClick={() => setAttorneyId(adv.id)}
                        className={`text-left p-4 rounded-none border transition-all relative flex flex-col justify-between h-36 cursor-pointer ${
                          attorneyId === adv.id
                            ? 'border-[#0B1F3A] bg-[#F3F4F6] shadow-sm'
                            : 'border-[#D1D5DB] bg-white hover:bg-[#F3F4F6]'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-sm text-[#0B1F3A] font-serif">{adv.name}</p>
                          <p className="text-xs text-[#C5A880] font-bold mt-1 uppercase tracking-widest">{adv.role}</p>
                        </div>
                        <div className="flex justify-between items-end w-full mt-2">
                          <p className="text-[10px] text-slate-700 truncate max-w-[140px] font-bold">{adv.subRole}</p>
                          {attorneyId === adv.id && (
                            <span className="bg-[#0B1F3A] text-white rounded-none p-0.5">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#F3F4F6] p-4 rounded-none border border-[#D1D5DB] flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-800 leading-relaxed font-semibold">
                    <p className="font-bold text-[#0B1F3A]">Confidentiality Assured</p>
                    <p className="mt-0.5">All details submitted are protected under the client-advocate privilege. Your security and confidentiality are strictly prioritized.</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B1F3A] mb-2.5 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#C5A880]" />
                      Select Date *
                    </label>
                    <input
                      type="date"
                      min={getMinDateString()}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white border border-[#D1D5DB] rounded-none px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] transition-all"
                      required
                    />
                  </div>

                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#0B1F3A] mb-2.5 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#C5A880]" />
                      Select Time Slot *
                    </span>
                    <p className="text-xs text-slate-800 mb-2.5 font-bold">Available hours from Monday to Friday.</p>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#0B1F3A] mb-3">Available slots on your selected date:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`py-3 px-4 rounded-none text-sm font-bold border transition-all cursor-pointer ${
                          timeSlot === slot
                            ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white'
                            : 'border-[#D1D5DB] bg-white text-slate-800 hover:border-slate-400 hover:text-[#0B1F3A]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#C5A880]/10 rounded-none border border-[#C5A880]/20 text-xs text-slate-700 leading-relaxed">
                  <p className="font-bold text-[#0B1F3A]">Note on Saturday consultations:</p>
                  <p className="mt-0.5">Weekend sessions can be scheduled exceptionally upon physical request. Call our hotline on +254 725 871 807 to arrange custom timings.</p>
                </div>
              </div>
            )}

            {/* STEP 3: CLIENT CONTACT INFO */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kennedy Kamau"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-white border border-[#D1D5DB] rounded-none px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 0722 000 000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-white border border-[#D1D5DB] rounded-none px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. name@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-white border border-[#D1D5DB] rounded-none px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0B1F3A] mb-1.5">
                    Brief Statement of the Legal Issue (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide a brief context (e.g., purchasing agricultural land in Kikuyu, starting an LLP, lease dispute)..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-[#D1D5DB] rounded-none p-4 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B1F3A] transition-all resize-none"
                  />
                </div>
              </div>
            )}

          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#D1D5DB] bg-[#F3F4F6] flex items-center justify-between shrink-0">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-800 hover:text-[#0B1F3A] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#C5A880]" />
                Back
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest border border-[#D1D5DB] text-slate-750 hover:text-[#0B1F3A] hover:border-slate-400 bg-white transition-all cursor-pointer"
            >
              Cancel
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  if (isStepValid()) setStep(step + 1);
                }}
                disabled={!isStepValid()}
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  isStepValid()
                    ? 'bg-[#0B1F3A] text-white hover:bg-black'
                    : 'bg-slate-200 text-slate-400 border border-[#D1D5DB] cursor-not-allowed'
                }`}
              >
                Continue
                <ChevronRight className="w-4 h-4 text-[#C5A880]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className={`px-6 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  isStepValid() && !isSubmitting
                    ? 'bg-[#0B1F3A] text-white hover:bg-black'
                    : 'bg-slate-200 text-slate-400 border border-[#D1D5DB] cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Scheduling...' : 'Confirm Appointment'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
