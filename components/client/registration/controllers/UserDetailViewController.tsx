import { UseClientUserContext } from 'contexts/UseClientUserContext';
import React, { useEffect, useState } from 'react';

const UserDetailViewController = () => {
  const { setCurrentStep, setUserProfile, userProfile } =
    UseClientUserContext();
  const firstNameRef = React.useRef<any>('');
  const lastNameRef = React.useRef<any>('');
  const phoneNumberRef = React.useRef<any>('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  useEffect(() => {
    if (userProfile?.firstName) {
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
      setFirstNameError('First name is required');
    } else setFirstNameError('');
  };

  const validateLastName = () => {
    if (!lastNameRef.current.value) {
      setLastNameError('Last name is required');
    } else setLastNameError('');
  };

  const validatePhoneNumber = () => {
    if (!phoneNumberRef.current.value) {
      setPhoneNumberError('Phone number is required');
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
    onBlurPhoneNumber();
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
        setFirstNameError('First name is required');
      if (!lastNameRef.current.value) setLastNameError('Last name is required');
      if (!phoneNumberRef.current.value)
        setPhoneNumberError('Phone number is required');
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
