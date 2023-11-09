import { useNavigation } from "@react-navigation/native";
import arrowBack from "assets/icon/arrowBack.png";
import Button from "components/common/Button";
import Text from "components/common/Text";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontFamily } from "designToken/fontFamily";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, DeviceEventEmitter, Image, PermissionsAndroid, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';
import { Location } from "libs/types/UserType";
import SearchDoctorController from "./SearchDoctorController";
import Geocoder from 'react-native-geocoding';
import { getLocalData } from "libs/datastorage/useLocalStorage";
import DoctorDetailCard from "components/client/home/DoctorDetailCard";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { UseClientUserContext } from "contexts/UseClientUserContext";
const SearchDoctor = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [locationPermission, setLocationPermission] = useState(false);
  const localData= getLocalData('USER')
  const {setCurrentLocationOfUser} =UseClientUserContext()
  const [currentLocation, setCurrentLocation] = useState<Location>();
const {permissionHelper, forceAlert, handleNextButtonPress}= SearchDoctorController()
const [locationHistory, setLocationHistory] = useState<any>([]);
const [providerLocation, setProviderLocation]=useState<any>();
const providerLatitude = useRef<number>()
const providerLongnitude = useRef<number>()

//   const [showSummary, setShowSummary] = useState(false);





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
    // console.log("localData?.providerLocation?.latitude", parseFloat(localData?.providerLocation[0]?.longitude))
    let watchId:any
    //  getUser(currentUser);
    async function requestLocationPermission() {
      if (Platform.OS === 'android') {
        try {
          console.log('117 inside grant');
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            permissionHelper,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setLocationPermission(true);
            console.log('granted?', granted);
          } else {
            setLocationPermission(false);
            forceAlert();
            console.log(
              'Location permission denied',
              PermissionsAndroid.RESULTS,
            );
          }
        } catch (err) {
          console.warn(err);
        }
      }
    }
    if (locationPermission === false || undefined) {
      console.log('144 if running?', locationPermission);
      requestLocationPermission();
    } else {
     watchId = Geolocation.watchPosition(
       
       (position) => {
        providerLatitude.current= parseFloat(localData?.providerLocation[0]?.latitude)
        providerLongnitude.current= parseFloat(localData?.providerLocation[0]?.longitude)
       
       console.log("providerLatitude.current", providerLatitude.current)
        // const { latitude, longitude } = position.coords;
          setProviderLocation({latitude: localData?.providerLocation?parseFloat(localData?.providerLocation[0]?.latitude):position.coords.latitude, longitude:localData?.providerLocation? parseFloat(localData?.providerLocation[0]?.longitude):position.coords.longitude})

          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
            timestamp: position.timestamp,
          });
          setCurrentLocationOfUser({ latitude: position.coords.latitude.toString(),longitude: position.coords.longitude.toString()})
          setLocationHistory((prevLocationHistory) => [
            ...prevLocationHistory,
            { latitude: position.coords.latitude, longitude:position.coords.longitude },
          ]);
        },
      );
     
     
    }
    return () => {
      // Stop tracking when the component unmounts
      Geolocation.clearWatch(watchId);
    };
  }, [locationPermission]);


  useEffect(()=>{
    DeviceEventEmitter.addListener('DoctorNotification',(event)=>{
      console.log("DoctorNotificationEvent", event)
      if(event.title==='Accepted your request'||event.title==='Update Location' ){
        Alert.alert("Data")
      providerLatitude.current= parseFloat(event.latitude)
      providerLongnitude.current= parseFloat(event.longitude)
      console.log("providerLatitude.currentINsideEven", providerLatitude.current)
      setProviderLocation({latitude: parseFloat(event.latitude), longitude: parseFloat(event.longitude)})}
    })
return ()=>{
  DeviceEventEmitter.removeAllListeners('DoctorNotification')
}
  },[])
  
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.lookingDoctor} title={t("Looking for a doctor")} />
      <View style={styles.mapContainer}>
      {providerLocation &&<MapView
       provider={PROVIDER_GOOGLE}
       showsUserLocation
       followsUserLocation
       loadingEnabled={!providerLocation}
    region={currentLocation}
     
  style={{flex:1}}
> 

 {/* TODO: Show marker for the destination or before show provider location before it start move    */}
{providerLatitude.current &&providerLongnitude.current&& (
  
            <Marker
              coordinate={{
                latitude: providerLatitude.current,
                longitude:providerLongnitude.current,
              }}
              title="Doctor Location"
            >
              
              </Marker>
          )}
  </MapView>}
{/* {  providerLocation ? <DoctorDetailCard isPrimary={false} showBothCards={false}/>:<DoctorDetailCard isPrimary={true} showBothCards={false}/>} */}
{/* {providerLatitude.current&&<View style={{ zIndex:1, position:'absolute', left:10,paddingHorizontal:getWidth(20)}}><DoctorDetailCard isPrimary={false} showBothCards={false}/></View>} */}
</View>

      <Button
        title={providerLatitude.current?"Order":"Cancel"}
        isPrimary
        isSmall
        
        onPress={handleNextButtonPress}
        width={100}
      />
            <Text style={styles.noFee} title={t("*No fee will be collected")} />

    </View>
  );
};

export default SearchDoctor;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
   
    alignItems:'center'
 
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
    flex: 0.4,
  }, 

  noFee:{
    fontSize: getHeight(fontSize.textS),
    fontFamily:fontFamily.regular,  
  },
  text:{
    fontSize:getWidth(fontSize.textS),
    marginTop:getWidth(4)
  },
  mapContainer:{
    height:getHeight(400),
    width:'100%'
  }
});
