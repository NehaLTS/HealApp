import { useNavigation } from "@react-navigation/native";
import Button from "components/common/Button";
import Text from "components/common/Text";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontFamily } from "designToken/fontFamily";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, PermissionsAndroid, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';
import { Location } from "libs/types/UserType";
import SearchDoctorController from "screens/client/SearchDoctorController";
// import SearchDoctorController from "screens/client/SearchDoctorController";
// import SearchDoctorController from "screens/client/SearchDoctorController";

const LocationTracking = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [locationPermission, setLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location>();
const {permissionHelper, forceAlert}= SearchDoctorController()
const [locationHistory, setLocationHistory] = useState<any>([]);
//   const [showSummary, setShowSummary] = useState(false);

  const handleNextButtonPress = () => {
    // setShowSummary(!showSummary);
  };

  

  
  useEffect(() => {
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
          // const { latitude, longitude } = position.coords;
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
            timestamp: position.timestamp,
          });
          setLocationHistory((prevLocationHistory) => [
            ...prevLocationHistory,
            { latitude: position.coords.latitude, longitude:position.coords.longitude },
          ]);
        },
      );
      // Geolocation.getCurrentPosition((position)=>{
      //   // Geocoder.from(position.coords.latitude, position.coords.longitude)
       
      //   setCurrentLocation({
      //           latitude: position.coords.latitude,
      //           longitude: position.coords.longitude,
      //           latitudeDelta: 0.0022,
      //           longitudeDelta: 0.0021,
      //           timestamp: position.timestamp,
      //         });

      // })
     
     
    }
    return () => {
      // Stop tracking when the component unmounts
      Geolocation.clearWatch(watchId);
    };
  }, [locationPermission]);
  
  return (
   <View style={{flex:1}}>
      <MapView
       provider={PROVIDER_GOOGLE}
       showsUserLocation
       followsUserLocation
       loadingEnabled

    region={currentLocation}
     
  style={{flex:1}}
> 
<Polyline
            coordinates={locationHistory}
            strokeColor="#006"
            strokeWidth={3}
          />
 {/* TODO: Show marker for the destination or before show provider location before it start move    */}
{currentLocation && (
  
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}
  </MapView>
  </View>

  );
};

export default LocationTracking;

const styles = StyleSheet.create({

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
