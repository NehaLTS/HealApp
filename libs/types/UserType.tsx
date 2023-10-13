export interface UserType {
    existing?: string;
    isSuccessful: boolean;
    token?: string;
    user?: User | User[];
    message?: string;
    googleId?: string;
    email?: string;
    facebookId?: string;
    client_id?: string;
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
    language?: string
}


export interface UserTypeProvider {
    id?: string | null;
    isSuccessful?: boolean;
    existing: string;
    token?: string;
    user?: UserProvider;
    msg?: string
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
    account: string | null
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

