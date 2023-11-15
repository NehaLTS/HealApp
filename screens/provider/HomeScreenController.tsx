import { AuthServicesProvider } from "libs/authsevices/AuthServiceProvider";
import { useState } from "react";
import Geolocation from 'react-native-geolocation-service';

const HomeScreenControlller=()=>{
    const [acceptOrder, setAcceptOrder] =useState(false)

    const { OrderRequst, UpdateProviderLocation } = AuthServicesProvider();
    const updateLocation=()=>{
        Geolocation.watchPosition(
        (position) => {
         UpdateProviderLocation({provider_id:'1',
         order_id:'1',
        latitude:position.coords.latitude.toString(),
        longitude:position.coords.longitude.toString()}).then((res)=>{
         })}, );
    }
    const OnPressTakeOrder=()=>{
        setAcceptOrder(true)
        OrderRequst({ status:"accept",
        provider_id:'1',
        order_id: '1',
        latitude:"30.37775529243538",
        longitude:"76.77481109532673"}).then((res)=>{console.log("ordereAccepted", res)}) 
 }  
 return {
    OnPressTakeOrder,
    acceptOrder,
    updateLocation
    }
}

export default HomeScreenControlller