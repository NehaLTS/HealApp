import React, { createContext } from "react";
export interface UserType {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  state: string;
  country: string;
  profile_picture: string;
  date_of_birth: string; //yyyy-mm-dd
  phone_number: string;
  client_id: string;
  credit_card_number: string;
  expire_date: string; //yyyy-mm-dd
  cvv: string;
  id_number: string;
  token: string;
  email: string;
  isSuccessful: boolean;
  onbuttonClick: () => void;
  deviceToken:string;
}
export interface UserContextFields {
  userData: Partial<UserType>;
  setUserData: React.Dispatch<React.SetStateAction<Partial<UserType>>>;
}

export const UserContext = createContext<UserContextFields>(
  {} as UserContextFields
);

export const UseUserContext = () => {
  const context = React.useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used inside UserContext.Provider");
  return context;
};
