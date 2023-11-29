import { useNavigation, useRoute } from '@react-navigation/native';
import arrowBack from 'assets/icon/arrowBack.png';
import Button from 'components/common/Button';
import Text from 'components/common/Text';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  DeviceEventEmitter,
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import DoctorDetailCard from 'components/client/home/DoctorDetailCard';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { createNotificationListeners } from 'libs/Notification';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { Location } from 'libs/types/UserType';
import Geolocation from 'react-native-geolocation-service';
import SearchDoctorController from './SearchDoctorController';
import ArrivalTime from 'components/common/ArrivalTime';
import { LoaderLarge } from 'components/common/Loader';
import TextButton from 'components/common/TextButton';
import MapViewDirections from 'react-native-maps-directions';

const SearchDoctor = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const providerData = route?.params?.providerData ?? '';
  const providerRemainigTime = route?.params?.remaining;
  const orderId=route?.params?.orderId ?? '';
 const  previousScreen=route?.params?.previousScreen
  const { t } = useTranslation();
  const { setCurrentLocationOfUser } = UseClientUserContext();
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const { handleNextButtonPress, showRateAlert, calculateTime } =
    SearchDoctorController();
  const [providerLocation, setProviderLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const { providerStatus, setProviderStatus, setRemainingTime } = UseClientUserContext();
  const localData = getLocalData('ORDER');
  const [showDoctor, setShowDoctor] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [loader, setLoader] = useState(true);
  const [disabled, setDisable]= useState(false)
  const [showCancelButon, setShowCancelButon] = useState(false);
  const [stausOfArriving, setStausOfArriving] =
    useState<string>(previousScreen!=='HOME_CLIENT'?'Estimated arrival':providerStatus);
  const [secondLoader, setSecondLoader] = useState(false);
 
  

 

  useLayoutEffect(() => {
    console.log('ankita', providerData, localData?.providerDetail);
    navigation.setOptions({
      headerTitleAlign: 'center',
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
    let watchId: any;

    const LATITUDE_DELTA = 0.02;
    watchId = Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA, // Adjust this value for desired zoom level
          longitudeDelta: LATITUDE_DELTA,
          timestamp: position.timestamp,
        });
        setCurrentLocationOfUser({
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
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

  const getEventUpdate = () => {
    DeviceEventEmitter.addListener('DoctorNotification', (event) => {
      setShowCancelButon(true);
console.log('DoctorNotification', JSON.stringify(event))
      if (event.notification.title === "Accept Order") {
        setLocalData('ORDER', { providerDetail:providerData, orderId:orderId})
        setShowTimer(true);
        setDisable(true)
        setStausOfArriving('On the way');
        setProviderStatus('On the way');
      }
      if (event.notification.title === "Arrived") {
        setStausOfArriving('Arrived');
        setProviderStatus('arrived')
        setLocalData('ORDER', { providerDetail:''})
        setTimeout(() => {
          setProviderStatus('Estimated arrival')    
            }, 10000);
      }

      setTimeout(() => {
        setShowCancelButon(false);
      }, 300000);
      setProviderLocation({
        latitude: parseFloat(event.data.latitude),
        longitude: parseFloat(event.data.longitude),
      });
    });
  };
  useEffect(() => {
      getEventUpdate();
  }, []);

  useEffect(() => {
    createNotificationListeners();
    if(previousScreen==='HOME_CLIENT'){
      setProviderLocation({
        latitude: parseFloat(localData?.eventData?.latitude ?? 0.0),
        longitude: parseFloat(localData?.eventData?.longitude ?? 0.0),
      });
   
  }else{
    setProviderLocation({
      latitude: parseFloat(providerData?.latitude ?? 0.0),
      longitude: parseFloat(providerData?.longitude ?? 0.0),
    });
  }
  }, []);

  setTimeout(() => {
    setLoader(false);
    setSecondLoader(false);
  }, 20000);

 setTimeout(() => {
    setSecondLoader(false);
  }, 10000);
  const onPressOrder = () => {
    setSecondLoader(true);
    setShowCancelButon(true);
    setTimeout(() => {
      setShowCancelButon(false);
    }, 300000);
    handleNextButtonPress();
  };



  return (
    <View style={styles.mainContainer}>
      <View>
        {showTimer && (
          <ArrivalTime
            totalTime={
              Math.round(calculateTime().minutes)
            }
          />
        )}
        <Text
          style={styles.lookingDoctor}
          title={
            (providerLocation !== undefined &&
              providerLocation.latitude === 0.0) ||
            loader
              ? t('looking_doctor')
              : stausOfArriving === 'Arrived'
              ? t('doctor_arrived')
              : t('doctor_found')
          }
        />
      </View>
      <View style={styles.mapContainer}>
        {(providerLocation && providerLocation.latitude === 0.0) ||
          ((loader || secondLoader) && <LoaderLarge />)}
        <MapView
          provider={PROVIDER_GOOGLE}
          zoomEnabled
          showsTraffic
          focusable
          showsBuildings
          initialRegion={currentLocation}
          region={currentLocation}
          style={{ flex: 1 }}
        >
          {/* {currentLocation!==undefined&&currentLocation.latitude!==0.0&&<MapViewDirections
    origin={providerLocation}
    destination={currentLocation}
    apikey={"AIzaSyDBdv2QXiVFswU6vKCkuwJfSZ1iJobbTVk"}
  />} */}
          {currentLocation !== undefined &&
            currentLocation.latitude !== 0.0 && (
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                pinColor={colors.primary}
                title="Your Location"
              ></Marker>
            )}
          {providerLocation !== undefined &&
            providerLocation.latitude !== 0.0 &&
            !loader && (
              <Marker
                coordinate={{
                  latitude: providerLocation.latitude,
                  longitude: providerLocation.longitude,
                }}
                onPress={() => {
                  setShowDoctor(!showDoctor);
                }}
              >
                <View style={styles.markerContainer}>
                  <Image
                    source={require('../../assets/icon/LocationMarker.png')}
                    resizeMode="contain"
                    style={styles.locationMarker}
                  />
                  {!showDoctor && (
                    <View style={styles.marker}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={require('../../assets/icon/doctorIcon.png')}
                          style={styles.doctorIcon}
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <Text
                          style={styles.doctorName}
                          title={`${providerData?.firstname}`}
                        />
                        <Text
                          style={styles.doctorName}
                          title={`${providerData?.name}`}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </Marker>
            )}
        </MapView>

        {showDoctor &&
        providerLocation !== undefined &&
        providerLocation.latitude !== 0.0 ? (
          <View
            style={{
              zIndex: 2,
              position: 'absolute',
              left: 10,
              paddingHorizontal: getWidth(20),
              bottom: getHeight(50),
            }}
          >
            <DoctorDetailCard
              isPrimary={showRateAlert}
              showBothCards={showRateAlert && providerLocation != undefined}
              status={stausOfArriving}
              showProvider={providerLocation != undefined}
              time={calculateTime()}
              providerData={providerData}
            />
          </View>
        ) : null}
      </View>
      <View>
        <Button
          title={
            providerLocation !== undefined &&
            providerLocation.latitude !== 0.0 &&
            !loader
              ? t('order')
              : t('cancel')
          }
          isPrimary
          isSmall
          disabled={disabled|| previousScreen==='HOME_CLIENT' }
          onPress={onPressOrder}
          width={'30%'}
          height={getHeight(dimens.imageS)}
          style={{ alignSelf: 'center', marginBottom: 10 }}
        />
        {showCancelButon && (
          <TextButton
            style={{ alignSelf: 'center', fontSize: fontSize.textXl }}
            title={t('cancel')}
            onPress={() => {}}
          />
        )}
        <Text
          style={styles.noFee}
          title={
            (providerLocation !== undefined &&
              providerLocation.latitude === 0.0) ||
            loader
              ? t('no_fee_collected')
              : showCancelButon
              ? t('3_minutes_to_cancel')
              : ''
          }
        />
      </View>
    </View>
  );
};

export default SearchDoctor;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
  },
  header: {
    backgroundColor: colors.white,
  },
  lookingDoctor: {
    fontSize: getWidth(20),
    fontFamily: fontFamily.semiBold,
    marginBottom: getHeight(dimens.marginM),
  },
  noFee: {
    marginVertical: getHeight(dimens.borderBold),
    fontSize: getHeight(fontSize.textM),
    fontFamily: fontFamily.light,
  },
  text: {
    fontSize: getWidth(fontSize.textS),
    marginTop: getWidth(4),
  },
  mapContainer: {
    height: getHeight(420),
    width: '100%',
    marginBottom: getHeight(30),
  },
  marker: {
    backgroundColor: '#F9FDFF',
    padding: getWidth(dimens.marginS),
    borderRadius: 8,
    flexDirection: 'row',
  },
  doctorIcon: {
    width: getWidth(dimens.imageXs),
    height: getHeight(dimens.imageXs),
    resizeMode: 'cover',
    borderRadius: 40,
  },
  doctorName: {
    fontSize: getHeight(fontSize.textS),
  },
  imageContainer: {
    marginRight: getHeight(dimens.paddingXs),
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column-reverse',
  },
  locationMarker: {
    width: getWidth(32),
    height: getWidth(32),
  },
});
