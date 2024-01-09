import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { ProviderProfile, userLocation } from 'libs/types/UserType';
import { numericPattern } from 'libs/utility/Utils';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import Geocoder from 'react-native-geocoding';

const ProviderAddressController = () => {
  const {
    setCurrentStep,
    setProviderProfile,
    providerProfile,
    userLocation,
    setUserLocation,
  } = UseProviderUserContext();
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [licensePicture, setLicensePicture] = useState(
    providerProfile?.licensepicture ?? '',
  );
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowAddressodal, setIsShowAddressodal] = useState(false);
  const phoneRef = React.useRef<any>('');
  const licenseRef = React.useRef<any>('');
  const addressRef = React.useRef<any>('');

  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [onSearchAddress, setOnSearchAddress] = useState(
    providerProfile?.address ?? '',
  );
  const [geomatricAddress, setGeomatricAddress] = useState(userLocation ?? '');
  console.log('providerProfile', providerProfile);
  useEffect(() => {
    if (providerProfile?.phoneNumber) {
      phoneRef.current.value = providerProfile?.phoneNumber;
      licenseRef.current.value = providerProfile?.licensenumber;
      addressRef.current.value = providerProfile?.address;
    }
  }, []);
  console.log('address screen', providerProfile);
  const onBlurPhoneNumber = () => {};

  const onChangePhoneNumber = (value: string) => {
    phoneRef.current.value = value;
    validatePhoneNumber();
  };

  const onChangeLicenseNumber = (value: string) => {
    licenseRef.current.value = value;
  };
  const onBlurAddress = () => {};

  const onChangeAddress = (
    value: string,
    latitude: string,
    longitude: string,
  ) => {
    addressRef.current.value = value;
    setOnSearchAddress(value ?? '');
    validateAddress(value ?? '');
    setGeomatricAddress({
      onboardingLocation: { latitude: latitude, longitude: longitude },
    });
    console.log('valueChnage latitude', value, latitude, longitude);
  };

  const getImageUrl = (url: string) => {
    console.log('url111', url);
    setLicensePicture(url);
  };

  const onPressNext = () => {
    if (
      !phoneError &&
      !addressError &&
      phoneRef?.current?.value?.length > 0 &&
      onSearchAddress?.length > 0
    ) {
      if (licenseRef.current.value && !licensePicture) {
        Alert.alert(t('select_license_picture'));
      } else {
        setProviderProfile({
          ...providerProfile,
          address: onSearchAddress,
          phoneNumber:
            phoneRef?.current?.value?.length > 0
              ? phoneRef?.current?.value
              : providerProfile?.phoneNumber,
          licensenumber:
            licenseRef?.current?.value?.length > 0
              ? licenseRef?.current?.value
              : providerProfile?.licensenumber,
          licensepicture: licensePicture,
        });
        setCurrentStep('payment');

        setUserLocation((prevState) => ({
          ...prevState,
          onboardingLocation: {
            address: onSearchAddress,
            latitude: geomatricAddress.onboardingLocation?.latitude,
            longitude: geomatricAddress.onboardingLocation?.longitude,
          },
          currentLocation: prevState?.currentLocation,
        }));
        setLocalData('LOCATION', {
          onboardingLocation: {
            address: onSearchAddress,
            latitude: geomatricAddress.onboardingLocation?.latitude,
            longitude: geomatricAddress.onboardingLocation?.longitude,
          },
        });
      }
    } else {
      if (!phoneRef?.current?.value || !providerProfile?.phoneNumber)
        setPhoneError(t('phone_number_required'));
      if (!onSearchAddress?.length) setAddressError(t('address_required'));
    }
  };

  const onPressBack = () => setCurrentStep('details');
  const isValidPhoneNumber = (p: string) => numericPattern.test(p);

  const validatePhoneNumber = () => {
    if (!phoneRef.current.value) {
      setPhoneError(t('phone_number_required'));
    } else if (!isValidPhoneNumber(phoneRef.current.value)) {
      setPhoneError(t('number_not_valid'));
    } else setPhoneError('');
  };

  const validateAddress = (value: string) => {
    if (value?.length < 4) setAddressError(t('fill_address'));
    else setAddressError('');
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
    isVisible,
    setIsVisible,
    isLoading,
    setIsLoading,
  };
};

export default ProviderAddressController;
