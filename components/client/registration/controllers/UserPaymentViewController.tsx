import { UseUserContext } from 'contexts/useUserContext';
import React from 'react'

const UserPaymentViewController = () => {
    const cardNumberRef = React.useRef<any>("");
    const expireDateRef = React.useRef<any>("");
    const cvvRef = React.useRef<any>("");
    const { userData, setUserData } = UseUserContext();

    const onBlurCardNumber = () => setUserData({ ...userData, credit_card_number: cardNumberRef.current.value })
    const onBlurExpireDate = () => setUserData({ ...userData, expire_date: expireDateRef.current.value })
    const onBlueCvv = () => setUserData({ ...userData, cvv: cvvRef.current.value })

    const onChangeCardNumber = (value: string) => cardNumberRef.current.value = value
    const onChangeExpireDate = (value: string) => expireDateRef.current.value = value
    const onChangeCvv = () => (value: string) => cvvRef.current.value = value

  return {
    userData,
    cardNumberRef,
    expireDateRef,
    cvvRef,
    onBlurCardNumber,
    onBlurExpireDate,
    onBlueCvv,
    onChangeCardNumber,
    onChangeExpireDate,
    onChangeCvv
  }
}

export default UserPaymentViewController