import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { ProviderSpeciality, ProviderType } from 'libs/types/UserType';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

const ProviderDetailController = () => {
  const { setCurrentStep, setProviderProfile, providerProfile, token } =
    UseProviderUserContext();
  const firstNameRef = React.useRef<any>('');
  const lastNameRef = React.useRef<any>('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [providerTypeError, setProviderTypeError] = useState('');
  const [specialityError, setSpecialityError] = useState('');
  const [providerTypeList, setProviderTypeList] = useState<ProviderType[]>([]);
  const [specialityList, setSpecialityList] = useState<ProviderSpeciality[]>(
    providerProfile?.provider?.specialties ?? [],
  );
  console.log('specialityList', providerTypeList);
  const [idPicture, setIdPicture] = useState(providerProfile?.idPicture ?? '');
  const { t } = useTranslation();
  const { onGetProviderTypes } = AuthServicesProvider();

  const [selectedProvider, setSelectedProvider] = useState<ProviderType>(
    providerProfile?.provider,
  );
  const [selectedSpecialty, setSelectedSpeciality] =
    useState<ProviderSpeciality | null>(providerProfile?.speciality ?? null);

  console.log('selectedProvider', selectedProvider);
  console.log('selectedSpecialty', selectedSpecialty);
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
    setSelectedSpeciality(null);
    setProviderTypeError('');
    if (value?.specialties) setSpecialityList(value?.specialties);
  };

  const onBlurSpeciality = () => validateSpeciality();

  const onChangeSpeciality = (value: ProviderSpeciality) => {
    setSelectedSpeciality(value);
    setSpecialityError('');
  };
  const getProviderTypes = async () => {
    let res = await onGetProviderTypes(token);

    console.log('res is11 ', res);
    setProviderTypeList?.(res ?? []);
  };

  useEffect(() => {
    getProviderTypes();
    if (providerProfile?.firstName) {
      firstNameRef.current.value = providerProfile.firstName ?? '';
      lastNameRef.current.value = providerProfile.lastName ?? '';

      //TODO: SAGAR to check these are not getting SET when back press
      // setSelectedProvider(providerProfile.provider);
      // setSelectedSpeciality(providerProfile.speciality);
      // if(providerProfile.idPicture)  setIdPicture(providerProfile.idPicture)
    }
  }, []);

  const getImageUrl = (url: string) => {
    console.log('url000', url);
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
  console.log('firstNameRef+++++++', firstNameRef?.current?.value);
  console.log('lastNameRef+++++++', lastNameRef?.current?.value);
  const onPressNext = () => {
    console.log("selectedSpecialty", selectedSpecialty)
    if (
      firstNameRef.current.value &&
      lastNameRef.current.value &&
      selectedSpecialty &&
      selectedProvider &&
      idPicture
    ) {
      setProviderProfile({
        ...providerProfile,
        firstName:
          firstNameRef?.current?.value?.length > 0 &&
          firstNameRef?.current?.value !== undefined
            ? firstNameRef.current.value
            : providerProfile?.firstName,
        lastName:
          lastNameRef?.current?.value?.length > 0 &&
          lastNameRef?.current?.value !== undefined
            ? lastNameRef?.current?.value
            : providerProfile?.lastName,
        provider: selectedProvider,
        speciality: selectedSpecialty,
        idPicture: idPicture,
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
    isLoading,
    setIsLoading,
  };
};

export default ProviderDetailController;
