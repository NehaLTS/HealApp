export interface Providers {
  id: number;
  name: Name;
  specialties: Specialty[];
}
export interface Name {
  en: string;
  ru: string;
  he: string;
  ar: string;
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
  specialty_id: number;
  specialty_name: Name;
  services: TreatmentMenu[];
}

export interface TreatmentMenu {
  heal_id: number;
  services_name: Name;
  price: string;
  currency: number;
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
  orderStatus: string;
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

export interface TreatementEnded {
  order_id: string;
  TotalCost: string;
  service_charge: string;
  total_order_price: string;
  currency: string;
  treatment_completed: string;
}

export interface ProviderHomeDetails {
  isSuccessful: boolean;
  providerDetails: ProviderHomeOrderDetail;
}

export interface ProviderHomeOrderDetail {
  orderDetails: ProviderOrderDetail;
  walletDetails: WalletDetail;
}

export interface ProviderOrderDetail {
  provider_id: number;
  total_clients: number;
  avg_arrival_time: number;
}

export interface WalletDetail {
  wallet_amount: number;
}

export interface ServiceProfile {
  menu_id: number;
  name: Name;
  service_price: string;
}
export interface Symptom {
  name: Name;
  id: number;
}
export interface OrderDetails {
  TotalCost: number;
  address: string;
  currency: string;
  modifiedServices: ServiceProfile[];
  ratings: string;
  symptoms: string;
}

export interface UpdateProfile {
  provider_id: string;
  profile_picture: string;
}
