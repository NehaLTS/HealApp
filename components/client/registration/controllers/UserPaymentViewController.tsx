import { UseUserContext } from 'contexts/useUserContext';
import useUpdateEffect from 'libs/UseUpdateEffect';
import React, { useState } from 'react'

const UserPaymentViewController = () => {
  const { userData, setUserData } = UseUserContext();
  const cardNumberRef = React.useRef<any>("");
  const expireDateRef = React.useRef<any>("");
  const cvvRef = React.useRef<any>("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");

  useUpdateEffect(() => {
    if (userData.cvv) { setCvvError("") }
    else {
      setCvvError("Cvv is required1+");
    }
  }, [userData.cvv])

  console.log('userData', userData)
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
      //   setCardExpiry("Invalid date format !");
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


  const onChangeCardNumber = (value: string) => cardNumberRef.current.value = value

  const onChangeExpireDate = (value: string) => expireDateRef.current.value = value

  const onChangeCvv = () => (value: string) => console.log('++++++++', value);


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
    cvvError
  }
}

export default UserPaymentViewController