import { Alert, Linking } from "react-native";

const SearchDoctorController = () => {
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
  

 }
  
  return {
    permissionHelper,
    forceAlert,
    handleNextButtonPress
  };
};

export default SearchDoctorController;
