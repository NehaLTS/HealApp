import { UseUserContextProvider } from 'contexts/useUserContextProvider';
import React from 'react';

const ProviderDetailController = () => {
  const { userDataProvider, setUserDataProvider } = UseUserContextProvider();
  const firstNameRef = React.useRef<any>('');
  const lastNameRef = React.useRef<any>('');
  const typeProviderRef = React.useRef<any>('');
  const specialityRef = React.useRef<any>('');

  const onBlurFirstName = () =>
    setUserDataProvider({
      ...userDataProvider,
      firstname: firstNameRef.current.value,
    });
  const onChangeFirstName = (value: string) =>
    (firstNameRef.current.value = value);
  const onBlurLastName = () =>
    setUserDataProvider({
      ...userDataProvider,
      lastname: lastNameRef.current.value,
    });
  const onChangeLastName = (value: string) =>
    (lastNameRef.current.value = value);
  const onBlurTypeProvider = () =>
    setUserDataProvider({
      ...userDataProvider,
      type_Provider: typeProviderRef.current.value,
    });
  const onChangeTypeProvider = (value: string) =>
    (typeProviderRef.current.value = value);
  const onBlurSpeciality = () =>
    setUserDataProvider({
      ...userDataProvider,
      speciality: specialityRef.current.value,
    });
  const onChangeSpeciality = (value: string) =>
    (specialityRef.current.value = value);
  return {
    userDataProvider,
    firstNameRef,
    lastNameRef,
    typeProviderRef,
    specialityRef,
    onBlurFirstName,
    onChangeFirstName,
    onBlurLastName,
    onChangeLastName,
    onBlurTypeProvider,
    onChangeTypeProvider,
    onBlurSpeciality,
    onChangeSpeciality,
  };
};

export default ProviderDetailController;
