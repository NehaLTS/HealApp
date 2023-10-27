import { ClientProfile, onboardStep } from 'libs/types/UserType'
import React, { createContext } from 'react'



export interface ClientUserContextFields {
  currentStep: onboardStep
  setCurrentStep: React.Dispatch<React.SetStateAction<onboardStep>>
  userId: string
  setUserId: React.Dispatch<React.SetStateAction<string>>
  // setUserId: () => {}
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  userProfile:ClientProfile
  setUserProfile: React.Dispatch<React.SetStateAction<ClientProfile>>
}

export const ClientUserContext = createContext<ClientUserContextFields>({} as ClientUserContextFields)

export const UseClientUserContext = (): ClientUserContextFields => {
  const context = React.useContext(ClientUserContext)

  if (!context) throw new Error('UseClientUserContext must be used inside ClientUserContext.Provider')

  return context
}
