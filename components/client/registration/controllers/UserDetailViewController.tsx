import { UseUserContext } from 'contexts/useUserContext';
import React from 'react';

const UserDetailViewController = () => {
  const { userData, setUserData } = UseUserContext()
  const firstNameRef = React.useRef<any>("");
  const lastNameRef = React.useRef<any>("");
  const phoneNumberRef = React.useRef<any>("");


  const onBlurFirstName =()=>setUserData({ ...userData, firstname: firstNameRef.current.value })
  const onChangeFirstName =()=>(value:string) => firstNameRef.current.value = value
  const onBlurLastName =()=>setUserData({ ...userData, lastname: lastNameRef.current.value })
  const onChangeLastName =()=>(value:string) => lastNameRef.current.value = value
  const onBlurPhoneNumber =()=>setUserData({ ...userData, firstname: phoneNumberRef.current.value })
  const onChangePhoneNumber  =()=>(value:string) => phoneNumberRef.current.value = value

  return {
    userData,
    firstNameRef,
    lastNameRef,
    phoneNumberRef,
    onBlurFirstName,
    onChangeFirstName,
    onBlurLastName,
    onChangeLastName,
    onBlurPhoneNumber,
    onChangePhoneNumber,
};
}

export default UserDetailViewController