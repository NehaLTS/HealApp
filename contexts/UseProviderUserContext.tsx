import { ProviderProfile, ProviderServices, onboardStep } from 'libs/types/UserType'
import React, { createContext } from 'react'



export interface ProviderUserContextFields {
  currentStep: onboardStep
  setCurrentStep: React.Dispatch<React.SetStateAction<onboardStep>>
  userId: string
  setUserId: React.Dispatch<React.SetStateAction<string>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  providerProfile :ProviderProfile
  setProviderProfile: React.Dispatch<React.SetStateAction<ProviderProfile>>
  providerServices:ProviderServices
  setProviderServices: React.Dispatch<React.SetStateAction<ProviderServices>>
}

export const ProviderUserContext = createContext<ProviderUserContextFields>({} as ProviderUserContextFields)

export const UseProviderUserContext = (): ProviderUserContextFields => {
  const context = React.useContext(ProviderUserContext)

  if (!context) throw new Error('UseClientUserContext must be used inside ClientUserContext.Provider')

  return context
}
