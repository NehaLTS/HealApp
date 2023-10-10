import { UseUserContext } from 'contexts/useUserContext';
import React, { useState } from 'react';

const UserAddressViewController = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const { userData, setUserData } = UseUserContext()
    const addressRef = React.useRef<any>("");
    const birthDateRef = React.useRef<any>("");
    const idNumberRef = React.useRef<any>("");

    const onBlurAddress = () => setUserData({ ...userData, address: addressRef.current.value })
    const onBlurBirthDate = () => setUserData({ ...userData, date_of_birth: birthDateRef.current.value })
    const onBlurIdNumber = () => setUserData({ ...userData, id_number: idNumberRef.current.value })
  
    const onChangeAddress = (value:string) => addressRef.current.value = value
    const onChangeBirthDate = (value:string) => birthDateRef.current.value = value
    const onChangeIdNumber = (value:string) => idNumberRef.current.value = value

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
    getImageUrl
  }
}

export default UserAddressViewController