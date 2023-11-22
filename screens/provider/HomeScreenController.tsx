import { UseClientUserContext } from "contexts/UseClientUserContext";
import { UseProviderUserContext } from "contexts/UseProviderUserContext";
import { AuthServicesProvider } from "libs/authsevices/AuthServiceProvider";
import { getLocalData } from "libs/datastorage/useLocalStorage";
import { useState } from "react";
import { Alert } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { cleanSingle } from "react-native-image-crop-picker";

const HomeScreenControlller=()=>{
    const [acceptOrder, setAcceptOrder] =useState(false)
    const { userId }=UseProviderUserContext()
    const { currentLocationOfUser} =UseClientUserContext()
    const order= getLocalData('ORDER')
    const { OrderRequst, UpdateProviderLocation } = AuthServicesProvider();
    const updateLocation=()=>{
console.log('updateDtaaApiFunction')

        Geolocation.watchPosition(
            (position) => {
                Alert.alert('dataUpdate')
              const { latitude, longitude } = position.coords;
              UpdateProviderLocation({provider_id:userId,
                order_id:order?.eventData?.orderId,
               latitude:position.coords.latitude.toString(),
               longitude:position.coords.longitude.toString()}).then((res)=>{
                })              // setLocation({ latitude, longitude });
            },
            (error) => {
              console.log('Error getting location: ' + error.message);
            },
            {
              enableHighAccuracy: true,
            },
          );
    
    }
    console.log('order?.eventData?.providerId',order?.eventData?.providerId)
    console.log('order?.eventData?.orderId',order?.eventData?.orderId)
const OnPressTakeOrder=()=>{
        setAcceptOrder(true)
        // Geolocation.watchPosition(
        //     (position) => {
                OrderRequst({ status:"accept",
                provider_id:order?.eventData?.providerId,
                order_id: order?.eventData?.orderId,
                latitude:currentLocationOfUser.latitude.toString(),
                longitude:currentLocationOfUser.longitude.toString()}).then((res)=>{
                    // console.log("res", res)
                    Alert.alert("ordereAccepted", res?.status)
                }) 
            //  }, );
   
 }  
 return {
    OnPressTakeOrder,
    acceptOrder,
    updateLocation
    }
}

export default HomeScreenControlller