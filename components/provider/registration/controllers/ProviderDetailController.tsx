import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { ProviderSpeciality, ProviderType } from 'libs/types/UserType';
import { generateRandomName } from 'libs/utility/Utils';
import React, { useEffect, useState } from 'react';

const ProviderDetailController = () => {
  const firstNameRef = React.useRef<any>('');
  const lastNameRef = React.useRef<any>('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [providerTypeError, setProviderTypeError] = useState('');
  const [specialityError, setSpecialityError] = useState('');
  const [providerTypeList, setProviderTypeList] = useState<ProviderType[]>([]);
  const [specialityList, setSpecialityList] = useState<ProviderSpeciality[]>(
    [],
  );
  const [idPicture, setIdPicture] = useState('');

  const { onGetProviderTypes } = AuthServicesProvider();
  const { setCurrentStep, setProviderProfile, providerProfile } =
    UseProviderUserContext();

  const [selectedProvider, setSelectedProvider] = useState<ProviderType>();
  const [selectedSpecialty, setSelectedSpeciality] =
    useState<ProviderSpeciality>();

  const onBlurFirstName = () => validateFirstName();

  const onChangeFirstName = (value: string) => {
    firstNameRef.current.value = value;
    onBlurFirstName();
  };
  const onBlurLastName = () => validateLastName();
  const onChangeLastName = (value: string) => {
    lastNameRef.current.value = value;
    onBlurLastName();
  };

  const onBlurProviderType = () => validateProviderType();

  const onChangeProviderType = (value: ProviderType) => {
    setSelectedProvider(value);
    if (value.specialties) setSpecialityList(value.specialties);
  };

  const onBlurSpeciality = () => validateSpeciality();

  const onChangeSpeciality = (value: ProviderSpeciality) => {
    setSelectedSpeciality(value);
  };

  useEffect(() => {
    getProviderTypes();
  }, []);

  const getProviderTypes = async () => {
    let res = await onGetProviderTypes();

    console.log('res is ', res);
    setProviderTypeList(res);
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

  const validateFirstName = () => {
    if (!firstNameRef.current.value) {
      setFirstNameError('First name is required');
    } else {
      setFirstNameError('');
    }
  };

  const validateLastName = () => {
    if (!lastNameRef.current.value) {
      setLastNameError('Last name is required');
    } else {
      setLastNameError('');
    }
  };

  const validateProviderType = () => {
    if (!selectedProvider) {
      setProviderTypeError('Provider type is required');
    } else {
      setProviderTypeError('');
    }
  };

  const validateSpeciality = () => {
    if (!selectedSpecialty) {
      setSpecialityError('Speciality is required');
    } else {
      setSpecialityError('');
    }
  };

  const onPressNext = () => {
    if (firstNameRef.current.value && lastNameRef.current.value ) {
     setProviderProfile({
        firstName:firstNameRef.current.value,
        lastName:lastNameRef.current.value,
        provider:selectedProvider,
        speciality:selectedSpecialty,
        phoneNumber:""
      })
      setCurrentStep('address');
    } else {
      if (!firstNameRef.current.value)
        setFirstNameError('First name is required');
      if (!lastNameRef.current.value) setLastNameError('Last name is required');
       if (!selectedSpecialty) setSpecialityError('Speciality is required');
      if (!selectedProvider) setProviderTypeError('Provider type is required');
    }
  };

  const onPressBack = () => {
    // setCurrentStep((prev) => prev.slice(0, prev.length - 1));
  };

  
  return {
    firstNameRef,
    lastNameRef,
    onBlurFirstName,
    onChangeFirstName,
    onBlurLastName,
    onChangeLastName,
    providerProfile,
    firstNameError,
    lastNameError,
    providerTypeList,
    onBlurProviderType,
    onChangeProviderType,
    selectedProvider,
    providerTypeError,
    onBlurSpeciality,
    onChangeSpeciality,
    specialityError,
    selectedSpecialty,
    specialityList,
    onPressBack,
    onPressNext,
    isShowModal,
    getImageUrl,
    setIsShowModal,
    idPicture,
  };
};

export default ProviderDetailController;
