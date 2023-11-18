import { useNavigation } from "@react-navigation/native";
import arrowBack from "assets/icon/arrowBack.png";
import Button from "components/common/Button";
import Text from "components/common/Text";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontFamily } from "designToken/fontFamily";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, DeviceEventEmitter, Image, PermissionsAndroid, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import DoctorDetailCard from "components/client/home/DoctorDetailCard";
import { UseClientUserContext } from "contexts/UseClientUserContext";
import { createNotificationListeners } from "libs/Notification";
import { getLocalData } from "libs/datastorage/useLocalStorage";
import { Location } from "libs/types/UserType";
import Geolocation from 'react-native-geolocation-service';
import SearchDoctorController from "./SearchDoctorController";
import ArrivalTime from "components/common/ArrivalTime";
import Loader from "components/common/Loader";

const SearchDoctor = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const localData= getLocalData('USER')
  const {setCurrentLocationOfUser} =UseClientUserContext()
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const {handleNextButtonPress, showRateAlert, showLoader}= SearchDoctorController()
  const [providerLocation, setProviderLocation]=useState<{latitude:number, longitude:number}>();
  const [showDoctor,setShowDoctor]= useState(false)
  const [showTimer, setShowTimer]=useState(false)
  const [loader, setLoader]= useState(true)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowBack} style={styles.arrowBack} />
        </TouchableOpacity>
      ),
      headerStyle: styles.header,
      headerRight: null,
    });
  }, [navigation]);
  
  useEffect(() => {
    let watchId:any
     watchId = Geolocation.watchPosition(
       (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
            timestamp: position.timestamp,
          },
          );
          setCurrentLocationOfUser({ latitude: position.coords.latitude.toString(),longitude: position.coords.longitude.toString()})
        },
        (error) => {
          console.log('Error getting location: ' + error.message);
        },
        {
          enableHighAccuracy: true,
        },
      );
    
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(()=>{
    DeviceEventEmitter.addListener('DoctorNotification',(event)=>{
      setProviderLocation({latitude: parseFloat(event.latitude), longitude: parseFloat(event.longitude)})}
    )
  return DeviceEventEmitter.removeAllListeners('DoctorNotification')
  },[])
  useEffect(()=>{
    createNotificationListeners()
    setTimeout(()=>{
      setShowTimer(true)
          }, 10000)
    setProviderLocation({latitude: parseFloat(localData?.providerLocation?.latitude??0.0), longitude: parseFloat(localData?.providerLocation?.longitude??0.0)})
  },[])

  setTimeout(()=>{
    setLoader(false)
   }, 10000)

  return (
    <View style={styles.mainContainer}>
      <View >
     {localData&& providerLocation!==undefined &&providerLocation.latitude!==0.0&&showTimer&&<ArrivalTime totalTime={60}/>}
      <Text style={styles.lookingDoctor} title={providerLocation!==undefined &&providerLocation.latitude===0.0?t("Looking for a doctor"):("Doctor is found!")} />
      </View>
      <View style={styles.mapContainer}>
      {providerLocation!==undefined&&showLoader&& loader&&<Loader/>}
       <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        zoomEnabled
        zoomTapEnabled
        showsTraffic
        focusable
        showsBuildings
        initialRegion={currentLocation}
        region={currentLocation} 
        style={{flex:1}}> 
        
          { providerLocation!==undefined&&providerLocation.latitude!==0.0&& ( 
            <Marker
              coordinate={{
                latitude: providerLocation.latitude,
                longitude:providerLocation.longitude,
              }}
              
              onPress={()=>{
                setShowDoctor(!showDoctor)
              }}
              
              title="Doctor Location">
              </Marker>)} 
            </MapView>
           
          {providerLocation!==undefined && providerLocation.latitude!==0.0? <View style={{ zIndex:2, position:'absolute', left:10,paddingHorizontal:getWidth(20), bottom:getHeight(50)}}>
              <DoctorDetailCard isPrimary={showRateAlert} showBothCards={showRateAlert&&providerLocation!=undefined} showProvider={providerLocation!=undefined}/>
              </View>:null}
      </View>
      <View >
        <Button
        title={providerLocation!=undefined?"Order":"Cancel"}
        isPrimary
        isSmall
        onPress={()=>{ handleNextButtonPress}}
        width={100}/>
         <Text style={styles.noFee} title={t("*No fee will be collected")} />
         </View>
    </View>
  );
};

export default SearchDoctor;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: "center",
  },
  header: {
    backgroundColor: colors.white,
  },
  lookingDoctor: {
    fontSize: getHeight(20),
    fontFamily:fontFamily.semiBold,
  }, 
  noFee:{
    marginVertical:getHeight(5),
    fontSize: getHeight(fontSize.textS),
    fontFamily:fontFamily.regular,  
  },
  text:{
    fontSize:getWidth(fontSize.textS),
    marginTop:getWidth(4)
  },
  mapContainer:{
    height:getHeight(420),
    width:'100%',
    marginBottom:getHeight(30)
  }
});
