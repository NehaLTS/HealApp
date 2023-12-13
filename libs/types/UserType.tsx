export interface UserType {
  existing?: string;
  isSuccessful: boolean;
  token?: string;
  user?: User | User[];
  message?: string;
  googleId?: string;
  email?: string;
  facebookId?: string;
  id?: string;
  msg?: string;
}

export interface User {
  client_id: number;
  email: string;
  appleId: null;
  facebookId: null;
  googleId: string | null;
  created_at: string;
  password: string;
  language?: string;
}

export interface UserTypeProvider {
  id?: string | null;
  isSuccessful?: boolean;
  existing: string;
  token?: string;
  user?: UserProvider;
  msg?: string;
}

export interface HealLanguageType {
  en: string;
  hi: string;
  he: string;
}

type UserProvider = {
  provider_id: string | null;
  email: string;
  googleId: string | null;
  appleId: string | null;
  facebookId: string | null;
  provider_type_id: string | null;
  created_at: string;
  id: number | null;
  firstname: string | null;
  lastname: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  phone_number: string | null;
  profile_picture: string | null;
  license_number: string | null;
  upload_license_picture: string | null;
  status: string | null;
  bank_name: string | null;
  branch: string | null;
  business_registration_number: string | null;
  account: string | null;
};
// Generated by https://quicktype.io

export interface ProviderTypes {
  provider_type_id: number;
  name: string;
}

export interface GoogleLoginResponse {
  additionalUserInfo: AdditionalUserInfo;
  user: UserGoogle;
}

export interface AdditionalUserInfo {
  providerId: string;
  profile: Profile;
  isNewUser: boolean;
}

export interface Profile {
  email_verified: boolean;
  picture: string;
  name: string;
  sub: string;
  iss: string;
  email: string;
  iat: number;
  exp: number;
  azp: string;
  aud: string;
  family_name: string;
  locale: string;
  given_name: string;
}

export interface UserGoogle {
  multiFactor: MultiFactor;
  metadata: Metadata;
  photoURL: string;
  phoneNumber: null;
  tenantId: null;
  displayName: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  uid: string;
  email: string;
  providerData: ProviderDatum[];
  providerId: string;
}

export interface Metadata {
  lastSignInTime: number;
  creationTime: number;
}

export interface MultiFactor {
  enrolledFactors: any[];
}

export interface ProviderDatum {
  email: string;
  providerId: string;
  photoURL: string;
  phoneNumber: null;
  displayName: string;
  uid: string;
}

//Changes after formatting
export interface ClientProfile {
  firstName: string;
  lastName: string;
  profilePicture?: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  date_of_birth?: string;
  idNumber?: number;
  isPaymentAdded?: boolean;
  deviceToken?: string;
  description?: string;
  card_number?: string;
  expire_date?: string;
}

export type onboardStep =
  | 'details'
  | 'address'
  | 'payment'
  | 'services'
  | 'addServices';

export interface ProviderProfile {
  firstName: string;
  lastName: string;
  profilePicture?: string;
  idPicture?: string;
  provider: ProviderType;
  speciality: ProviderSpeciality;
  phoneNumber: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  licensenumber?: string;
  licensepicture?: string;
  bankDetails?: ProviderBankDetails;
  services?:ProviderServices[]
}

export interface ProviderType {
  name: HealLanguageType;
  id: string;
  specialties?: ProviderSpeciality[];
}

export interface OrderDetail {
  client_id: string;
  patient_type: { type: string; age: string };
  patient_name: string;
  address: string;
  city: string;
  phonenumber: string;
  Date_of_birth: string;
  services: any[];
  symptoms: string;
  Additional_notes: string;
  Estimate_arrival: string;
  Instructions_for_arrival: string;
  Payment_mode: string;
  TotalCost: string;
  menu_id: string;
  reason: any[];
  provider_type_id: number;
  isOrderForOther: boolean;
}

export interface RemaingTime {
  minutes: number;
  seconds: number;
}
export interface ProviderSpeciality {
  name: HealLanguageType;
  id: string;
}

export interface ProviderBankDetails {
  registrationNumber: string;
  bankname: string;
  branchname: string;
  accountnumber: string;
}

export interface ProviderServices {
  id: number;
  name: HealLanguageType;
  price: string | number;
  description?: HealLanguageType;
  currency?: string;
  isSelected?: boolean;
  heal_id: string;
}

export type Location = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  title?: string;
  timestamp?: any;
};

export interface SearcProviderLocation {
  distance: number;
  latitude: string;
  location_id: string;
  longitude: string;
  name: string;
  price: number;
  provider_id: number;
  provider_type_id: number;
  ratings: number;
  specialty_id: number;
}

export interface BookOrderRequest {
  orderStatus: string;
  provider_id: string;
  order_id: string;
  distance: string;
  time: string;
}

export interface OrderPayment {
  order_id: string;
  client_id: string;
  total_price: string;
  currency: string;
}

export interface ProviderRating {
  provider_id: string;
  client_id: string;
  ratings: string;
}

export interface currentLocationOfUser {
  latitude: string;
  longitude: string;
  address?: string;
}

export interface paymentApproved {
  order_id: string;
  currency: string;
  total_price: string;
  services: string;
  treatment_completed: string;
}
