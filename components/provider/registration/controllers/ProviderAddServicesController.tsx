import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { Alert } from 'react-native';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { ProviderServices } from 'libs/types/UserType';

const ProviderAddServicesController = () => {
  const { providerProfile, userId,setProviderServices } = UseProviderUserContext();
  const serviceNameRef = React.useRef<any>('');
  const priceRef = React.useRef<any>('');
  const descriptionRef = React.useRef<any>('');
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const { onCreateProviderServices, onGetUserAllServices } =
    AuthServicesProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<ProviderServices[]>([]);
  const [service, setService] = useState<ProviderServices>();

  const [serviceError, setServiceError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const toggleModal = () => setModalVisible(!isModalVisible);
  const onBlurServiceName = () => validateServiceName();
  const onChangeServiceName = (value: string) =>
    (serviceNameRef.current.value = value);
  const onBlurPriceName = () => validatePrice();
  const onChangePriceName = (value: string) => (priceRef.current.value = value);
  const onBlurDescription = () =>  validateDescription();
  const onChangeDescription = (value: string) =>  (descriptionRef.current.value = value);
   

  const validateServiceName = () => {
    if (!serviceNameRef.current.value) {
      setServiceError('Service name is required');
    } else setServiceError('');
  };
  const validatePrice = () => {
    if (!priceRef.current.value) {
      setPriceError('Price is required');
    } else  setPriceError('');
  };
  const validateDescription = () => {
    if (!descriptionRef.current.value) {
      setDescriptionError('Description is required');
    } else  setDescriptionError('');
  };

  const getUserAllServices = async () => {
    setIsLoading(true);
    let response = await onGetUserAllServices({ provider_id: userId });
     console.log('resp is ', response);
    if (response) {
      setServices(response);
      setProviderServices(response);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getUserAllServices();
  }, []);

  const saveService = async () => {
    if (
      serviceNameRef.current.value &&
      descriptionRef.current.value &&
      priceRef.current.value
    ) {
      let data = {
        name: { en: serviceNameRef.current.value, hi: '', he: '' },
        description: { en: descriptionRef.current.value, hi: '', he: '' },
        price: priceRef.current.value,
        id:-1,
      };

      setService({ ...(service as ProviderServices), ...data });
      setServices([...services, data])


      setIsLoading(true);
      let response = await onCreateProviderServices({
        name: serviceNameRef.current.value,
        description: descriptionRef.current.value,
        price: priceRef.current.value,
        provider_id: userId,
        specialty_id: providerProfile?.speciality?.id,
      });


      console.log("response add service is ",response)
    setLocalData('PROVIDERSERVICES',services) ;
      setIsLoading(false);
      toggleModal();
     
    } else {
      Alert.alert('Please fill all the details');
    }
  };

  const onApprove = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: NavigationRoutes.ProviderConfirmation }],
    });
  };

  return {
   
    serviceNameRef,
    priceRef,
    descriptionRef,
    isLoading,
    services,
    service,
    onBlurServiceName,
    onChangeServiceName,
    onBlurPriceName,
    onChangePriceName,
    onBlurDescription,
    onChangeDescription,
    saveService,
    isModalVisible,
    toggleModal,
    serviceError,
    priceError,
    descriptionError,
    onApprove,
  };
};

export default ProviderAddServicesController;