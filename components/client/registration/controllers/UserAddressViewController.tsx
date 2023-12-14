import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { AuthServicesClient } from 'libs/authsevices/AuthServicesClient';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { ClientProfile, currentLocationOfUser } from 'libs/types/UserType';
// import uploadImage from 'libs/uploadImage';
import { generateRandomName, numericPattern } from 'libs/utility/Utils';
import React, { useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

const UserAddressViewController = () => {
  const { onUpdateUserProfile } = AuthServicesClient();
  const {
    setCurrentStep,
    setUserProfile,
    userProfile,
    userId,
    token,
    currentLocationOfUser,
  } = UseClientUserContext();
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
  const [onSearchAddress, setOnSearchAddress] = useState(
    currentLocationOfUser?.address ?? '',
  );
  const [geomatricAddress, setGeomatricAddress] = useState(
    currentLocationOfUser ?? '',
  );

  const { t } = useTranslation();
  const [profilePicture, setProfilePicture] = useState(
    userProfile && userProfile.profilePicture ? userProfile.profilePicture : '',
  );

  const validateAddress = (value: string) => {
    if (value?.length < 4) setAddressError(t('fill_address'));
    else setAddressError('');
  };

  // Function to validate the ID number
  const validateIdNumber = () => {
    if (!numericPattern.test(idNumberRef.current.value))
      setIdNumberError(t('id_contain_numbers'));
    else setIdNumberError('');
  };

  const onBlurIdNumber = () => validateIdNumber();

  const onChangeAddress = (value: string, latitude: string, longitude: string) => {
    setOnSearchAddress(value ?? '');
    validateAddress(value ?? '');
    setGeomatricAddress({ latitude, longitude })
    console.log('valueChnage latitude', value, latitude, longitude);
  };

  const onChangeIdNumber = (value: string) => {
    idNumberRef.current.value = value;
    onBlurIdNumber();
  };

  const getImageUrl = (url: string) => {
    setProfilePicture(url);
    // const imagePath = url;
    // const folderName = 'images/users';
    // const fileName = generateRandomName();
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
      onSearchAddress &&
      dateOfBirth.toString() &&
      idNumberRef.current.value
    ) {
      setIsLoader(true);
      setUserProfile({
        ...(userProfile as ClientProfile),
        address: { address: onSearchAddress, latitude: geomatricAddress.latitude, longitude: geomatricAddress.longitude },
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
          address: { address: onSearchAddress, latitude: geomatricAddress.latitude, longitude: geomatricAddress.longitude },
          date_of_birth: dateOfBirth.toString(),
          idNumber: idNumberRef.current.value,
          city: '',
          state: '',
          country: '',
          profilePicture: profilePicture ?? '',
        },
        userId,
        token,
      );

      console.log('response is ', res, 'token', token);

      setLocalData('USERPROFILE', {
        firstName: userProfile?.firstName,
        lastName: userProfile?.lastName,
        phoneNumber: userProfile?.phoneNumber,
        address: { address: onSearchAddress, latitude: geomatricAddress.latitude, longitude: geomatricAddress.longitude },
        city: '',
        state: '',
        country: '',
        profilePicture: profilePicture ?? '',
        date_of_birth: dateOfBirth?.toString(),
        idNumber: idNumberRef.current.value,
      });

      setIsLoader(false);
      console.log('res', res);
      if (res?.isSuccessful) {
        setCurrentStep('payment');
      } else {
        Alert.alert(t('error_occurred'));
      }
    } else {
      if (onSearchAddress) setAddressError(t('address_required'));
      if (!idNumberRef.current.value) setIdNumberError(t('id_required'));
      if (!dateOfBirth) setDateOfBirthError(t('birth_date_required'));
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
    setDateOfBirthError,
  };
};

export default UserAddressViewController;
