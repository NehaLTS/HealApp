import useToast from 'components/common/useToast';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import React, { useState } from 'react';

const ProviderAddressController = () => {
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [onSearchAddress, setOnSearchAddress] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [licensePicture, setLicensePicture] = useState('');
  const phoneRef = React.useRef<any>('');
  const licenseRef = React.useRef<any>('');
  const { showToast, renderToast } = useToast();
  const { providerProfile, setProviderProfile, setCurrentStep } =
    UseProviderUserContext();

  const onBlurPhoneNumber = () => {
    validatePhoneNumber();
  };
  const onChangePhoneNumber = (value: string) =>
    (phoneRef.current.value = value);
  const onChangeLicense = (value: string) => (licenseRef.current.value = value);

  const onBlurAddress = () => {
    validateAddress();

    setIsVisible(false);
  };

  const getImageUrl = (url: string) => setLicensePicture(url);

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
    } else {
      setAddressError('');
    }
  };

  const onUploadLicense = () => setIsShowModal(true);
  const onCloseModal = () => {
    setIsVisible(false), setIsShowModal(false);
  };

  const onPressBack = () => {
    setCurrentStep('details');
  };

  const onPressNext = () => {
    if (
      (phoneRef.current.value && onSearchAddress?.length) ||
      (licenseRef.current.value && licensePicture?.length)
    ) {
      setProviderProfile({
        ...providerProfile,
        phoneNumber: phoneRef.current.value,
        licensenumber: licenseRef.current.value,
        address: onSearchAddress,
        licensepicture: licensePicture,
      });
      setCurrentStep('payment');
    } else {
      if (!phoneRef.current.value) setPhoneError('Phone number is required');
      if (!onSearchAddress?.length) setAddressError('Address is required');
      if (!licenseRef.current.value && !licensePicture?.length) {
        showToast('', 'Please upload license', 'warning');
      }
    }
  };

  return {
    phoneError,
    addressError,
    isVisible,
    setIsVisible,
    setOnSearchAddress,
    providerProfile,
    phoneRef,
    licenseRef,
    onBlurPhoneNumber,
    onChangePhoneNumber,
    getImageUrl,
    onChangeLicense,
    onBlurAddress,
    onSearchAddress,
    isShowModal,
    onUploadLicense,
    onCloseModal,
    renderToast,
    onPressBack,
    onPressNext,
    licensePicture,
  };
};

export default ProviderAddressController;
