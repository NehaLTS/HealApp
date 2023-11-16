import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { numericPattern } from 'libs/utility/Utils';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const UserDetailViewController = () => {
  const { setCurrentStep, setUserProfile, userProfile } =
    UseClientUserContext();
  const firstNameRef = React.useRef<any>('');
  const lastNameRef = React.useRef<any>('');
  const phoneNumberRef = React.useRef<any>('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const { t } = useTranslation();
  useEffect(() => {
    if (userProfile && userProfile?.firstName) {
      firstNameRef.current.value = userProfile?.firstName;
      lastNameRef.current.value = userProfile?.lastName;
      phoneNumberRef.current.value = userProfile?.phoneNumber;
    }
  }, []);
  const validateFirstName = () => {
    if (
      !firstNameRef.current.value ||
      firstNameRef.current.value === undefined
    ) {
      setFirstNameError(t('first_name_required'));
    } else setFirstNameError('');
  };

  const validateLastName = () => {
    if (!lastNameRef.current.value) {
      setLastNameError(t('last_name_required'));
    } else setLastNameError('');
  };
  const isValidPhoneNumber = (p: string) => numericPattern.test(p);

  const validatePhoneNumber = () => {
    if (!phoneNumberRef.current.value) {
      setPhoneNumberError(t('phone_number_required'));
    } else if (!isValidPhoneNumber(phoneNumberRef.current.value)) {
      setPhoneNumberError(t('number_not_valid'));
    } else setPhoneNumberError('');
  };
  const onBlurFirstName = () => validateFirstName();
  const onChangeFirstName = (value: string) => {
    firstNameRef.current.value = value;
    onBlurFirstName();
  };
  const onBlurLastName = () => validateLastName();

  const onChangeLastName = (value: string) => {
    lastNameRef.current.value = value;
    onBlurLastName();
  };
  const onBlurPhoneNumber = () => validatePhoneNumber();

  const onChangePhoneNumber = (value: string) => {
    phoneNumberRef.current.value = value;
    validatePhoneNumber();
  };

  const onPressNext = () => {
    if (
      firstNameRef.current.value &&
      lastNameRef.current.value &&
      phoneNumberRef.current.value
    ) {
      setUserProfile({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
        profilePicture:
          userProfile && userProfile?.profilePicture
            ? userProfile?.profilePicture
            : '',
      });

      setCurrentStep('address');
    } else {
      if (!firstNameRef.current.value)
        setFirstNameError(t('first_name_required'));
      if (!lastNameRef.current.value) setLastNameError(t('last_name_required'));
      if (!phoneNumberRef.current.value)
        setPhoneNumberError(t('phone_number_required'));
    }
  };

  const onPressBack = () => {
    // setCurrentStep((prev) => prev.slice(0, prev.length - 1));
  };

  return {
    firstNameError,
    firstNameRef,
    lastNameRef,
    phoneNumberRef,
    lastNameError,
    phoneNumberError,
    onBlurFirstName,
    onChangeFirstName,
    onBlurLastName,
    onChangeLastName,
    onBlurPhoneNumber,
    onChangePhoneNumber,
    validateFirstName,
    onPressNext,
    onPressBack,
    userProfile,
  };
};

export default UserDetailViewController;
