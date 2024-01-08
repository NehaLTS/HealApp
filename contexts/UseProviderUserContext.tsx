import { Order, ProviderOrder } from 'libs/types/OrderTypes';
import {
  ProviderProfile,
  ProviderServices,
  userLocation,
  onboardStep,
} from 'libs/types/UserType';
import React, { createContext } from 'react';

export interface ProviderUserContextFields {
  currentStep: onboardStep;
  setCurrentStep: React.Dispatch<React.SetStateAction<onboardStep>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  providerProfile: ProviderProfile;
  setProviderProfile: React.Dispatch<React.SetStateAction<ProviderProfile>>;
  providerServices: ProviderServices;
  setProviderServices: React.Dispatch<React.SetStateAction<ProviderServices>>;
  setUserLocation: React.Dispatch<React.SetStateAction<userLocation>>;
  userLocation: userLocation;
  providerOrder: ProviderOrder;
  setProviderOrder: React.Dispatch<React.SetStateAction<ProviderOrder>>;
}

export const ProviderUserContext = createContext<ProviderUserContextFields>(
  {} as ProviderUserContextFields,
);

export const UseProviderUserContext = (): ProviderUserContextFields => {
  const context = React.useContext(ProviderUserContext);

  if (!context)
    throw new Error(
      'UseClientUserContext must be used inside ClientUserContext.Provider',
    );

  return context;
};
