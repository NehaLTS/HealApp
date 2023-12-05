export interface Providers {
  id: number;
  name: Name;
  specialties: Specialty[];
}
export interface Name {
  en: string;
  hi: string;
  he: string;
}
export interface Specialty {
  id?: number;
  name: Name;
}

export interface Service {
  name: Name;
  description: Name;
  price: string;
}
export interface providerList {
  id: number;
  name: string;
  image: string;
}
export interface Banner {
  id: number;
  name: string;
  imageurl: string;
  clicks: number;
  views: number;
  destinationUrl: string;
}

export interface treatment {
  treatmentMenu: TreatmentMenu[];
  reason: Reason[];
}

export interface Reason {
  reason_id: number;
  name: Name;
}

export interface TreatmentMenu {
  menu_id: number;
  name: Name;
  price: string;
  provider_type_id: number;
}

export interface order_provider {
  isSuccessful: boolean;
  msg: string;
}

export interface seach_type {
  provider_id: number;
  provider_name: Name;
}
export interface search_provider {
  provider_name?: Name;
  provider_type_id?: any;
  speciality_name: any;
  image_url?: string;
  type: Array<seach_type>;
}

export interface Provider {
  name: string;
  provider_id: number;
  provider_type_id: number;
  specialty_id: number;
  distance: string;
}

export interface OrderRequest {
  status: string;
  provider_id: string;
  latitude: string;
  longitude: string;
  order_id: string;
}

export interface PoviderLocation {
  provider_id: string;
  latitude: string;
  order_id: string;
  longitude: string;
}
