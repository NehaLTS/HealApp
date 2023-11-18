import { useNavigation, useRoute } from '@react-navigation/native';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { ClientOrderServices } from 'libs/ClientOrderServices';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { treatment } from 'libs/types/ProvierTypes';
import { ClientProfile, OrderDetail } from 'libs/types/UserType';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import SearchDoctorController from './SearchDoctorController';
import { useTranslation } from 'react-i18next';

const OrderDetailsController = () => {
  const { t } = useTranslation();
  const [showSummary, setShowSummary] = useState(false);
  const { treatmentMenu, orderProvider } = ClientOrderServices();
  const userData = getLocalData('USER');
  const userProfile = getLocalData?.('USERPROFILE');
  const navigation = useNavigation();
  const {currentLocationOfUser, orderDetails}= UseClientUserContext()
  const [treatmentReason, setTreatmentReason] = useState<treatment[]>();
  const { SearchDoctorLocation}= SearchDoctorController()

  const route = useRoute<any>();
  const supplier = route?.params?.supplier ?? '';
  const [order, setOrder] = useState<OrderDetail>({
    client_id: '',
    patient_type: { type: 'me', age: '' },
    patient_name: '',
    address: (userProfile as ClientProfile)?.address ?? '',
    city: (userProfile as ClientProfile)?.city ?? '',
    phonenumber: (userProfile as ClientProfile)?.phoneNumber ?? '',
    Date_of_birth: '',
    services: [],
    symptoms: '',
    Additional_notes: '',
    Estimate_arrival: '60',
    Instructions_for_arrival: '',
    Payment_mode: '',
    TotalCost: '',
    menu_id: '',
    reason: [],
    isOrderForOther: false,
  });

  useEffect(() => {
    treatmentReasons();
  }, []);

  const treatmentReasons = async () => {
    try {
      const res = await treatmentMenu({ provider_type_id: '1' });
      setTreatmentReason(res);
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleNextButtonPress = async () => {
    if (
      order.isOrderForOther &&
      (order?.reason?.length > 0 || order?.Additional_notes?.length) &&
      order?.services?.length > 0 &&
      order?.patient_type?.age?.length > 0 &&
      order?.address?.length
    ) {
      setShowSummary(true);
    }
    if (
      order.isOrderForOther === false &&
      (order?.reason?.length > 0 || order?.Additional_notes?.length) &&
      order?.services?.length > 0 &&
      order?.address?.length
    ) {
      setShowSummary(true);
    }
   
    if (showSummary) {
    
      const res = await orderProvider({
        client_id: order?.client_id,
        patient_type: order.patient_type.type ?? "",
        patient_name: order.patient_name,
        address: order?.address ?? "",
        city: order.city,
        phonenumber: order?.phonenumber,
        Date_of_birth: order?.Date_of_birth ?? "",
        services: order.services[0],
        symptoms: `${order.symptoms}`,
        Additional_notes: order.Additional_notes,
        Estimate_arrival: order.Estimate_arrival,
        Instructions_for_arrival: order?.Instructions_for_arrival,
        Payment_mode: order.Payment_mode,
        TotalCost:order.TotalCost,
        menu_id: order.menu_id,
        reason: `${order.reason}`,
       
      });
      SearchDoctorLocation();
      if(res) navigation.navigate(NavigationRoutes.SearchDoctor)
    } else {
      if (orderDetails.services.length && orderDetails.reason.length)
        setShowSummary(true);
      else {
        Alert.alert("please select reasons and treatment menu");
      }
    }
  };
  return {
    handleNextButtonPress,
    showSummary,
    setShowSummary,
    treatmentReason,
    navigation,
    supplier,
    order,
    setOrder,
  };
};

export default OrderDetailsController;
