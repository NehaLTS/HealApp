import { UseUserContext } from 'contexts/useUserContext';
import React, { useState } from 'react';

const UserDetailViewController = () => {
  const { userData, setUserData } = UseUserContext()
  const firstNameRef = React.useRef<any>("");
  const lastNameRef = React.useRef<any>("");
  const phoneNumberRef = React.useRef<any>("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const validateFirstName = () => {
    if (!firstNameRef.current.value) {
      setFirstNameError("First name is required");
    } else if (!/^[A-Z][a-z]*$/.test(firstNameRef.current.value)) {
      setFirstNameError("First letter should start with an uppercase , followed by lowercase ");
    } else {
      setFirstNameError("");
    }
  };

  const validateLastName = () => {
    if (!lastNameRef.current.value) {
      setLastNameError("Last name is required");
    } else if (!/^[A-Z][a-z]*$/.test(lastNameRef.current.value)) {
      setLastNameError("First letter should start with an uppercase , followed by lowercase ");
    } else {
      setLastNameError("");
    }
  };

  const validatePhoneNumber = () => {

    if (!phoneNumberRef.current.value) {
      setPhoneNumberError("Phone number is required");
    } else {
      setPhoneNumberError("");
    }
  };
  const onBlurFirstName = () => {
    validateFirstName()
    setUserData({ ...userData, firstname: firstNameRef.current.value })
  }
  const onChangeFirstName = (value: string) => {
    firstNameRef.current.value = value
    onBlurFirstName();
  }
  const onBlurLastName = () => {
    validateLastName()
    setUserData({ ...userData, lastname: lastNameRef.current.value })
  }
  const onChangeLastName = (value: string) => {
    lastNameRef.current.value = value
    onBlurLastName()
  }
  const onBlurPhoneNumber = () => {
    validatePhoneNumber()
    setUserData({ ...userData, phone_number: phoneNumberRef.current.value })
  }
  const onChangePhoneNumber = (value: string) => {
    phoneNumberRef.current.value = value
    onBlurPhoneNumber()
  }



  return {
    firstNameError,
    userData,
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
  };
}

export default UserDetailViewController