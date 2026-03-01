export type SupplierType = 'interpreter' | 'stand_builder' | 'accommodation' | 'transfer' | 'logistics' | 'other';

export interface Supplier {
  id: string;
  type: SupplierType;
  name: string;
  city: string;
  shortDescription: string;
  description: string;
  languages?: string;
  services?: string;
  exhibitions?: string;
  contactEmail: string;
  contactPhone?: string;
  whatsapp?: string;
  telegram?: string;
  website?: string;
  imageUrl?: string;
  approved: boolean;
  createdAt: string;
}

export interface Inquiry {
  id: number;
  supplierId: number;
  exhibitorName: string;
  companyName: string;
  email: string;
  phone?: string;
  exhibitionName: string;
  city: string;
  dates: string;
  message: string;
  createdAt: string;
}

export const CATEGORIES = [
  { id: 'interpreter', label: 'Interpreters', icon: 'Languages' },
  { id: 'stand_builder', label: 'Stand Builders', icon: 'Hammer' },
  { id: 'accommodation', label: 'Flats, Hotels', icon: 'Home' },
  { id: 'transfer', label: 'Airport Transfers', icon: 'Car' },
  { id: 'logistics', label: 'Logistics', icon: 'Truck' },
  { id: 'other', label: 'Other Services', icon: 'MoreHorizontal' },
];

export const TRANSLATIONS = {
  en: {
    heroTitle: "All services for your exhibition in Russia",
    heroSubtitle: "Find trusted local partners for your next trade fair in Moscow, St. Petersburg, and beyond.",
    searchPlaceholder: "Service type",
    cityPlaceholder: "City",
    exhibitionPlaceholder: "Exhibition name",
    searchBtn: "Search",
    howItWorks: "How it works",
    forExhibitors: "For Exhibitors",
    forSuppliers: "For Suppliers",
    viewProfile: "View Profile",
    contactProvider: "Contact this provider",
    registerTitle: "List your services for free on ExpoHelpers",
    // ... more to be added
  }
};
