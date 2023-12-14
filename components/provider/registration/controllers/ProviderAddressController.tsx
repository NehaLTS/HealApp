import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { ProviderProfile, currentLocationOfUser } from 'libs/types/UserType';
import { numericPattern } from 'libs/utility/Utils';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import Geocoder from 'react-native-geocoding';

const ProviderAddressController = () => {
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [licenseError, setLicenseError] = useState('');

  const [licensePicture, setLicensePicture] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowAddressodal, setIsShowAddressodal] = useState(false);
  const phoneRef = React.useRef<any>('');
  const licenseRef = React.useRef<any>('');
  const addressRef = React.useRef<any>('');
  const {
    setCurrentStep,
    setProviderProfile,
    providerProfile,
    currentLocationOfUser,
  } = UseProviderUserContext();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [onSearchAddress, setOnSearchAddress] = useState(
    currentLocationOfUser?.address ?? '',
  );
  const [geomatricAddress, setGeomatricAddress] = useState(
    currentLocationOfUser ?? '',
  );
  useEffect(() => {
    if (providerProfile?.firstName) {
      phoneRef.current.value = providerProfile?.phoneNumber;
      licenseRef.current.value = providerProfile?.licensenumber;
      addressRef.current.value = providerProfile?.address;
    }
  }, []);

  const onBlurPhoneNumber = () => { };

  const onChangePhoneNumber = (value: string) => {
    phoneRef.current.value = value;
    validatePhoneNumber(value);
  };

  const onChangeLicenseNumber = (value: string) => {
    licenseRef.current.value = value;
    validateLicense(value);
  };
  const onBlurAddress = () => { };

  const onChangeAddress = (value: string, latitude: string, longitude: string) => {
    addressRef.current.value = value;
    setOnSearchAddress(value ?? '');
    validateAddress(value ?? '');
    setGeomatricAddress({ latitude, longitude })
    console.log('valueChnage latitude', value, latitude, longitude)
  };

  const getImageUrl = (url: string) => {
    setLicensePicture(url);
  };

  const onPressNext = () => {
    if (phoneRef.current.value && onSearchAddress) {
      if (licenseRef.current.value && !licensePicture) {
        Alert.alert(t('select_license_picture'));
      } else if (
        !licenseRef.current.value ||
        (licenseRef.current.value === undefined && licensePicture)
      ) {
        setLicenseError(t('License number required'));
      } else {
        setProviderProfile({
          ...(providerProfile as ProviderProfile),
          address: { address: onSearchAddress, latitude: geomatricAddress.latitude, longitude: geomatricAddress.longitude },
          phoneNumber: phoneRef.current.value,
          licensenumber: licenseRef.current.value,
          licensepicture: licensePicture,
        });
        setCurrentStep('payment');
      }
    } else {
      if (!phoneRef.current.value) setPhoneError(t('phone_number_required'));
      if (!onSearchAddress) setAddressError(t('address_required'));
    }
  };

  const onPressBack = () => setCurrentStep('details');
  const isValidPhoneNumber = (p: string) => numericPattern.test(p);

  const validatePhoneNumber = (value: string) => {
    if (!value?.length) {
      setPhoneError(t('phone_number_required'));
    } else if (!isValidPhoneNumber(value)) {
      setPhoneError(t('number_not_valid'));
    } else setPhoneError('');
  };

  const validateAddress = (value: string) => {
    if (value?.length < 4) setAddressError(t('fill_address'));
    else setAddressError('');
  };

  const validateLicense = (value: string) => {
    if (value?.length < 4) setLicenseError(t('License number required'));
    else setLicenseError('');
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
  };
};

export default ProviderAddressController;
