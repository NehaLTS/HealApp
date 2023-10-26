import { AuthServicesClient } from 'libs/authsevices/AuthServicesClient';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { UseClientUserContext } from "contexts/UseClientUserContext";

const UserPaymentViewController = () => {
  const { onCreateCreditCardDetails } = AuthServicesClient()
  const cardNumberRef = React.useRef<any>("");
  const expireDateRef = React.useRef<any>("");
  const cvvRef = React.useRef<any>("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [cardExpiryError, setCardExpiryError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [isLoader, setIsLoader] = useState<boolean>(false)
  const [isCardDetails, setIsCardDetails] = useState(false);
  const { userId } = UseClientUserContext();


  const validateCardNumber = () => {
    if (!cardNumberRef.current.value)  setCardNumberError("Card number is required");
    else  setCardNumberError("");
  };

  const validateCardExpiry = () => {
    if (!expireDateRef.current.value)  setCardExpiryError("Expiry date is required");
    else  setCardExpiryError("");
  };
  const validateCvv = () => {
    if (!cvvRef.current.value)  setCvvError("Cvv is required");
    else  setCvvError("");
  };

   const trimPaymentValue = (value:string) =>  value.replace(/[^0-9]/g, '');
   

  const onChangeCardNumber = (value: string) => {
    const cleanedText = trimPaymentValue(value);
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
    const cleanedText = trimPaymentValue(value);
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


  const onBlurCardNumber = () =>  validateCardNumber()
   
    
  const onBlurExpireDate = () => validateCardExpiry()
    
  const onBlueCvv = () => validateCvv()
   

  const onClearCard = () => cardNumberRef.current.clear()


  const onPressNext = async () => {
      
    if (cardNumberRef.current.value && expireDateRef.current.value && cvvRef.current.value) {
      setIsLoader(true)
      const last4Digits =  cardNumberRef.current.value.slice(-4);
      setCardNumber("**** **** ***** " + last4Digits )
      setCardExpiry(expireDateRef.current.value)


      const res = await onCreateCreditCardDetails({
        credit_card_number: cardNumberRef.current.value ?? '',
        expire_date: expireDateRef.current.value  ?? '',
        cvv: cvvRef.current.value  ?? '',
        client_id: userId
      })
   
      //TODO: Vandana to save in Local data with isPaymentAdded as true
      setLocalData('USERPROFILE', {"isPaymentAdded":true})

       console.log("response is ",res)
       setIsLoader(false);

       //TODO:Gurpreet to navigate to Home Page
      if (res?.isSuccessful) setIsCardDetails(true)
      else  Alert.alert('Some error occurred');
    }
    else {
      if (!cardNumberRef.current.value) setCardNumberError("Card number is required")
      if (!cvvRef.current.value) setCvvError("Cvv is required")
      if (!expireDateRef.current.value) setCardExpiryError("Expiry date is required")
    }
    }

  const onPressBack = () => {
      // setCurrentStep((prev) => prev.slice(0, prev.length - 1));
  };


  return {
   
    cardNumberRef,
    expireDateRef,
    cvvRef,
    cardNumberError,
    onBlurCardNumber,
    cardExpiryError,
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
    isCardDetails,
    cardNumber,
    cardExpiry
  }
}

export default UserPaymentViewController