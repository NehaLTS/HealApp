import { Reason, treatment } from 'libs/types/ProvierTypes';
import {
  ClientProfile,
  OrderDetail,
  RemaingTime,
  userLocation,
  onboardStep,
} from 'libs/types/UserType';
import React, { createContext } from 'react';

export interface ClientUserContextFields {
  currentStep: onboardStep;
  setCurrentStep: React.Dispatch<React.SetStateAction<onboardStep>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  // setUserId: () => {}
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  userProfile: ClientProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<ClientProfile>>;
  orderDetails: OrderDetail;
  setUserLocation: React.Dispatch<React.SetStateAction<userLocation>>;
  userLocation: userLocation;
  walletAmount: string;
  setWalletAmount: React.Dispatch<React.SetStateAction<string>>;
  setOrderDetails: React.Dispatch<React.SetStateAction<OrderDetail>>;
  setRemainingTime: React.Dispatch<React.SetStateAction<RemaingTime>>;
  remainingTime: RemaingTime;
  treatmentsReason: Reason[];
  setTreatmentsReason: React.Dispatch<React.SetStateAction<Reason[]>>;
}

export const ClientUserContext = createContext<ClientUserContextFields>(
  {} as ClientUserContextFields,
);

export const UseClientUserContext = (): ClientUserContextFields => {
  const context = React.useContext(ClientUserContext);

  if (!context)
    throw new Error(
      'UseClientUserContext must be used inside ClientUserContext.Provider',
    );

  return context;
};
