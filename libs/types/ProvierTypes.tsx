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
  " id"?: number;
}

export interface Service {
  name: Name;
  description: Name;
  price: string
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

export interface Name {
  en: string;
  hi?: string;
}

export interface TreatmentMenu {
  menu_id: number;
  name: Name;
  price: string;
  provider_type_id: number;
}

export interface order_provider {
  isSuccessful: boolean,
  msg: string

}


export interface search_provider {
  image_url?: string,
  provider_type_id?: number,
  name?: string,
  message?: string
}

export interface Provider {
  name: string;
  provider_id: number;
  provider_type_id: number;
  specialty_id: number;
  distance: string;
}
