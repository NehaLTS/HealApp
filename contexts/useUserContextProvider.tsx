import { Service } from "libs/types/ProvierTypes";
import React, { createContext } from "react";
export interface UserTypeProvider {
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    state: string;
    country: string;
    profile_picture: string;
    license_photo: string;
    id_photo: string;
    date_of_birth: string; //yyyy-mm-dd
    phone_number: string;
    provider_id: string;
    credit_card_number: string;
    expire_date: string; //yyyy-mm-dd
    cvv: string;
    id_number: string;
    token: string;
    email: string;
    isSuccessful: boolean;
    type_Provider: string;
    speciality: string;
    speciality_id: string;
    bank_name: string;
    branch: string;
    account: string;
    registration: string;
    provider_type_id: string;
    license: string;
    services:string;
    price:string;
    description:string;
    currentScreen: string
    providerServices: boolean
}
export interface UserContextFields {
    userDataProvider: Partial<UserTypeProvider>;
    setUserDataProvider: React.Dispatch<React.SetStateAction<Partial<UserTypeProvider>>>;
}

export const UserContextProvider = createContext<UserContextFields>(
    {} as UserContextFields
);

export const UseUserContextProvider = () => {
    const context = React.useContext(UserContextProvider);
    if (!context)
        throw new Error("useUserContext must be used inside UserContext.Provider");
    return context;
};
