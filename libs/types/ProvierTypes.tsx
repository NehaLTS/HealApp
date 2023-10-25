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
  title: string;
  imageUrl: string;
};