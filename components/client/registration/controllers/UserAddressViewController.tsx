import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { AuthServicesClient } from 'libs/authsevices/AuthServicesClient';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { ClientProfile } from 'libs/types/UserType';
// import uploadImage from 'libs/uploadImage';
import { generateRandomName, numericPattern } from 'libs/utility/Utils';
import React, { useState } from 'react';
import { Alert } from 'react-native';

const UserAddressViewController = () => {
  const { onUpdateUserProfile } = AuthServicesClient();
  const [isShowModal, setIsShowModal] = useState(false);
  const addressRef = React.useRef<any>('');
  const birthDateRef = React.useRef<any>('');
  const idNumberRef = React.useRef<any>('');
  const [addressError, setAddressError] = useState('');
  const [idNumberError, setIdNumberError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const [onSearchAddress, setOnSearchAddress] = useState('');
  const { setCurrentStep, setUserProfile, userProfile, userId } =
    UseClientUserContext();

  const [profilePicture, setProfilePicture] = useState(
    userProfile && userProfile.profilePicture ? userProfile.profilePicture : '',
  );

  const validateAddress = () => {
    if (onSearchAddress?.length < 4)
      setAddressError('Please fill full address');
    else setAddressError('');
  };

  // Function to validate the ID number
  const validateIdNumber = () => {
    if (!numericPattern.test(idNumberRef.current.value))
      setIdNumberError('ID number must contain only numbers');
    else setIdNumberError('');
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

  const getImageUrl = (url: string) => {
    // setProfilePicture(url)
    const imagePath = url;
    const folderName = 'images/users';
    const fileName = generateRandomName();
    // uploadImage(imagePath, folderName, fileName)
    //   .then((downloadURL) => {
    //     // Handle the downloadURL as needed
    //     console.log('Download URL:', downloadURL);
    //     setProfilePicture(downloadURL);
    //   })
    //   .catch((error) => {
    //     // Handle any errors
    //     console.error('Error uploading image:', error);
    //   });
  };

  const onPressNext = async () => {
    console.log('userId is ', userId);
    if (
      onSearchAddress?.length !== 0 &&
      dateOfBirth.toString() &&
      idNumberRef.current.value
    ) {
      setIsLoader(true);
      setUserProfile({
        ...(userProfile as ClientProfile),
        address: addressRef.current.value,
        date_of_birth: dateOfBirth.toString(),
        idNumber: idNumberRef.current.value,
        city: '',
        state: '',
        country: '',
        profilePicture: profilePicture ?? '',
      });

      //Update User Profile
      const res = await onUpdateUserProfile?.(
        {
          ...userProfile,
          address: addressRef.current.value,
          date_of_birth: dateOfBirth.toString(),
          idNumber: idNumberRef.current.value,
          city: '',
          state: '',
          country: '',
          profilePicture: profilePicture ?? '',
        },
        userId,
      );

      console.log('response is ', res);

      setLocalData('USERPROFILE', {
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        phoneNumber: userProfile.phoneNumber,
        address: addressRef.current.value,
        city: '',
        state: '',
        country: '',
        profilePicture: profilePicture ?? '',
        date_of_birth: dateOfBirth.toString(),
        idNumber: idNumberRef.current.value,
      });

      setIsLoader(false);
      console.log('res', res);
      if (res?.isSuccessful) {
        setCurrentStep('payment');
      } else {
        Alert.alert('some error occurred');
      }
    } else {
      if (onSearchAddress?.length === 0) setAddressError('Address is required');
      if (!idNumberRef.current.value) setIdNumberError('ID number is required');
      if (!dateOfBirth) setDateOfBirthError('Birth date is required');
    }
  };

  const onPressBack = () => {
    setCurrentStep('details');
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
    setOnSearchAddress,
    setIsVisible,
    isVisible,
    onSearchAddress,
    isLoader,
  };
};

export default UserAddressViewController;
