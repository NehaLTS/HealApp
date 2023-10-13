import { useNavigation } from "@react-navigation/native";
import { UseUserContext } from "contexts/useUserContext";
import { AuthServicesClient } from "libs/authsevices/AuthServicesClient";
import { setLocalData } from "libs/datastorage/useLocalStorage";
import useUpdateEffect from "libs/UseUpdateEffect";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import UserDetailViewController from "./UserDetailViewController";

const BasicInformationController = ({
  totalSteps,
}: {
  totalSteps?: number;
}) => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState([0]);
  const [isGetDetail, setIsGetDetail] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { onUpdateUserProfile, onCreateCreditCardDetails, onGetCreditCard } = AuthServicesClient()
  const [isGetCardDetails, setIsGetCardDetails] = useState(false);
  const [isCardDetails, setIsCardDetails] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [idNumberError, setIdNumberError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");

  const [cardNumberError, setCardNumberError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [a, setA] = useState('');
  const { userData, setUserData } = UseUserContext()
  const [isLoader, setIsLoader] = useState<boolean>(false)
  useUpdateEffect(() => {
    if (userData.firstname?.length) setFirstNameError("");
    if (userData.lastname?.length) setLastNameError("");
    if (userData.phone_number?.length) setPhoneNumberError("");

    if (userData.address) { setAddressError("") }
    if (userData.id_number) { setIdNumberError("") }
    if (userData.date_of_birth) { setDateOfBirthError("") }

    if (userData.credit_card_number) setCardNumberError("")
    if (userData.cvv) setCvvError("")
    if (userData.expire_date) setCardExpiry("")

  }, [userData])

  const onPressNext = async () => {
    if (currentStep.length !== totalSteps) {
      if (currentStep[currentStep.length - 1] === 0) {
        if (userData.firstname && userData.lastname && userData.phone_number) {
          setCurrentStep(() => {
            const array = [...currentStep];
            array.push(array[array.length - 1] + 1);
            return array;
          });
        } else {
          setFirstNameError("First name is required");
          setLastNameError("Last name is required");
          setPhoneNumberError("Phone number is required");
        }
      }
      if (currentStep[currentStep.length - 1] === 1) {
        if (userData.address && userData.date_of_birth && userData.id_number) {
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
            id_number: userData?.id_number ?? ""
          });
          setUserData({ ...userData, isSuccessful: res?.isSuccessful })
          setLocalData('USER', res)
          console.log("res", res)
          setIsLoader(false)
          if (res?.isSuccessful) {
            setCurrentStep(() => {
              const array = [...currentStep];
              array.push(array[array.length - 1] + 1);
              return array;
            });
          }
          else {
            Alert.alert('some error occurred');
          }
        } else {
          setAddressError("Address is required")
          setIdNumberError("ID number is required")
          setDateOfBirthError("Birth date is required")
        }
      }
    }
    if (currentStep[currentStep.length - 1] === 2) {
      console.log("credit_card_number", userData.expire_date, userData.cvv)
      if (userData.credit_card_number && userData.expire_date) {
        setIsLoading(true)
        const res = await onCreateCreditCardDetails({
          credit_card_number: userData?.credit_card_number ?? '',
          expire_date: userData?.expire_date ?? '',
          cvv: '6666166664',
          client_id: userData?.client_id ?? ''
        })
        setUserData({ ...userData, token: res?.token },)
        setLocalData('USER', res)
        if (res?.isSuccessful) {
          setIsGetDetail(true)
          setIsGetCardDetails(true)
          setIsCardDetails(true)
          setIsLoading(false)
        }
        else {
          Alert.alert('some error occured');
        }
      }
      else {
        Alert.alert('nklcvnbkc')
        //   setCardNumberError("Card number is required")
        //   setCvvError("Cvv is required")
        //   setCardExpiry("Expiry date is required")
      }
    }

  };
  const onPressBack = () => {
    if (currentStep.length > 1) {
      setCurrentStep((prev) => prev.slice(0, prev.length - 1));
    }
    if (currentStep.length === 1) {
      navigation.goBack()
    }
  };

  return {
    currentStep,
    onPressNext,
    onPressBack,
    isLoading,
    isCardDetails,
    isGetCardDetails,
    isGetDetail,
    firstNameError,
    lastNameError,
    phoneNumberError,
    addressError,
    idNumberError,
    dateOfBirthError,
    cardNumberError,
    cvvError,
    cardExpiry, isLoader
  };
};


export default BasicInformationController
