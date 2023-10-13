import { UseUserContext } from 'contexts/useUserContext';
import useUpdateEffect from 'libs/UseUpdateEffect';
import React, { useRef, useState } from 'react';

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
  // const [date, setDate] = useState(new Date())
  const date = useRef<Date>(new Date()); // Use a useRef instead of useState

  const [open, setOpen] = useState(false)
  const [firstOpenDialog, setFirstOpenDialog] = useState(true)
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
    // const regex = /^(\d{2})\-(\d{2})\-(\d{4})$/;

    // if (!regex.test(birthDateRef.current.value)) {
    if (!birthDateRef.current.value) {
      setDateOfBirthError("Date of birth must be reqiured in  DD-MM-YYYY ");
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
  const formatDigit = (digit: string) => {
    if (digit.length === 1)
      return "0" + digit;
    else
      return digit;
  }
  const formatBirthDate = () => {
    return formatDigit(date.current.getDate().toString()) + "-" + formatDigit((date.current.getMonth() + 1).toString())
      + "-" + formatDigit(date.current.getFullYear().toString() ?? "")
  }
  const onPressCalender = () => {
    setFirstOpenDialog(false); setOpen(true); setUserData({ ...userData, date_of_birth: formatBirthDate.toString() })
  }
  const onConfirmDate = (dateConfirm: Date) => {
    // setDate(dateConfirm)
    date.current = dateConfirm; // Update the date using the ref
    setUserData({ ...userData, date_of_birth: formatBirthDate.toString() })
    setOpen(false)
  }
  const onCancelDate = () => {
    setOpen(false)

  }
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
    formatBirthDate,
    date,
    onPressCalender, open, onConfirmDate, onCancelDate, firstOpenDialog
  }
}
//(dateConfirm) => onConfirmDate(dateConfirm)
// setDate(date)
// setUserData({ ...userData, date_of_birth: formatBirthDate.toString() })
// setOpen(false)
export default UserAddressViewController