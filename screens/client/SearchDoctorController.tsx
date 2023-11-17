import { Alert, Linking } from "react-native";
import {ClientOrderServices} from "libs/ClientOrderServices"
import { getLocalData, setLocalData } from "libs/datastorage/useLocalStorage";
import { UseClientUserContext } from "contexts/UseClientUserContext";
import { useState } from "react";


const SearchDoctorController = () => {
  const {BookOrderRequest, providerLocationSearch} =ClientOrderServices()
  const localData= getLocalData('USER')
  const {userId, currentLocationOfUser} =UseClientUserContext()
  const [showRateAlert, setShowRateAlert] =useState(false)
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
  Alert.alert('', userId.toString())
  console.log("localData?.providerLocation[0]?.provider_id", localData?.providerLocation[0]?.provider_id)
  // Alert.alert("localData?.providerLocation[0]?.provider_id", localData?.providerLocation[0]?.provider_id)
  BookOrderRequest({ provider_id:localData?.providerLocation[0]?.provider_id,
  order_id:"1",
  latitude:currentLocationOfUser.latitude,
  longitude:currentLocationOfUser.longitude}).then((res)=>{
    console.log("orderSendRequest", res)
  })
  
 }
 const searchProviderNearBy=async (request:string)=>{

  console.log("currentLocationOfUser?.longitudecurrentLocationOfUser?.longitude",currentLocationOfUser?.latitude, currentLocationOfUser?.longitude,  )
  const providerData=  await providerLocationSearch({ name: "Back Pain",
   provider_type_id: "1",
   latitude:currentLocationOfUser?.latitude,
   longitude:currentLocationOfUser?.longitude,
   reqDistance:request}).then((response)=>{
     return response
   })
  return providerData
 }

  const SearchDoctorLocation=async ()=>{
    let i :number=1;
    let searchData= await searchProviderNearBy(`${'req'}${i}`)

    console.log("searchData...", JSON.stringify(searchData), i)
    if(searchData!=null){
      setLocalData("USER",{providerLocation:searchData})
      if(i!=1){
        setShowRateAlert(true)
      }else{
      setShowRateAlert(false)
      }
       i=1;
    }else{
      i=i+1;
      console.log("dataWhenNotFind")
      setShowRateAlert(true)
      searchData= searchProviderNearBy(`${'req'}${i}`);
    }
  }

  return {
    permissionHelper,
    forceAlert,
    handleNextButtonPress,
    SearchDoctorLocation,
    showRateAlert
  };
};

export default SearchDoctorController;
