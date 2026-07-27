/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LegalService, TeamMember, OfficeLocation } from './types';

export const PRACTICE_CATEGORIES = [
  { id: 'all', name: 'All Practice Areas' },
  { id: 'Property', name: 'Conveyancing & Property' },
  { id: 'Corporate', name: 'Commercial & Company' },
  { id: 'Litigation', name: 'Civil & Criminal Litigation' },
  { id: 'Personal', name: 'Family & Succession' }
];

export const LEGAL_SERVICES: LegalService[] = [
  {
    id: 'conveyancing',
    title: 'Conveyancing',
    category: 'Property',
    description: 'Expert guidance on property transactions, titles searches, transfers, charges, and leases in Kenya.',
    longDescription: 'We provide end-to-end legal support for real estate acquisitions, sales, leasing, and financing. Our experts handle land searches at the relevant registries, draft Sale Agreements, execute Transfers, and oversee Registration to secure your property rights under the Land Act of Kenya.',
    iconName: 'Home',
    commonIssues: [
      'Drafting and attesting Sale Agreements',
      'Conducting official land searches',
      'Transfer of property and title deeds',
      'Lease agreements for commercial and residential units',
      'Sub-divisions, amalgamations, and sectional properties'
    ]
  },
  {
    id: 'commercial',
    title: 'Commercial Transactions',
    category: 'Corporate',
    description: 'Structuring solid legal agreements, partnerships, Joint Ventures, and agency contracts.',
    longDescription: 'From startup operations to major business transitions, we draft and review commercial agreements tailored to manage liability, protect intellectual property, and ensure regulatory compliance in accordance with Kenyan mercantile law.',
    iconName: 'Briefcase',
    commonIssues: [
      'Drafting Joint Venture & Partnership Agreements',
      'Reviewing supply and distributor agreements',
      'Franchise and licensing arrangements',
      'SLA (Service Level Agreements) draft and review',
      'Corporate structuring and reorganization'
    ]
  },
  {
    id: 'employment',
    title: 'Employment & Labour Relations',
    category: 'Corporate',
    description: 'Advising on employment contracts, HR compliance, redundancy procedures, and dispute resolution.',
    longDescription: 'We help employers and employees navigate the complex Kenyan Employment Act. Our services cover drafting employment policies, handling redundancy negotiations, and providing representation before the Employment and Labour Relations Court.',
    iconName: 'Users',
    commonIssues: [
      'Drafting standard employment contracts',
      'Advising on redundancy and termination procedures',
      'Unfair dismissal claims defense or filing',
      'Formulating employee handbooks and HR policies',
      'Collective bargaining agreements (CBAs)'
    ]
  },
  {
    id: 'succession',
    title: 'Succession & Probate',
    category: 'Personal',
    description: 'Administration of estates, drafting of Wills, and letters of administration applications.',
    longDescription: 'We offer compassionate and highly competent legal counsel in estate planning and administration. We assist in drafting Wills, establishing Trusts, and navigating the formal court processes for obtaining Grants of Probate or Letters of Administration.',
    iconName: 'Scroll',
    commonIssues: [
      'Drafting of Last Wills and Testaments',
      'Establishing private family Trusts',
      'Petitioning for Letters of Administration intestate',
      'Obtaining Grants of Probate for valid Wills',
      'Distribution of estate assets to heirs'
    ]
  },
  {
    id: 'family',
    title: 'Family Law & Divorce',
    category: 'Personal',
    description: 'Handling matrimonial disputes, child maintenance, custody arrangements, and separations with care.',
    longDescription: 'Our legal practice handles sensitive family issues with absolute confidentiality and professionalism. We offer supportive counsel on judicial separations, divorce proceedings, matrimonial property divisions, and child custody and upkeep.',
    iconName: 'HeartHandshake',
    commonIssues: [
      'Divorce and judicial separation petitions',
      'Child custody and maintenance agreements',
      'Matrimonial property claims and divisions',
      'Adoption and guardianship services',
      'Prenuptial and postnuptial agreements'
    ]
  },
  {
    id: 'criminal',
    title: 'Criminal Defense',
    category: 'Litigation',
    description: 'Aggressive and diligent legal representation in bail, bond hearings, and criminal trial matters.',
    longDescription: 'If you or your loved ones face criminal charges, our team ensures your constitutional rights under Article 49 of the Constitution of Kenya are upheld. We represent clients from police station arraignment, through bond hearings, to actual trial defense.',
    iconName: 'ShieldAlert',
    commonIssues: [
      'Representation during police custody and interrogation',
      'Filing for and securing reasonable bail or bond terms',
      'Defense in white-collar and general crime prosecutions',
      'Appeals against criminal convictions',
      'Watching brief representations for victims of crime'
    ]
  },
  {
    id: 'civil-litigation',
    title: 'Civil Litigation',
    category: 'Litigation',
    description: 'Resolving disputes through formal lawsuits, injunctions, and breach of contract representations.',
    longDescription: 'We represent corporate and individual clients in civil disputes across all Kenyan courts. We handle commercial disputes, tort claims, land ownership disputes, and apply for urgent injunctions to protect your immediate rights.',
    iconName: 'Scale',
    commonIssues: [
      'Breach of contract suits',
      'Land and boundary dispute litigations',
      'Defamation and libel lawsuits',
      'Applying for temporary/permanent injunctions',
      'Challenging administrative decisions (Judicial Review)'
    ]
  },
  {
    id: 'debt-recovery',
    title: 'Debt Recovery',
    category: 'Corporate',
    description: 'Fast-track recovery of outstanding payments, drafting demand letters, and enforcement.',
    longDescription: 'Our structured debt recovery process incorporates both formal demand systems, negotiation, and legal enforcement. We focus on recovering your commercial or private debts cost-effectively, safeguarding your cash flow with swift actions.',
    iconName: 'Coins',
    commonIssues: [
      'Issuance of formal Demand Letters',
      'Structuring out-of-court settlement deeds',
      'Filing debt recovery lawsuits in relevant courts',
      'Attaching assets through licensed court bailiffs',
      'Enforcement of local and foreign decrees'
    ]
  },
  {
    id: 'company-reg',
    title: 'Company Law & Registration',
    category: 'Corporate',
    description: 'Swift registration of limited companies, business names, LLPs, and ongoing compliance.',
    longDescription: 'We streamline company formation on the e-Citizen/BRS portal. We assist in registering Private/Public Limited Companies, Limited Liability Partnerships (LLPs), Sole Proprietorships, and handle annual filing compliance.',
    iconName: 'FileText',
    commonIssues: [
      'Registration of Private Limited Companies',
      'Registration of Business Names / Sole Proprietorships',
      'LLP (Limited Liability Partnership) setups',
      'Filing Annual Returns with the Registrar of Companies',
      'Share transfers, directorship changes, and allotment'
    ]
  },
  {
    id: 'insolvency',
    title: 'Insolvency Law',
    category: 'Corporate',
    description: 'Advising on bankruptcy, corporate winding-up, restructuring, and liquidations.',
    longDescription: 'We guide companies in financial distress and creditors through the complex Insolvency Act of Kenya. Our service includes restructuring proposals, receiverships, and voluntary or court-ordered liquidation proceedings.',
    iconName: 'TrendingDown',
    commonIssues: [
      'Filing for bankruptcy or creditor protection',
      'Corporate voluntary arrangements (CVA)',
      'Receivership and debt restructuring guidance',
      'Winding-up petitions by creditors or shareholders',
      'Asset liquidation distributions'
    ]
  },
  {
    id: 'demand-letters',
    title: 'Issuance of Demand Letters',
    category: 'Litigation',
    description: 'Official lawyer demand notices drafting and dispatch to recover obligations and settle disputes.',
    longDescription: 'A formal letter of demand from a registered advocate is often the most cost-effective way to prompt payment or action without going to court. We draft authoritative letters setting clear legal positions and timelines for action.',
    iconName: 'MailWarning',
    commonIssues: [
      'Demands for unpaid professional or contract invoices',
      'Notices to cease and desist infringing activities',
      'Tenancy default demands and quit notices',
      'Breach of agreement notifications'
    ]
  },
  {
    id: 'affidavits',
    title: 'All Types of Affidavits',
    category: 'Personal',
    description: 'Drafting, attesting, and commissioning of affidavits, oaths, and statutory declarations.',
    longDescription: 'We draft and commission all types of legal affidavits and declarations. As Commissioner for Oaths, we authenticate documents for government agencies, passports, visa processes, land offices, and academic institutions.',
    iconName: 'FileCheck',
    commonIssues: [
      'Affidavits of single-status or marriage confirmations',
      'Loss of document declarations (ID, title deeds, certificates)',
      'Statutory declarations for correction of names',
      'Oaths for court submissions',
      'Attestation of powers of attorney'
    ]
  },
  {
    id: 'small-claims',
    title: 'Small Claims Court Matters',
    category: 'Litigation',
    description: 'Fast-track representation and drafting of claims for commercial disputes below KES 1,000,000.',
    longDescription: 'The Small Claims Court resolves disputes within 60 days. We help clients prepare the necessary statements, file claims, and represent them within this expedited, cost-friendly legal window for disputes below KES 1 Million.',
    iconName: 'Gavel',
    commonIssues: [
      'Filing of Small Claims Forms (Form 1)',
      'Replying to claims served upon you',
      'Representation in rapid hearings (contracts, damage)',
      'Settlement negotiation within court timelines',
      'Enforcement of small claims orders'
    ]
  },
  {
    id: 'pro-bono',
    title: 'Pro Bono Legal Services',
    category: 'Litigation',
    description: 'Selective legal representation and advisory for deserving community members in need of justice.',
    longDescription: 'In line with our dedication to ethical law practice and human rights, we selectively provide pro bono legal aid and advisory services to marginalized individuals, helping ensure equal access to justice in our legal system.',
    iconName: 'Heart',
    commonIssues: [
      'Assisting indigents in fundamental human rights cases',
      'Community legal clinics and awareness campaigns',
      'Legal guidance for non-profit community associations',
      'Representation of vulnerable groups in minor civil issues'
    ]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'dominic',
    name: 'Dominic Omwenga',
    role: 'Founder & CEO',
    subRole: 'Managing Advocate & Commissioner for Oaths',
    qualifications: [
      'Bachelor of Laws (LLB) – Mount Kenya University',
      'Postgraduate Diploma in Law (PGDL) – Kenya School of Law',
      'Diploma in Legal Studies – Technical University of Kenya',
      'Commissioner for Oaths'
    ],
    bio: 'Dominic is a highly meticulous and experienced legal advocate with deep expertise in Kenyan land laws, commercial transactions, and courtroom advocacy. He founded DA Omwenga & Co. Advocates with a vision to build a modern, high-integrity firm that places client success and ethical legal practices above all else. His analytical legal mind has successfully resolved high-stakes land disputes, corporate transactions, and civil litigation.',
    specialties: ['Conveyancing & Land Law', 'Commercial Law', 'Civil Litigation', 'Criminal Defense'],
    imageUrl: '/dominic.jpg'
  },
  {
    id: 'yvonne',
    name: 'Yvonne Mbithe',
    role: 'Associate Advocate',
    subRole: 'Advocate & Commissioner for Oaths',
    qualifications: [
      'Bachelor of Laws (LLB) – Kenyatta University',
      'Postgraduate Diploma in Law (PGDL) – Kenya School of Law',
      'Commissioner for Oaths'
    ],
    bio: 'Yvonne is an exceptionally organized and detail-oriented advocate with a passion for family law, successions, and labor relations. Her empathetic approach to client issues combined with stellar research capabilities and negotiation skills make her a key asset in solving sensitive family matters, estate planning, and workplace disputes out-of-court or before the tribunals.',
    specialties: ['Family Law', 'Succession & Probate', 'Labour Relations', 'Company Registration'],
    imageUrl: '/yvonne.jpg'
  },
  {
    id: 'meshack',
    name: 'Meshack Nyambane',
    role: 'Legal Assistant',
    subRole: 'Legal Paralegal & Operations Executive',
    qualifications: [
      'Diploma in Legal Studies – Mount Kenya University'
    ],
    bio: 'Meshack manages the essential administrative, registry filing, and procedural work at DA Omwenga & Co. Advocates. With extensive knowledge of registry procedures across Lands offices, Sheriffs offices, and court filing portals, Meshack ensures that all documentation is lodged on time and client records are kept in absolute order and security.',
    specialties: ['Registry Filings', 'Document Drafting', 'Client Intake', 'Legal Research Support'],
    imageUrl: '/meshack.jpg'
  }
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'nairobi',
    name: 'Nairobi Office (Headquarters)',
    address: 'Mama Ngina Street, Nairobi CBD',
    building: 'Vedic House',
    room: 'Room 205',
    phone: '+254 725 871 807',
    email: 'omwengaadvocates87@gmail.com',
    coordinates: {
      lat: -1.2844,
      lng: 36.8252
    },
    directions: 'Located in Vedic House on Mama Ngina Street, opposite the Hilton Hotel, Nairobi Central Business District. Take the lift or stairs to the 2nd Floor, Room 205.'
  },
  {
    id: 'kikuyu',
    name: 'Kikuyu Office',
    address: 'Kikuyu Town, Southern Bypass Interchange',
    building: 'Victory Plaza',
    room: '1st Floor, Suite A3',
    phone: '+254 117 536 420',
    email: 'omwengaadvocates87@gmail.com',
    coordinates: {
      lat: -1.2541,
      lng: 36.6806
    },
    directions: 'Conveniently located at Victory Plaza along the Kikuyu Southern Bypass Interchange, ideal for our clients in Kiambu and environs. Suite A3 is on the First Floor.'
  }
];

export const PHONE_NUMBERS = [
  { display: '0725 871 807', value: '+254725871807' },
  { display: '0117 536 420', value: '+254117536420' },
  { display: '0715 570 050', value: '+254715570050' },
  { display: '0790 290 507', value: '+254790290507' }
];

export const MAIN_EMAIL = 'omwengaadvocates87@gmail.com';
export const WHATSAPP_NUMBER = '+254725871807';
