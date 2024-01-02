import { useProfiler } from '@sentry/react-native';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { AuthServicesClient } from 'libs/authsevices/AuthServicesClient';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { ClientProfile, userLocation } from 'libs/types/UserType';
import uploadImage from 'libs/uploadImage';
// import uploadImage from 'libs/uploadImage';
import {
  generateRandomName,
  getImagesPath,
  numericPattern,
} from 'libs/utility/Utils';
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
    setUserLocation,
    userLocation,
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
    userLocation?.currentLocation?.address ?? '',
  );
  const [geomatricAddress, setGeomatricAddress] = useState(userLocation ?? '');

  const { t } = useTranslation();
  const [profilePicture, setProfilePicture] = useState(
    userProfile && userProfile.profilePicture ? userProfile.profilePicture : '',
  );

  const imagePaths = [
    {
      imagePath: userProfile?.profilePicture,
      type: 'profilePicture',
    },
  ]?.filter((imageData) => imageData?.imagePath);

  const validateAddress = (value: string) => {
    if (value?.length < 4) setAddressError(t('fill_address'));
    else setAddressError('');
  };

  // Function to validate the ID number
  const validateIdNumber = (value: string) => {
    if (!numericPattern.test(value)) setIdNumberError(t('id_contain_numbers'));
    else setIdNumberError('');
  };

  const onBlurIdNumber = () => {};

  const onChangeAddress = (
    value: string,
    latitude: string,
    longitude: string,
  ) => {
    setOnSearchAddress(value ?? '');
    validateAddress(value ?? '');
    setGeomatricAddress({
      onboardingLocation: { latitude: latitude, longitude: longitude },
    });
    console.log('valueChnage latitude', value, latitude, longitude);
  };

  const onChangeIdNumber = (value: string) => {
    idNumberRef.current.value = value;
    validateIdNumber(value);
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

    await uploadImage(imagePaths)
      .then(async (images) => {
        if (
          onSearchAddress &&
          dateOfBirth.toString() &&
          idNumberRef.current.value &&
          profilePicture
        ) {
          setIsLoader(true);
          setUserProfile({
            ...(userProfile as ClientProfile),
            address: onSearchAddress,
            date_of_birth: dateOfBirth.toString(),
            idNumber: idNumberRef.current.value,
            city: '',
            state: '',
            country: '',
            profilePicture: getImagesPath(images, 'profilePicture') ?? '',
          });
          setUserLocation((prevState) => ({
            ...prevState,
            onboardingLocation: {
              address: onSearchAddress,
              latitude: geomatricAddress.onboardingLocation?.latitude,
              longitude: geomatricAddress.onboardingLocation?.longitude,
            },
            currentLocation: prevState?.currentLocation,
          }));
          setLocalData('LOCATION', {
            onboardingLocation: {
              address: onSearchAddress,
              latitude: geomatricAddress.onboardingLocation?.latitude,
              longitude: geomatricAddress.onboardingLocation?.longitude,
            },
          });

          //Update User Profile
          const res = await onUpdateUserProfile?.(
            {
              ...userProfile,
              address: onSearchAddress,
              date_of_birth: dateOfBirth.toString(),
              idNumber: idNumberRef.current.value,
              city: '',
              state: '',
              country: '',
              profilePicture: getImagesPath(images, 'profilePicture') ?? '',
            },
            userId,
            token,
          );

          console.log('response is ', res, 'token', token);

          setLocalData('USERPROFILE', {
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
            phoneNumber: userProfile?.phoneNumber,
            address: onSearchAddress,
            city: '',
            state: '',
            country: '',
            profilePicture: getImagesPath(images, 'profilePicture') ?? '',
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
          if (!onSearchAddress?.length) setAddressError(t('address_required'));
          if (!idNumberRef.current.value) setIdNumberError(t('id_required'));
          if (!dateOfBirth) setDateOfBirthError(t('birth_date_required'));
          if (!profilePicture) Alert.alert(t('add_a_profile_photo'));
        }
      })
      .catch((error) => {
        console.error('Error uploading images:', error);
      });
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
    setIsLoader,
  };
};

export default UserAddressViewController;
