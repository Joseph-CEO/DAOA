/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LegalService {
  id: string;
  title: string;
  category: 'Corporate' | 'Property' | 'Litigation' | 'Personal';
  description: string;
  longDescription: string;
  iconName: string;
  commonIssues: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  subRole: string;
  qualifications: string[];
  bio: string;
  specialties: string[];
  imageUrl: string;
}

export interface OfficeLocation {
  id: string;
  name: string;
  address: string;
  building: string;
  room: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  directions: string;
}

export interface ConsultationBooking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  attorneyId: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
