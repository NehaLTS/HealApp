
import { UseUserContextProvider } from 'contexts/useUserContextProvider';
import React, { useState } from 'react'

const ProviderLicenseDetailController = () => {
    const [phoneError, setPhoneError] = useState("");
    const [addressError, setAddressError] = useState("");
    const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
    const phoneRef = React.useRef<any>("");
    const licenseRef = React.useRef<any>("");
    const addressRef = React.useRef<any>("");

    const onBlurPhoneNumber = () => { validatePhoneNumber(); setUserDataProvider({ ...userDataProvider, phone_number: phoneRef.current.value }) }
    const onChangePhoneNumber = (value: string) => phoneRef.current.value = value
  
    const onBlurLastName = () => setUserDataProvider({ ...userDataProvider, license: licenseRef.current.value })
    const onChangeLastName = (value: string) => licenseRef.current.value = value
  
    const onBlurAddress = () => { validateAddress(); setUserDataProvider({ ...userDataProvider, address: addressRef.current.value }) }
    const onChangeAddress = (value: string) => addressRef.current.value = value

  
    const validatePhoneNumber = () => {
      if (!phoneRef.current.value) {
        setPhoneError("Phone number is required");
      } else {
        setPhoneError("");
      }
    };
  
    const validateAddress = () => {
      if (!addressRef.current.value) {
        setAddressError("Address is required");
      } else {
        setAddressError("");
      }
    };
  
    
  return {
    userDataProvider,
    addressRef,
    licenseRef,
    phoneRef,
    onBlurPhoneNumber,
    onChangePhoneNumber,
    onBlurLastName,
    onChangeLastName,
    onBlurAddress,
    onChangeAddress,
    phoneError,
    addressError
  }
   
  
}

export default ProviderLicenseDetailController

