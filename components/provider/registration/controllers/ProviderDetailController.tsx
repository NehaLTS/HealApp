import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { ProviderSpeciality, ProviderType } from 'libs/types/UserType';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

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
  const { t } = useTranslation();
  const { onGetProviderTypes } = AuthServicesProvider();
  const { setCurrentStep, setProviderProfile, providerProfile, token } =
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
    setProviderTypeError('');
    if (value.specialties) setSpecialityList(value.specialties);
  };

  const onBlurSpeciality = () => validateSpeciality();

  const onChangeSpeciality = (value: ProviderSpeciality) => {
    setSelectedSpeciality(value);
    setSpecialityError('');
  };
  const getProviderTypes = async () => {
    let res = await onGetProviderTypes(token);

    console.log('res is ', res);
    setProviderTypeList(res);
  };

  useEffect(() => {
    getProviderTypes();
    if (providerProfile?.firstName) {
      firstNameRef.current.value = providerProfile?.firstName;
      lastNameRef.current.value = providerProfile?.lastName;

      //TODO: SAGAR to check these are not getting SET when back press
      // setSelectedProvider(providerProfile.provider);
      // setSelectedSpeciality(providerProfile.speciality);
      // if(providerProfile.idPicture)  setIdPicture(providerProfile.idPicture)
    }
  }, []);

  const getImageUrl = (url: string) => {
    setIdPicture(url);
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

  const validateFirstName = () => {
    if (!firstNameRef.current.value) {
      setFirstNameError(t('first_name_required'));
    } else {
      setFirstNameError('');
    }
  };

  const validateLastName = () => {
    if (!lastNameRef.current.value) {
      setLastNameError(t('last_name_required'));
    } else {
      setLastNameError('');
    }
  };

  const validateProviderType = () => {
    if (!selectedProvider) {
      setProviderTypeError(t('Provider_required'));
    } else {
      setProviderTypeError('');
    }
  };

  const validateSpeciality = () => {
    if (!selectedSpecialty) {
      setSpecialityError(t('specialty_required'));
    } else {
      setSpecialityError('');
    }
  };

  const onPressNext = () => {
    if (
      firstNameRef.current.value &&
      lastNameRef.current.value &&
      selectedSpecialty &&
      selectedProvider &&
      idPicture
    ) {
      setProviderProfile({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        provider: selectedProvider,
        speciality: selectedSpecialty,
        phoneNumber: '',
      });
      setCurrentStep('address');
    } else {
      if (!firstNameRef.current.value)
        setFirstNameError(t('first_name_required'));
      if (!lastNameRef.current.value) setLastNameError(t('last_name_required'));
      if (!selectedSpecialty) setSpecialityError(t('specialty_required'));
      if (!selectedProvider) setProviderTypeError(t('Provider_required'));
      if (!idPicture) Alert.alert(t('id_Picture'));
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
