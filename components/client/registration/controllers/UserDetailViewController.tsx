import { UseUserContext } from 'contexts/useUserContext';
import useUpdateEffect from 'libs/UseUpdateEffect';
import React, { useEffect, useState } from 'react';

const UserDetailViewController = () => {
  const { userData, setUserData } = UseUserContext()
  const firstNameRef = React.useRef<any>("");
  const lastNameRef = React.useRef<any>("");
  const phoneNumberRef = React.useRef<any>("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [isNext, setIsNexts] = useState(false);

  // console.log('isNext', isNext);
  useUpdateEffect(() => {
    console.log('isNext111');
    if (isNext) {
      console.log('isNext2222');
      validatePhoneNumber()
      setFirstNameError("First name is required")
    }

  }, [isNext])
  useEffect(() => {
    console.log('isNext', isNext);
    if (isNext) validateFirstName()
  }, [])

  userData.onbuttonClick = () => {
    setIsNexts(true)
    console.log('gurpreet************');
    validatePhoneNumber()
  }

  const setIsNext = () => {
    console.log('object************');
    setIsNexts(true)
    // validateFirstName()
  }

  const validateFirstName = () => {
    if (!firstNameRef.current.value || firstNameRef.current.value === undefined) {
      setFirstNameError("First name is required");
    }

    // else if (!/^[A-Z][a-z]*$/.test(firstNameRef.current.value)) {
    //   setFirstNameError("First letter should start with an uppercase , followed by lowercase ");
    // } 


    else {
      setFirstNameError("");
    }
  };

  const validateLastName = () => {
    if (!lastNameRef.current.value) {
      setLastNameError("Last name is required");
    }

    // else if (!/^[A-Z][a-z]*$/.test(lastNameRef.current.value)) {
    //   setLastNameError("First letter should start with an uppercase , followed by lowercase ");
    // } 


    else {
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
  const onBlurFirstName = () => setUserData({ ...userData, firstname: firstNameRef.current.value })
  const onChangeFirstName = (value: string) => {
    firstNameRef.current.value = value
    onBlurFirstName();
    validateFirstName()
  }
  const onBlurLastName = () => setUserData({ ...userData, lastname: lastNameRef.current.value })
  const onChangeLastName = (value: string) => {
    lastNameRef.current.value = value
    onBlurLastName()
    validateLastName()
  }
  const onBlurPhoneNumber = () => {
    setUserData({ ...userData, phone_number: phoneNumberRef.current.value })
  }
  const onChangePhoneNumber = (value: string) => {
    phoneNumberRef.current.value = value
    onBlurPhoneNumber()
    validatePhoneNumber()
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
    validateFirstName,
    setIsNext
  };
}

export default UserDetailViewController