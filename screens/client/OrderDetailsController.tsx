import { useNavigation, useRoute } from '@react-navigation/native';
import { ClientOrderServices } from 'libs/ClientOrderServices';
import { getLocalData } from 'libs/datastorage/useLocalStorage';
import { treatment } from 'libs/types/ProvierTypes';
import { ClientProfile, OrderDetail } from 'libs/types/UserType';
import { useEffect, useState } from 'react';

const OrderDetailsController = () => {
  const [showSummary, setShowSummary] = useState(false);
  const { treatmentMenu } = ClientOrderServices();
  const userProfile = getLocalData?.('USERPROFILE');
  const [treatmentReason, setTreatmentReason] = useState<treatment[]>();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const supplier = route?.params?.supplier ?? '';
  // console.log('userProfile', userProfile);
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
      order?.reason?.length > 0 &&
      order?.services?.length > 0 &&
      order?.patient_type?.age?.length > 0
    ) {
      setShowSummary(true);
    }
    if (
      order.isOrderForOther === false &&
      order?.reason?.length > 0 &&
      order?.services?.length > 0
    ) {
      setShowSummary(true);
    }
    // console.log("orderDetails", orderDetails);
    // const menuIds = orderDetails?.treatmentMenu.map(item => item.menu_id);
    // if (showSummary === true) {
    //   const res = await orderProvider({
    //     client_id: order?.userId,
    //     patient_type: orderDetails.patient_type ?? "",
    //     patient_name: orderDetails.patient_name,
    //     address: userProfile?.address ?? "",
    //     city: "",
    //     phonenumber: orderDetails?.phonenumber,
    //     Date_of_birth: userProfile?.date_of_birth ?? "",
    //     services: "1,2",
    //     symptoms: `${orderDetails.reason}`,
    //     Additional_notes: orderDetails.Additional_notes,
    //     Estimate_arrival: "30",
    //     Instructions_for_arrival: orderDetails?.Instructions_for_arrival,
    //     Payment_mode: orderDetails.Payment_mode,
    //     TotalCost: "500",
    //     menu_id: "2",
    //     reason: `${orderDetails.reason}`,
    //   });
    //   // console.log("Order api", res);
    // } else {
    //   if (orderDetails.services.length && orderDetails.reason.length)
    //     setShowSummary(true);
    //   else {
    //     Alert.alert("please select reasons and treatment menu");
    //   }
    // }
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
