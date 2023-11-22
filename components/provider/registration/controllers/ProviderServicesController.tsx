import { useNavigation } from '@react-navigation/native';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { ProviderServices } from 'libs/types/UserType';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useEffect, useState } from 'react';

const ProviderServicesController = () => {
  const { onGetProviderService } = AuthServicesProvider();
  const navigation = useNavigation();
  const { providerProfile, setCurrentStep,token } = UseProviderUserContext();
  const [services, setServices] = useState<ProviderServices[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPrescriptionSelected, setIsPrescriptionSelected] = useState(false);

  const getProviderServices = async () => {
    setIsLoading(true);
    let response = await onGetProviderService({
      provider_id: providerProfile?.provider?.id,
      specialty_id: providerProfile?.speciality?.id,
    },token);
    if (response && response.services) {
      setServices(response.services);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProviderServices();
  }, []);
  const onCheckedPress = (index: number) => {
    let data = [...services];
    if (data[index] && data[index]?.isSelected) {
      data[index].isSelected = false;
    } else {
      data[index].isSelected = true;
    }
    setServices(data);
  };

  const onPrescriptionSelected = (isSelected: boolean) =>  setIsPrescriptionSelected(isSelected);

  const onPressBack = () => setCurrentStep('payment');

  const onPressNext = () => {

    let selectedServices=services.filter(services => services.isSelected);
    console.log("selected services ", selectedServices)
    setLocalData('PROVIDERSERVICES',selectedServices) ;
    navigation.reset({
      index: 0,
      routes: [{ name: NavigationRoutes.ProviderConfirmation }],
    });
  };
  return {
    onPressBack,
    onPressNext,
    services,
    isLoading,
    isPrescriptionSelected,
    onCheckedPress,
    onPrescriptionSelected,
  };
};

export default ProviderServicesController;