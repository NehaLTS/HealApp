import { Alert, Linking } from "react-native";
import { ClientOrderServices } from "libs/ClientOrderServices"
import { getLocalData, setLocalData } from "libs/datastorage/useLocalStorage";
import { UseClientUserContext } from "contexts/UseClientUserContext";
import { useState } from "react";
import haversine from "haversine";
import { useRoute } from "@react-navigation/native";

const SearchDoctorController = () => {
  const { BookOrderRequest, providerLocationSearch } = ClientOrderServices()
  const { currentLocationOfUser } = UseClientUserContext()
  const [showRateAlert, setShowRateAlert] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const [disabled, setDisable] = useState(false)
  const route = useRoute<any>();
  const orderData = getLocalData('ORDER')?.providerDetail
  const orderId = route?.params?.orderId ?? '';
  const providerData = route?.params?.providerData ?? '';
  console.log("orderId..", orderId)
  const permissionHelper = {
    title: 'Location Permission',
    message: 'This app requires access to your location.',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  };

  // functions
  const forceAlert = () => {
    Alert.alert(
      'Location access required',
      'Kindly allow location access in settings or turn on gps and restart app',
      [{ text: 'OK', onPress: () => Linking.openSettings() }],
      { cancelable: false },
    );
  };

  const handleNextButtonPress = () => {
    console.log('providerData00', providerData, "  orderData..", orderData)
    BookOrderRequest({
      status: 'accept',
      provider_id: providerData?.provider_id,
      order_id: orderId,
      latitude: currentLocationOfUser.latitude,
      longitude: currentLocationOfUser.longitude,
      distance: Math.round(calculateDistance()).toString(),
      time: Math.round(calculateTime().minutes).toString()
    }).then((res) => {

      console.log("orderSendRequest", res)
    })
    setDisable(true)
  }

  const calculateDistance = () => {
    const userCurrentLocation = { latitude: parseFloat(currentLocationOfUser?.latitude), longitude: parseFloat(currentLocationOfUser?.longitude) }
    const ProviderLocation = { latitude: parseFloat(orderData ? orderData.latitude : providerData?.latitude), longitude: parseFloat(orderData ? orderData.longitude : providerData?.longitude) }
    const distance = haversine(ProviderLocation, userCurrentLocation, { unit: 'km' })
    console.log("Distance...", distance)
    return distance
  }

  const calculateTime = () => {
    const DISTANCE = calculateDistance()
    const AVERAGE_SPEED = 40
    const TIME = DISTANCE / AVERAGE_SPEED
    const travelTimeInMinutes = TIME * 60;
    const travelTimeInHours = Math.floor(TIME / 60);
    const remainingMinutes = Math.round(TIME % 60);
    const travelTimeInSeconds = TIME * 3600;
    const time = { hour: travelTimeInHours, minutes: travelTimeInMinutes, seconds: TIME, remainig: remainingMinutes }
    return time
  }


  return {
    permissionHelper,
    forceAlert,
    handleNextButtonPress,
    showRateAlert,
    calculateDistance,
    calculateTime,
    showLoader,
    disabled
  };
};

export default SearchDoctorController;
