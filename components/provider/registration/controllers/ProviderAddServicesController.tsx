import React, { useState } from 'react'
import { UseUserContextProvider } from 'contexts/useUserContextProvider';

const ProviderAddServicesController = () => {
  const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
  const serviceNameRef = React.useRef<any>("");
  const priceRef = React.useRef<any>("");
  const descriptionRef = React.useRef<any>("");
  const [serviceError, setServiceError] = useState('')
  const [priceError, setPriceError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')


  const onBlurServiceName = () => setUserDataProvider({ ...userDataProvider, services: serviceNameRef.current.value })
  const onChangeServiceName = (value: string) => {
    serviceNameRef.current.value = value,
      validateServiceName();
  }
  const onBlurPriceName = () => setUserDataProvider({ ...userDataProvider, price: priceRef.current.value })
  const onChangePriceName = (value: string) => {
    priceRef.current.value = value,
      validatePrice();
  }
  const onBlurDescription = () => setUserDataProvider({ ...userDataProvider, description: descriptionRef.current.value })
  const onChangeDescription = (value: string) => {
    descriptionRef.current.value = value,
      validateDescription();
  }

  const validateServiceName = () => {
    if (!serviceNameRef.current.value) {
      setServiceError("Service name is required");
    } else {
      setServiceError("");
    }
  };
  const validatePrice = () => {
    if (!priceRef.current.value) {
      setPriceError("Price is required");
    } else {
      setPriceError("");
    }
  };
  const validateDescription = () => {
    if (!descriptionRef.current.value) {
      setDescriptionError("Description is required");
    } else {
      setDescriptionError("");
    }
  };
  return {
    userDataProvider,
    serviceNameRef,
    priceRef,
    descriptionRef,
    onBlurServiceName,
    onChangeServiceName,
    onBlurPriceName,
    onChangePriceName,
    onBlurDescription,
    onChangeDescription,
    serviceError,
    priceError,
    descriptionError,


  };
}

export default ProviderAddServicesController
