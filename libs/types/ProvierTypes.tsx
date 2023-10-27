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
  menu_id: number;
  name: string;
  provider_types_id: number;
  price: string;
}
export interface order_provider {
  isSuccessful: boolean,
  msg: string
}
