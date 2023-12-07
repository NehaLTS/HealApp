import { useNavigation } from '@react-navigation/native';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { setLocalData } from 'libs/datastorage/useLocalStorage';
import { ProviderServices } from 'libs/types/UserType';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const ProviderServicesController = () => {
  const { onGetProviderService, AddProviderServices } = AuthServicesProvider();
  const navigation = useNavigation();
  const { providerProfile, setCurrentStep, token } = UseProviderUserContext();
  const [services, setServices] = useState<ProviderServices[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPrescriptionSelected, setIsPrescriptionSelected] = useState(false);
  const [activeSelected, setSelectedServices] = useState<ProviderServices[]>(
    [],
  );
  console.log('activeSelected', activeSelected);
  const getProviderServices = async () => {
    setIsLoading(true);
    let response = await onGetProviderService(
      {
        provider_id: providerProfile?.provider?.id,
        specialty_id: providerProfile?.speciality?.id,
      },
      token,
    );
    console.log(' response.services', response);
    if (response && response.services) {
      console.log(' response.services33', response.services);
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
    // Alert.alert('0' + index + '' + data[index]?.isSelected);
    let updatedSelectedMenu: ProviderServices[];
    if (data.find((selectedItem) => selectedItem.id === data[index].id)) {
      updatedSelectedMenu = data.filter((selectedItem) => {
        return selectedItem.id !== data[index].id;
      });
    } else {
      updatedSelectedMenu = [...data];
    }
    console.log('updatedSelectedMenu', updatedSelectedMenu);
    setSelectedServices(updatedSelectedMenu);
    setServices(data);
  };

  // const onCheckedPress = (index: number) => {
  //   setServices((prevServices) => {
  //     const updatedServices = [...prevServices];
  //     const selectedItem = updatedServices[index];

  //     if (selectedItem && selectedItem.isSelected) {
  //       selectedItem.isSelected = false;
  //     } else {
  //       selectedItem.isSelected = true;
  //     }

  //     Alert.alert('0' + index + '' + selectedItem?.isSelected);

  //     let updatedSelectedMenu: ProviderServices[];

  //     if (prevServices.find((item) => item.id === selectedItem.id)) {
  //       updatedSelectedMenu = prevServices.filter(
  //         (item) => item.id !== selectedItem.id,
  //       );
  //     } else {
  //       updatedSelectedMenu = [...prevServices];
  //     }

  //     console.log('updatedSelectedMenu', updatedSelectedMenu);
  //     setSelectedServices(updatedSelectedMenu);

  //     return updatedServices;
  //   });
  // };

  const onPrescriptionSelected = (isSelected: boolean) =>
    setIsPrescriptionSelected(isSelected);

  const onPressBack = () => setCurrentStep('payment');

  const onPressNext = async () => {
    // let response = await AddProviderServices(
    //   {
    //     heal_id: activeSelected[0].id,
    //     provider_id: providerProfile?.provider?.id,
    //   },
    //   token,
    // );
    // if (response) {
    // console.log('sendRespomnse', response);
    // }
    let selectedServices = activeSelected;
    services.filter((services) => services.isSelected);
    console.log('selected services ', activeSelected);

    setLocalData('PROVIDERSERVICES', selectedServices);
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
