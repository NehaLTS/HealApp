import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { ProviderProfile } from 'libs/types/UserType';
import React, { useState } from 'react';

const ProviderAddressController = () => {
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [onSearchAddress, setOnSearchAddress] = useState('');
  const [licensePicture, setLicensePicture] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowAddressodal, setIsShowAddressodal] = useState(false);
  const phoneRef = React.useRef<any>('');
  const licenseRef = React.useRef<any>('');
  const addressRef = React.useRef<any>('');
  const { setCurrentStep, setProviderProfile, providerProfile } =
    UseProviderUserContext();

  const onBlurPhoneNumber = () => validatePhoneNumber();

  const onChangePhoneNumber = (value: string) =>
    (phoneRef.current.value = value);

  const onChangeLicenseNumber = (value: string) =>
    (licenseRef.current.value = value);

  const onBlurAddress = () => validateAddress();

  const onChangeAddress = (value: string) => {
    (addressRef.current.value = value), setOnSearchAddress(value);
  };

  const getImageUrl = (url: string) => {};

  const onPressNext = () => {
    if (phoneRef.current.value && onSearchAddress) {
      setProviderProfile({
        ...(providerProfile as ProviderProfile),
        address: onSearchAddress,
        phoneNumber: phoneRef.current.value,
        licensenumber: licenseRef.current.value,
        licensepicture: licensePicture,
      });
      setCurrentStep('payment');
    } else {
      if (!phoneRef.current.value) setPhoneError('Phone Number is required');
      if (!onSearchAddress) setAddressError('Address is required');
    }
  };

  const onPressBack = () => {
    // setCurrentStep((prev) => prev.slice(0, prev.length - 1));
  };

  const validatePhoneNumber = () => {
    if (!phoneRef.current.value) {
      setPhoneError('Phone number is required');
    } else {
      setPhoneError('');
    }
  };

  const validateAddress = () => {
    if (onSearchAddress?.length === 0) {
      setAddressError('Address is required');
    } else if (onSearchAddress?.length < 4) {
      setAddressError('Please fill full address');
    } else {
      setAddressError('');
    }
  };

  return {
    addressRef,
    providerProfile,
    licenseRef,
    phoneRef,
    onChangePhoneNumber,
    onBlurPhoneNumber,
    onBlurAddress,
    onChangeAddress,
    phoneError,
    addressError,
    licenseError,
    onChangeLicenseNumber,
    licensePicture,
    isShowModal,
    getImageUrl,
    setIsShowModal,
    onSearchAddress,
    setOnSearchAddress,
    isShowAddressodal,
    setIsShowAddressodal,
    onPressNext,
    onPressBack,
  };
};

export default ProviderAddressController;
