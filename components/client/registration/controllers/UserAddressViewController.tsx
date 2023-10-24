import { UseClientUserContext } from "contexts/UseClientUserContext";
import { AuthServicesClient } from "libs/authsevices/AuthServicesClient";
import { setLocalData } from "libs/datastorage/useLocalStorage";
import { ClientProfile } from "libs/types/UserType";
import { numericPattern } from "libs/utility/Utils";
import React, { useState } from "react";
import { Alert } from "react-native";

const UserAddressViewController = () => {
  const { onUpdateUserProfile } = AuthServicesClient();
  const [isShowModal, setIsShowModal] = useState(false);
  const addressRef = React.useRef<any>("");
  const birthDateRef = React.useRef<any>("");
  const idNumberRef = React.useRef<any>("");
  const [addressError, setAddressError] = useState("");
  const [idNumberError, setIdNumberError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const { setCurrentStep, setUserProfile, userProfile, userId } =
    UseClientUserContext();

  const validateAddress = () => {
    if (addressRef.current.value.length < 4) setAddressError("Please fill full address");
     else  setAddressError("");
  };

  // Function to validate the ID number
  const validateIdNumber = () => {
    if (!numericPattern.test(idNumberRef.current.value))  setIdNumberError("ID number must contain only numbers");
   else  setIdNumberError("");
  };


  const onBlurAddress = () => validateAddress();

  const onBlurIdNumber = () => validateIdNumber();

  const onChangeAddress = (value: string) => {
    addressRef.current.value = value;
    onBlurAddress();
  };

  const onChangeIdNumber = (value: string) => {
    idNumberRef.current.value = value;
    onBlurIdNumber();
  };

  const getImageUrl = (url: string) => {};

  const onPressNext = async () => {
    console.log("userId is ",userId)
    if (
      addressRef.current.value &&
      dateOfBirth.toString() &&
      idNumberRef.current.value
    ) {
      setIsLoader(true);
      setUserProfile({
        ...(userProfile as ClientProfile),
        address: addressRef.current.value,
        date_of_birth: dateOfBirth.toString(),
        idNumber: idNumberRef.current.value,
        city: "",
        state: "",
        country: "",
        profilePicture: "",
      });

      //Update User Profile
      const res = await onUpdateUserProfile?.(
        {
          ...userProfile,
          address: addressRef.current.value,
          date_of_birth: dateOfBirth.toString(),
          idNumber: idNumberRef.current.value,
          city: "",
          state: "",
          country: "",
          profilePicture: "",
        },
       userId
      );

      console.log("response is ", res);

      //TODO: need formmating to save data in local
      //  setUserData({ ...userData, isSuccessful: res?.isSuccessful })
      // setLocalData('USER', res)

      setIsLoader(false);
      if (res?.isSuccessful) {
        setCurrentStep("payment");
        // setCurrentStep(() => {
        //   const array = [...currentStep];
        //   array.push(array[array.length - 1] + 1);
        //   return array;
        // });
      } else {
        Alert.alert("some error occurred");
      }
    } else {
      if (!addressRef.current.value) setAddressError("Address is required");
      if (!idNumberRef.current.value) setIdNumberError("ID number is required");
      if (!dateOfBirth) setDateOfBirthError("Birth date is required");
    }
  };

  const onPressBack = () => {
    // setCurrentStep((prev) => prev.slice(0, prev.length - 1));
  };

  return {
    isShowModal,
    setIsShowModal,
    addressRef,
    dateOfBirth,
    setDateOfBirth,
    idNumberRef,
    onBlurAddress,
    profilePicture,
    setProfilePicture,
    onBlurIdNumber,
    onChangeAddress,
    onChangeIdNumber,
    getImageUrl,
    addressError,
    dateOfBirthError,
    idNumberError,
    onPressNext,
    onPressBack,
    birthDateRef,
  };
};

export default UserAddressViewController;
