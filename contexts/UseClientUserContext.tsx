import { ClientProfile, onboardStep } from 'libs/types/UserType'
import React, { createContext } from 'react'

export interface OrderDetail{
  client_id: string,
  patient_type: string,
  patient_name: string,
  address: string,
  city: string,
  phonenumber: string,
  Date_of_birth: string,
  services: any[],
  symptoms: string,
  Additional_notes: string,
  Estimate_arrival: string,
  Instructions_for_arrival: string,
  Payment_mode: string,
  TotalCost: string,
  menu_id: string,
  reason: any[],
  description:string,
}


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
  orderDetails:OrderDetail
  setOrderDetails: React.Dispatch<React.SetStateAction<OrderDetail>>
}

export const ClientUserContext = createContext<ClientUserContextFields>({} as ClientUserContextFields)

export const UseClientUserContext = (): ClientUserContextFields => {
  const context = React.useContext(ClientUserContext)

  if (!context) throw new Error('UseClientUserContext must be used inside ClientUserContext.Provider')

  return context
}
