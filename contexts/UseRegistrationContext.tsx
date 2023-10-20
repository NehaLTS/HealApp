import React, { createContext } from 'react'

export type registrationStep = 'details' | 'address' | 'payment' |'services'

export interface RegistrationContextFields {
  currentStep: registrationStep
  setCurrentStep: React.Dispatch<React.SetStateAction<registrationStep>>

}

export const RegistrationContext = createContext<RegistrationContextFields>({} as RegistrationContextFields)

export const useRegistrationContext = (): RegistrationContextFields => {
  const context = React.useContext(RegistrationContext)

  if (!context) throw new Error('useRegistrationContext must be used inside RegistrationContext.Provider')

  return context
}
