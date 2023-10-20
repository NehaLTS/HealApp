import { useRegistrationContext } from 'contexts/UseRegistrationContext';
import { UseUserContext } from 'contexts/useUserContext';
import { AuthServicesClient } from 'libs/authsevices/AuthServicesClient';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import React, { useState } from 'react';
import { Alert } from 'react-native';

const UserPaymentViewController = () => {
  const { onCreateCreditCardDetails } = AuthServicesClient()
  const { userData, setUserData } = UseUserContext();
  const cardNumberRef = React.useRef<any>("");
  const expireDateRef = React.useRef<any>("");
  const cvvRef = React.useRef<any>("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [isLoader, setIsLoader] = useState<boolean>(false)
  const [isCardDetails, setIsCardDetails] = useState(false);


  // useUpdateEffect(() => {
  //   if (cardNumberRef.current.value) setCardNumberError("")
  //   if (userData.cvv) setCvvError("")
  //   if (userData.expire_date) setCardExpiry("")
  // }, [userData])

  // const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9][0-9])[0-9]{12})$/;
  // const cvv4Regex = /^[0-9]{3}$/;
  // const expiryDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;

  const validateCardNumber = () => {
    if (!cardNumberRef.current.value) {
      setCardNumberError("Card number is required");
      // } else if (!creditCardRegex.test(cardNumberRef.current.value)) {
      //   setCardNumberError("Invalid card number format !");
    } else {
      setCardNumberError("");
    }
  };

  const validateCardExpiry = () => {
    if (!expireDateRef.current.value) {
      setCardExpiry("Expiry date is required");
      // } else if (!expiryDateRegex.test(expireDateRef.current.value)) {
      //   setCardExpiry("Invalid date format! ");
    } else {
      setCardExpiry("");
    }
  };
  const validateCvv = () => {
    if (!cvvRef.current.value) {
      setCvvError("Cvv is required");
      // } else if (!cvv4Regex.test(cvvRef.current.value)) {
      //   setCvvError("Invalid cvv format !");
    } else {
      setCvvError("");
    }
  };

  const onChangeCardNumber = (value: string) => {
    const cleanedText = value.replace(/[^0-9]/g, '');
    let formattedText = '';

    for (let i = 0; i < cleanedText.length; i += 4) {
      formattedText += cleanedText.slice(i, i + 4) + ' ';
    }

    formattedText = formattedText.trim();
    cardNumberRef.current.setNativeProps({ text: formattedText });
    cardNumberRef.current.value = formattedText
    validateCardNumber()
  }
  const onChangeExpireDate = (value: string) => {
    const cleanedText = value.replace(/[^0-9]/g, '');
    let formattedText = '';
    for (let i = 0; i < cleanedText.length; i += 2) {
      formattedText += cleanedText.slice(i, i + 2) + '/';
    }
    formattedText = formattedText.replace(/\/$/, '');
    expireDateRef.current.setNativeProps({ text: formattedText });
    expireDateRef.current.value = formattedText
    validateCardExpiry()
  }

  const onChangeCvv = (value: string) => cvvRef.current.value = value


  const onBlurCardNumber = () => {
    validateCardNumber()
    setUserData({ ...userData, credit_card_number: cardNumberRef.current.value })
  }
  const onBlurExpireDate = () => {
    validateCardExpiry()
    setUserData({ ...userData, expire_date: expireDateRef.current.value })
  }
  const onBlueCvv = () => {
    validateCvv()
    setUserData({ ...userData, cvv: cvvRef.current.value })
  }

  const onClearCard = () => cardNumberRef.current.clear()


  const onPressNext = async () => {
    if (userData.credit_card_number && userData.expire_date) {
      setIsLoader(true)
      const res = await onCreateCreditCardDetails({
        credit_card_number: userData?.credit_card_number ?? '',
        expire_date: userData?.expire_date ?? '',
        cvv: userData?.cvv ?? '',
        client_id: userData?.client_id ?? ''
      })
      setUserData({ ...userData, token: res?.token },)
      setLocalData('USER', res)
      if (res?.isSuccessful) {
        setIsCardDetails(true)
        setIsLoader(false)
      }
      else {
        Alert.alert('Some error occurred');
      }
    }
    else {
      if (!userData.credit_card_number?.length) setCardNumberError("Card number is required")
      if (!userData.cvv?.length) setCvvError("Cvv is required")
      if (!userData.expire_date?.length) setCardExpiry("Expiry date is required")
    }
    }

  const onPressBack = () => {
      // setCurrentStep((prev) => prev.slice(0, prev.length - 1));
  };


  return {
    userData,
    cardNumberRef,
    expireDateRef,
    cvvRef,
    cardNumberError,
    onBlurCardNumber,
    cardExpiry,
    onBlurExpireDate,
    onBlueCvv,
    onChangeCardNumber,
    onChangeExpireDate,
    onChangeCvv,
    cvvError,
    onClearCard,
    onPressNext,
    onPressBack,
    setIsCardDetails,
    isLoader,
    isCardDetails
  }
}

export default UserPaymentViewController