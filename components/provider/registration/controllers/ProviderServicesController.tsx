import { useNavigation } from '@react-navigation/native';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { ProviderServices } from 'libs/types/UserType';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useEffect, useState } from 'react';

const ProviderServicesController = () => {
  const { onGetProviderService, AddProviderServices } = AuthServicesProvider();
  const navigation = useNavigation();
  const { providerProfile, setCurrentStep, token } = UseProviderUserContext();
  const [services, setServices] = useState<ProviderServices[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPrescriptionSelected, setIsPrescriptionSelected] = useState(false);
  const [selectedServices, setSelectedServices] = useState<ProviderServices[]>(
    [],
  );

  const [activeCheckbox, setActiveCheckbox] = useState<number[]>([]);
  const service = JSON.stringify(selectedServices);
  const getProviderServices = async () => {
    setIsLoading(true);
    let response = await onGetProviderService(
      {
        provider_id: providerProfile?.provider?.id,
        specialty_id: providerProfile?.speciality?.id,
      },
      token,
    );
    if (response && response.services) {
      setServices(response.services);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProviderServices();
  }, []);

  const onSelectServices = (item: any) => {
    const updatedActiveCheckbox = [...activeCheckbox];
    const itemIndex = updatedActiveCheckbox.indexOf(item?.heal_id);
    let updatedSelectedMenu: any[];
    if (itemIndex !== -1) {
      updatedActiveCheckbox.splice(itemIndex, 1);
    } else {
      updatedActiveCheckbox.push(item.heal_id);
    }
    setActiveCheckbox(updatedActiveCheckbox);
    if (
      selectedServices.find(
        (selectedItem) => selectedItem.heal_id === item.heal_id,
      )
    ) {
      updatedSelectedMenu = selectedServices.filter(
        (selectedItem) => selectedItem.heal_id !== item.heal_id,
      );
    } else {
      updatedSelectedMenu = [...selectedServices, item];
    }
    setSelectedServices(updatedSelectedMenu);
  };

  const onPrescriptionSelected = (isSelected: boolean) =>
    setIsPrescriptionSelected(isSelected);

  const onPressBack = () => setCurrentStep('payment');

  const onPressNext = async () => {
    let response = await AddProviderServices(
      {
        heal_id: service,
        provider_id: providerProfile?.provider?.id,
      },
      token,
    );
    if (response?.isSuccessful) {
      setLocalData('PROVIDERSERVICES', selectedServices);
      navigation.reset({
        index: 0,
        routes: [{ name: NavigationRoutes.ProviderConfirmation }],
      });
    }
  };
  return {
    onPressBack,
    onPressNext,
    services,
    isLoading,
    isPrescriptionSelected,
    onSelectServices,
    onPrescriptionSelected,
    activeCheckbox,
  };
};

export default ProviderServicesController;
