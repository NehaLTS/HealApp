import { Alert, Linking } from "react-native";
import {ClientOrderServices} from "libs/ClientOrderServices"
import { getLocalData, setLocalData } from "libs/datastorage/useLocalStorage";
import { UseClientUserContext } from "contexts/UseClientUserContext";
import { useState } from "react";


const SearchDoctorController = () => {
  const {BookOrderRequest, providerLocationSearch} =ClientOrderServices()
  const localData= getLocalData('USER')
  const {currentLocationOfUser} =UseClientUserContext()
  const [showRateAlert, setShowRateAlert] =useState(false)
  const [showLoader, setShowLoader]=useState(true)
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
  BookOrderRequest({ provider_id:localData?.providerLocation?.provider_id,
  order_id:"1",
  latitude:currentLocationOfUser.latitude,
  longitude:currentLocationOfUser.longitude}).then((res)=>{
    console.log("orderSendRequest", res)
  })
  
 }
 const searchProviderNearBy=async (request:string)=>{

  const providerData=  await providerLocationSearch({ name: "Back Pain",
   provider_type_id: "1",
   latitude:currentLocationOfUser?.latitude,
   longitude:currentLocationOfUser?.longitude,
   reqDistance:request}).then((response)=>{
     return response
   })
   console.log("providerData", JSON.stringify(providerData))
  return providerData
 }

  const SearchDoctorLocation=async ()=>{
    let i :number=1;
    let searchData= await searchProviderNearBy(`${'req'}${i}`)
    if(searchData===undefined){
      setShowLoader(true)
    }else{
      setShowLoader(false)
    }
    if(searchData.length!==null){
      setLocalData("USER",{providerLocation:searchData})
      if(i!=1){
        setShowRateAlert(true)
      }else{
      setShowRateAlert(false)
      }
       i=1;
    }else{
      i=i+1;
      setShowRateAlert(true)
      searchData= searchProviderNearBy(`${'req'}${i}`);
    }
  }

  return {
    permissionHelper,
    forceAlert,
    handleNextButtonPress,
    SearchDoctorLocation,
    showRateAlert,
    showLoader
  };
};

export default SearchDoctorController;
