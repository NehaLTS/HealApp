import { UseUserContext } from 'contexts/useUserContext';
import useUpdateEffect from 'libs/UseUpdateEffect';
import React, { useState } from 'react';

const UserAddressViewController = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const { userData, setUserData } = UseUserContext()
  const addressRef = React.useRef<any>("");
  const birthDateRef = React.useRef<any>("");
  const idNumberRef = React.useRef<any>("");
  const [addressError, setAddressError] = useState("");
  const [idNumberError, setIdNumberError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [isNext, setIsNexts] = useState(false);

  useUpdateEffect(() => {
    if (isNext) {
      validateAddress()
      validateIdNumber()
    }

  }, [isNext])

  userData.onbuttonClick = () => {
    setIsNexts(true)
    validateAddress()
  }
  const validateAddress = () => {
    const regex = /^[A-Za-z0-9\s.,/-]+$/;
    setAddressError("Invalid address format");
    if (!regex.test(addressRef.current.value)) {
      setAddressError("Invalid address format");
    } else {
      setAddressError("");
    }
  };

  // Function to validate the ID number
  const validateIdNumber = () => {
    const regex = /^[0-9]+$/;

    if (!regex.test(idNumberRef.current.value)) {
      setIdNumberError("ID number must contain only numbers");
    } else {
      setIdNumberError("");
    }
  };

  const validateDateOfBirth = () => {
    // Define a regex pattern for the "DD/MM/YYYY" date format
    const regex = /^(\d{2})\-(\d{2})\-(\d{4})$/;

    if (!regex.test(birthDateRef.current.value)) {
      setDateOfBirthError("Date of birth must be in DD-MM-YYYY format");
    } else {
      setDateOfBirthError("");
    }
  };
  const onBlurAddress = () => {
    validateAddress()
    setUserData({ ...userData, address: addressRef.current.value })
  }
  const onBlurBirthDate = () => {
    validateDateOfBirth()
    setUserData({ ...userData, date_of_birth: birthDateRef.current.value })
  }
  const onBlurIdNumber = () => {
    validateIdNumber()
    setUserData({ ...userData, id_number: idNumberRef.current.value })
  }

  const onChangeAddress = (value: string) => {
    addressRef.current.value = value
    onBlurAddress()
  }
  const onChangeBirthDate = (value: string) => {
    birthDateRef.current.value = value
    onBlurBirthDate()
  }
  const onChangeIdNumber = (value: string) => {
    idNumberRef.current.value = value
    onBlurIdNumber()
  }

  const getImageUrl = (url: string) => setUserData({ ...userData, profile_picture: url });


  return {
    userData,
    isShowModal,
    setIsShowModal,
    addressRef,
    birthDateRef,
    idNumberRef,
    onBlurAddress,
    onBlurBirthDate,
    onBlurIdNumber,
    onChangeAddress,
    onChangeBirthDate,
    onChangeIdNumber,
    getImageUrl,
    addressError,
    dateOfBirthError,
    idNumberError,
    setUserData
  }
}

export default UserAddressViewController