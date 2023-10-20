import { useRegistrationContext } from 'contexts/UseRegistrationContext';
import { UseUserContext } from 'contexts/useUserContext';
import useUpdateEffect from 'libs/UseUpdateEffect';
import { AuthServicesClient } from 'libs/authsevices/AuthServicesClient';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import React, { useState } from 'react';
import { Alert } from 'react-native';

const UserAddressViewController = () => {
  const { onUpdateUserProfile } = AuthServicesClient()
  const [isShowModal, setIsShowModal] = useState(false);
  const { userData, setUserData } = UseUserContext()
  const addressRef = React.useRef<any>("");
  const birthDateRef = React.useRef<any>("");
  const idNumberRef = React.useRef<any>("");
  const [addressError, setAddressError] = useState("");
  const [idNumberError, setIdNumberError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [isNext, setIsNexts] = useState(false);
  const [isLoader, setIsLoader] = useState<boolean>(false)
  const {setCurrentStep} =useRegistrationContext()

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
    }
    else if (addressRef.current.value.length < 4) {
      setAddressError('Please fill full address')
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

  const onPressNext = async () => {
    if ((userData.address && userData.address.length >= 4) && userData.id_number) {
      setIsLoader(true)
      const res = await onUpdateUserProfile?.({
        firstname: userData?.firstname ?? '',
        lastname: userData?.lastname ?? '',
        address: userData?.address ?? "",
        city: userData?.city ?? '',
        state: userData.state ?? '',
        country: userData?.country ?? '',
        profile_picture: userData.profile_picture ?? "",
        date_of_birth: userData?.date_of_birth ?? "",
        phone_number: userData?.phone_number ?? "",
        client_id: userData?.client_id ?? "",
  
      });
      setUserData({ ...userData, isSuccessful: res?.isSuccessful })
      setLocalData('USER', res)
      setIsLoader(false)
      if (res?.isSuccessful) {
        setCurrentStep('payment')
        // setCurrentStep(() => {
        //   const array = [...currentStep];
        //   array.push(array[array.length - 1] + 1);
        //   return array;
        // });
      }
      else {
        Alert.alert('some error occurred');
      }
    } else {
      if (!userData.address?.length) setAddressError("Address is required")
      if ((userData.address?.length ?? 0) < 4) setAddressError('Please fill full adresss')
      if (!userData.id_number?.length) setIdNumberError("ID number is required")
      if (!userData.date_of_birth?.length) setDateOfBirthError("Birth date is required")
    }
    }

  const onPressBack = () => {
      // setCurrentStep((prev) => prev.slice(0, prev.length - 1));
  };


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
    setUserData,
    onPressNext,
    onPressBack
  }
}

export default UserAddressViewController