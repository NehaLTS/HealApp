import { Alert, Linking } from "react-native";
import {ClientOrderServices} from "libs/ClientOrderServices"
import { getLocalData } from "libs/datastorage/useLocalStorage";
import { UseClientUserContext } from "contexts/UseClientUserContext";


const SearchDoctorController = () => {
  const {BookOrderRequest} =ClientOrderServices()
  const localData= getLocalData('USER')
  const {userId, currentLocationOfUser} =UseClientUserContext()
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
      [{text:'OK', onPress: () => Linking.openSettings()}],
      {cancelable: false},
    );
  };

 const  handleNextButtonPress=()=>{
  BookOrderRequest({ provider_id:localData?.providerLocation[0]?.provider_id,
  order_id:"1",
  latitude:currentLocationOfUser.latitude,
  longitude:currentLocationOfUser.longitude}).then((res)=>{
    console.log("orderSendRequest", res)
  })
  
 }
  
  return {
    permissionHelper,
    forceAlert,
    handleNextButtonPress
  };
};

export default SearchDoctorController;
