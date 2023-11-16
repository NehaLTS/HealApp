import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { ProviderProfile } from 'libs/types/UserType';
import { numericPattern } from 'libs/utility/Utils';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

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

  useEffect(() => {
    if (providerProfile.firstName) {
      phoneRef.current.value = providerProfile.phoneNumber;
      licenseRef.current.value = providerProfile.licensenumber;
      addressRef.current.value = providerProfile.address;
    }
  }, []);

  const onBlurPhoneNumber = () => validatePhoneNumber();

  const onChangePhoneNumber = (value: string) => {
    phoneRef.current.value = value;
    validatePhoneNumber();
  };

  const onChangeLicenseNumber = (value: string) =>
    (licenseRef.current.value = value);

  const onBlurAddress = () => validateAddress();

  const onChangeAddress = (value: string) => {
    (addressRef.current.value = value), setOnSearchAddress(value);
  };

  const getImageUrl = (url: string) => {
    setLicensePicture(url);
  };

  const onPressNext = () => {
    if (phoneRef.current.value && onSearchAddress) {
      if (licenseRef.current.value && licensePicture) {
        setProviderProfile({
          ...(providerProfile as ProviderProfile),
          address: onSearchAddress,
          phoneNumber: phoneRef.current.value,
          licensenumber: licenseRef.current.value,
          licensepicture: licensePicture,
        });
        setCurrentStep('payment');
      } else {
        Alert.alert('Please select License picture');
      }
    } else {
      if (!phoneRef.current.value) setPhoneError('Phone Number is required');
      if (!onSearchAddress) setAddressError('Address is required');
    }
  };

  const onPressBack = () => setCurrentStep('details');
  const isValidPhoneNumber = (p: string) => numericPattern.test(p);

  const validatePhoneNumber = () => {
    if (!phoneRef.current.value) {
      setPhoneError('Phone number is required');
    } else if (!isValidPhoneNumber(phoneRef.current.value)) {
      setPhoneError('Phone number is to short');
    } else setPhoneError('');
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
