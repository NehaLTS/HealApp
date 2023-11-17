import { useNavigation, useRoute } from '@react-navigation/native';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { ClientOrderServices } from 'libs/ClientOrderServices';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { treatment } from 'libs/types/ProvierTypes';
import { ClientProfile, OrderDetail } from 'libs/types/UserType';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const OrderDetailsController = () => {
  const [showSummary, setShowSummary] = useState(false);
  const { treatmentMenu, orderProvider } = ClientOrderServices();
  const userData = getLocalData('USER');
  const userProfile = getLocalData?.('USERPROFILE');
  const navigation = useNavigation();
  const {currentLocationOfUser, orderDetails}= UseClientUserContext()
  const [treatmentReason, setTreatmentReason] = useState<treatment[]>();
  const route = useRoute<any>();
  const supplier = route?.params?.supplier ?? '';
  const [order, setOrder] = useState<OrderDetail>({
    client_id: '',
    patient_type: { type: 'me', age: '' },
    patient_name: '',
    address: '',
    city: (userProfile as ClientProfile)?.city ?? '',
    phonenumber: '',
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
    setShowSummary(true);
    // "name":"Back Pain",
    // "provider_type_id":"1",
    // "latitude":"30.37775529243538",
    // "longitude":"76.77481109532673",
    // "reqDistance":"req1"
  

  

    console.log("orderDetails", orderDetails);
    // const menuIds = orderDetails?..map(item => item.menu_id);
    if (showSummary === true) {
      // const res = await orderProvider({
      //   client_id: order?.client_id,
      //   patient_type: orderDetails.patient_type.type ?? "",
      //   patient_name: orderDetails.patient_name,
      //   address: 'USerLocation' ?? "",
      //   city: "",
      //   phonenumber: orderDetails?.phonenumber,
      //   Date_of_birth: '17/20/2000' ?? "",
      //   services: "1,2",
      //   symptoms: `${orderDetails.reason}`,
      //   Additional_notes: orderDetails.Additional_notes,
      //   Estimate_arrival: "30",
      //   Instructions_for_arrival: orderDetails?.Instructions_for_arrival,
      //   Payment_mode: orderDetails.Payment_mode,
      //   TotalCost: "500",
      //   menu_id: "2",
      //   reason: `${orderDetails.reason}`,
      // });
      // if(res!==undefined) 
      navigation.navigate(NavigationRoutes.SearchDoctor)
      // console.log("Order api", res);
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
