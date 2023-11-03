import { Alert } from 'react-native'
import React, { useState } from 'react'
import { ClientOrderServices } from 'libs/ClientOrderServices';
import { getLocalData } from 'libs/datastorage/useLocalStorage';
import { ClientProfile, UserTypeProvider } from 'libs/types/UserType';
import { UseClientUserContext } from 'contexts/UseClientUserContext';

const OrderDetailsController = () => {
  const [showSummary, setShowSummary] = useState(false);
  const { orderProvider } = ClientOrderServices()
  const { orderDetails } = UseClientUserContext()
  const order = getLocalData('USER')
  const userProfile = getLocalData?.('USERPROFILE');
  const handleNextButtonPress = async () => {

    console.log('orderDetails', orderDetails)
    // const menuIds = orderDetails?.treatmentMenu.map(item => item.menu_id);
    if (showSummary === true) {
      const res = await orderProvider({
        client_id: order?.userId,
        patient_type: orderDetails.patient_type ?? '',
        patient_name: orderDetails.patient_name,
        address: userProfile?.address ?? '',
        city: '',
        phonenumber: orderDetails?.phonenumber,
        Date_of_birth: userProfile?.date_of_birth ?? "",
        services: "1,2",
        symptoms: `${orderDetails.reason}`,
        Additional_notes: orderDetails.Additional_notes,
        Estimate_arrival: "30",
        Instructions_for_arrival: orderDetails?.Instructions_for_arrival,
        Payment_mode: orderDetails.Payment_mode,
        TotalCost: "500",
        menu_id: "2",
        reason: `${orderDetails.reason}`
      })
      console.log("Order api", res)

    }
    else {
      if (orderDetails.services.length && orderDetails.reason.length)
        setShowSummary(true);
      else {
        Alert.alert("please select reasons and treatment menu")
      }
    }

  };
  return {
    handleNextButtonPress,
    showSummary,
    setShowSummary
  }
}

export default OrderDetailsController