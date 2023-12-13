import { useNavigation } from '@react-navigation/native';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { ProviderServices } from 'libs/types/UserType';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react-native';
import { Alert } from 'react-native';

const ProviderServicesController = () => {
  const { onGetProviderService, AddProviderServices } = AuthServicesProvider();
  const navigation = useNavigation();
  const { providerProfile, setCurrentStep, token, userId } = UseProviderUserContext();
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
      Sentry.captureMessage(
        `Provider flow GET ALL RELATED SERVICES onGetProviderService(API) for:-${providerProfile?.firstName ?? ''
        }---- ${response.services}`,
      );
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
    if (selectedServices?.length) {
      setIsLoading(true);
      const concatenatedIds = selectedServices
        .map((item) => item.heal_id)
        .join(', ');

      let response = await AddProviderServices(
        {
          heal_id: concatenatedIds,
          provider_id: userId,
        },
        token,
      );
      if (response?.isSuccessful) {
        Sentry.captureMessage(
          `Provider flow SELECTED SERVICES API HITfor:-${providerProfile?.firstName ?? ''
          }---- ${JSON.stringify(response)}`,
        );
        Sentry.captureMessage(
          `Provider flow SELECTED SERVICES for:-${providerProfile?.firstName ?? ''
          }---- ${selectedServices}`,
        );
        setLocalData('PROVIDERSERVICES', selectedServices);
        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: NavigationRoutes.ProviderHome }],
        });
      } else {
        setIsLoading(false);
      }
    } else {
      Alert.alert('Please select services you provide.');
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
