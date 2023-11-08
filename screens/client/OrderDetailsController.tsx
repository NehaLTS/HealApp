import { Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ClientOrderServices } from 'libs/ClientOrderServices';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { ClientProfile, UserTypeProvider } from 'libs/types/UserType';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { treatment } from 'libs/types/ProvierTypes';
import { useNavigation, useRoute } from '@react-navigation/native';
import NavigationRoutes from 'navigator/NavigationRoutes';
const OrderDetailsController = () => {
  const [showSummary, setShowSummary] = useState(false);
  const { orderProvider, treatmentMenu, providerLocationSearch } = ClientOrderServices();
  const { orderDetails } = UseClientUserContext();
  const order = getLocalData('USER');
  const userProfile = getLocalData?.('USERPROFILE');
  const navigation = useNavigation();
  const [treatmentReason, setTreatmentReason] = useState<treatment[]>();

  useEffect(() => {
    treatmentReasons();
  }, []);
  const treatmentReasons = async () => {
    try {
      const res = await treatmentMenu({ provider_type_id: '1' });
      // console.log("res treatmentReasons", res); // Log the response data, not the string "res"
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
    const serachResponse= providerLocationSearch({ name: "Back Pain",
      provider_type_id: "1",
      latitude:order?.longitude as unknown as string,
      longitude:order?.longitude as unknown as string,
      reqDistance:"req1"})
     
    // setShowSummary(!showSummary);
    serachResponse.then((data)=>{
      console.log("hiii heloo data... ", data, order?.longitude, order?.latitude)
      setLocalData("USER",{providerLocation:data})
    })
   
    navigation.navigate(NavigationRoutes.SearchDoctor)

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
  };
};

export default OrderDetailsController;
