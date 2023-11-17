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
import { Loader } from "components/common/Loader";
import ArrivalTime from "components/common/ArrivalTime";

const SearchDoctor = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [locationPermission, setLocationPermission] = useState(false);
  const localData= getLocalData('USER')
  const {setCurrentLocationOfUser} =UseClientUserContext()
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const {permissionHelper, forceAlert, handleNextButtonPress, showRateAlert, SearchDoctorLocation}= SearchDoctorController()
  const [providerLocation, setProviderLocation]=useState<{latitude:number, longitude:number}>();
const [showDoctor,setShowDoctor]= useState(false)
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
      
          setProviderLocation({latitude: localData?.providerLocation?parseFloat(localData?.providerLocation?.latitude):position.coords.latitude, longitude:localData?.providerLocation? parseFloat(localData?.providerLocation?.longitude):position.coords.longitude})
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
            timestamp: position.timestamp,
          });
          setCurrentLocationOfUser({ latitude: position.coords.latitude.toString(),longitude: position.coords.longitude.toString()})
        },
      );
    }
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [locationPermission]);

  useEffect(()=>{
    createNotificationListeners()
    SearchDoctorLocation()
    setProviderLocation({latitude: localData?.providerLocation?parseFloat(localData?.providerLocation?.latitude):0.0, longitude:localData?.providerLocation? parseFloat(localData?.providerLocation?.longitude):0.0})

    console.log("localData..",localData, providerLocation)
    DeviceEventEmitter.addListener('DoctorNotification',(event)=>{
      console.log("DoctorNotificationEvent", event)
      setProviderLocation({latitude: parseFloat(event.latitude), longitude: parseFloat(event.longitude)})}
    )
return DeviceEventEmitter.removeAllListeners('DoctorNotification')
  },[])
  
  return (
    <View style={styles.mainContainer}>
     {localData&& providerLocation!==undefined &&<ArrivalTime totalTime={60}/>}
      <Text style={styles.lookingDoctor} title={t("Looking for a doctor")} />
      
      <View style={styles.mapContainer}>
      {providerLocation===undefined &&
      <Loader style={{zIndex:1,position:'absolute', alignSelf:'center',bottom:getHeight(30), top:getHeight(30)}}/>
      }
       <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsScale
        followsUserLocation
      tintColor={colors.disabled}
        zoomEnabled
        zoomTapEnabled
        showsTraffic
        showsBuildings
        region={currentLocation} 
        style={{flex:1}}> 
        
          {providerLocation!=undefined&& ( 
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
           
           { showDoctor ?<View style={{ zIndex:2, position:'absolute', left:10,paddingHorizontal:getWidth(20)}}>
              <DoctorDetailCard isPrimary={showRateAlert} showBothCards={showRateAlert&&providerLocation!=undefined} showProvider={providerLocation!=undefined}/>
              </View>:null}
      </View>
        <Button
        title={providerLocation!=undefined?"Order":"Cancel"}
        isPrimary
        isSmall
        onPress={handleNextButtonPress}
        width={100}/>
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
