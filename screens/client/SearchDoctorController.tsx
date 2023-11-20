import { Alert, Linking } from "react-native";
import {ClientOrderServices} from "libs/ClientOrderServices"
import { getLocalData, setLocalData } from "libs/datastorage/useLocalStorage";
import { UseClientUserContext } from "contexts/UseClientUserContext";
import { useState } from "react";
import haversine from "haversine";

const SearchDoctorController = () => {
  const {BookOrderRequest, providerLocationSearch} =ClientOrderServices()
  const localData= getLocalData('USER')
  const {currentLocationOfUser} =UseClientUserContext()
  const [showRateAlert, setShowRateAlert] =useState(false)
  const [showLoader, setShowLoader]=useState(true)
  const [disabled, setDisable]= useState(false)
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
  setDisable(true)
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

 const calculateDistance =()=>{
  const userCurrentLocation ={latitude: parseFloat(currentLocationOfUser?.latitude), longitude:parseFloat(currentLocationOfUser?.longitude)}
  const ProviderLocation ={latitude: parseFloat(localData?.providerLocation?.latitude), longitude:parseFloat(localData?.providerLocation?.longitude)}
   const distance= haversine(ProviderLocation,userCurrentLocation ,{unit:'km'})
   console.log("Distance...",distance)
   return distance
 }

 const calculateTime=()=>{
   const DISTANCE= calculateDistance()
   const AVERAGE_SPEED= 40
   const TIME =DISTANCE / AVERAGE_SPEED
   const travelTimeInMinutes = TIME * 60;
   const travelTimeInHours = Math.floor(TIME / 60);
   const remainingMinutes = Math.round(TIME % 60);
   const travelTimeInSeconds = TIME * 3600;
   const time= {hour:travelTimeInHours, minutes:travelTimeInMinutes, seconds:TIME, remainig: remainingMinutes}
   console.log("TIME..Minuyes", time )
  return  time 
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
      console.log('searchData*****',searchData)
      calculateDistance()
      calculateTime()
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
    calculateDistance,
    calculateTime,
    showLoader,
    disabled
  };
};

export default SearchDoctorController;
