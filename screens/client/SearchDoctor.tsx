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
  ScrollView,
  StyleSheet,
  ToastAndroid,
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
import Loader, { LoaderLarge } from 'components/common/Loader';
import TextButton from 'components/common/TextButton';
import MapViewDirections from 'react-native-maps-directions';
import useUpdateEffect from 'libs/UseUpdateEffect';
import useToast from 'components/common/useToast';
import { RNHeader } from 'components/common/Header';
import NavigationRoutes from 'navigator/NavigationRoutes';

const SearchDoctor = () => {
  const navigation = useNavigation();

  const route = useRoute<any>();
  // const providerData = route?.params?.providerData ?? '';
  // console.log('providerData', providerData);
  // const providerRemainigTime = route?.params?.remaining;
  // const orderId = route?.params?.orderId ?? '';

  //TODO: Vandana why this is used?
  const previousScreen = route?.params?.previousScreen;

  const { t } = useTranslation();
  const { setCurrentLocationOfUser } = UseClientUserContext();
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const {
    handleNextButtonPress,
    showRateAlert,
    calculateTime,
    calculateDistance,
    currentOrder,
    showLoader,
    providerLocation,
    setProviderLocation,
    showTimer,
    providerStatus,
    isBookOrder,
    setIsBookOrder,
  } = SearchDoctorController();

  const { setRemainingTime } = UseClientUserContext();
  const localData = getLocalData('ORDER');
  const [showDoctor, setShowDoctor] = useState(false);

  // const [loader, setLoader] = useState(true);
  const [disabled, setDisable] = useState(false);
  const [showCancelTextButton, setShowCancelTextButton] = useState(true);
  const [showCancelButton, setShowCancelButton] = useState(false);

  const [secondLoader, setSecondLoader] = useState(false);
  const { showToast, renderToast } = useToast();

  const headerLeft = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
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

  // useEffect(() => {
  //   if (stausOfArriving !== 'Arrived') {
  //     getEventUpdate();
  //   }
  // }, []);

  useEffect(() => {
    createNotificationListeners();

    //TODO: Vandana why this is used?
    //NOTE: We need to show provider location which is store in local at else provider is not shown when we coming from HOME
    if (previousScreen === 'HOME_CLIENT') {
      setProviderLocation({
        latitude: parseFloat(localData?.eventData?.latitude ?? 0.0),
        longitude: parseFloat(localData?.eventData?.longitude ?? 0.0),
      });
    }
  }, []);

  const onPressOrder = () => {
    setSecondLoader(true);
    setIsBookOrder(true);
    if (!showCancelButton && !showLoader) {
      handleNextButtonPress();
    } else {
      //TODO : Vandana why we are setting Local data here
      //NOTE: Here we want to empty local data
      //  setLocalData('ORDER', currentOrder);
      navigation.goBack();
    }
    setTimeout(() => {
      setSecondLoader(false);
    }, 10000);
  };

  useUpdateEffect(() => {
    if (secondLoader) {
      setShowCancelTextButton(true);
      setTimeout(() => {
        setShowCancelTextButton(false);
      }, 180000);
    }
  }, [secondLoader]);

  const providerStatusOnHeader = (statusOfArriving: string) => {
    switch (statusOfArriving) {
      case 'Arrived':
        return 'has arrived';
      case 'On the way':
        return 'on the way';
      default:
        return 'is found';
    }
  };

  return (
    <>
      {RNHeader(
        () => null,
        headerLeft,
        () => null,
      )}
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: getHeight(20),
        }}
      >
        {renderToast()}
        <View>
          {showTimer && providerStatus !== 'Arrived' && (
            <ArrivalTime totalTime={Math.round(calculateTime().minutes)} />
          )}
          <Text
            style={styles.lookingDoctor}
            title={
              (providerLocation !== undefined &&
                providerLocation.latitude === 0.0) ||
                showLoader
                ? t('looking_doctor')
                : `${'Doctor'}${' '}${providerStatusOnHeader(providerStatus)}`
            }
          />
        </View>
        <View style={styles.mapContainer}>
          {(providerLocation && providerLocation.latitude === 0.0) ||
            ((showLoader || secondLoader) && <LoaderLarge />)}
          <MapView
            zoomEnabled
            showsTraffic
            focusable
            showsBuildings
            showsIndoors
            initialRegion={providerLocation ? {
              ...providerLocation,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
              title: 'provider',
              timestamp: '',
            } : currentLocation}
            region={providerLocation ? {
              ...providerLocation,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
              title: 'provider',
              timestamp: '',
            } : currentLocation}
            style={{ flex: 1 }}
          >
            {/* {currentLocation !== undefined &&
              currentLocation.latitude !== 0.0 &&
              providerLocation &&
              providerLocation.latitude !== 0.0 &&
              !loader && (
                <MapViewDirections
                  strokeWidth={5}
                  splitWaypoints
                  
                  strokeColor={colors.invalid}
                  geodesic
                  optimizeWaypoints
                  origin={providerLocation}
                  destination={currentLocation}
                  apikey={'AIzaSyDwwnPwWC3jWCPDnwB7tA8yFiDgGjZLo9o'}
                />
              )} */}
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
              !showLoader && (
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
                          {currentOrder &&
                            currentOrder.providerDetails
                              ?.providerProfilePicture ? (
                            <Image
                              source={{
                                uri: currentOrder.providerDetails
                                  ?.providerProfilePicture,
                              }}
                              style={styles.doctorIcon}
                            />
                          ) : (
                            <Image
                              source={require('../../assets/icon/doctorIcon.png')}
                              style={styles.doctorIcon}
                            />
                          )}
                        </View>
                        <View style={styles.textContainer}>
                          <Text
                            style={styles.doctorName}
                            title={`${currentOrder.providerDetails?.providerName}`}
                          />
                          <Text
                            style={styles.doctoraddress}
                            title={`${currentOrder.providerDetails?.providerAddress}`}
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
                onPressCard={() => {
                  setShowDoctor(!showDoctor);
                }}
                isPrimary={showRateAlert}
                showBothCards={showRateAlert && providerLocation != undefined}
                status={providerStatus}
                showProvider={providerLocation != undefined}
                time={calculateTime()}
                providerData={currentOrder.providerDetails}
              />
            </View>
          ) : null}
        </View>

        {providerStatus !== 'Arrived' || !showTimer ? (
          <View>
            <Button
              title={
                providerLocation !== undefined &&
                  providerLocation.latitude !== 0.0 &&
                  !showLoader &&
                  !showCancelButton
                  ? t('order')
                  : t('cancel')
              }
              isPrimary
              isSmall
              onPress={onPressOrder}
              width={'30%'}
              height={getHeight(dimens.imageS)}
              style={{ alignSelf: 'center', marginBottom: 10 }}
              disabled={isBookOrder}
            />
            {showCancelTextButton && !showLoader && (
              <TextButton
                style={{ alignSelf: 'center' }}
                title={t('cancel')}
                onPress={() => { }}
                fontSize={getHeight(fontSize.textXl)}
              />
            )}
            <Text
              style={styles.noFee}
              title={
                (providerLocation !== undefined &&
                  providerLocation.latitude === 0.0) ||
                  showLoader
                  ? t('no_fee_collected')
                  : showCancelTextButton || showCancelButton
                    ? t('3_minutes_to_cancel')
                    : ''
              }
            />
          </View>
        ) : (
          <View style={{ height: getHeight(100) }}>
            {/* <Button
              title={'Next'}
              isPrimary
              isSmall
              onPress={() => {
                navigation.navigate(NavigationRoutes.TreatmentCompleted);
              }}
              width={'30%'}
              height={getHeight(dimens.imageS)}
              style={{ alignSelf: 'center', marginBottom: 10 }}
            /> */}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default SearchDoctor;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
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
    height: getHeight(480),
    width: '100%',
    marginBottom: getHeight(50),
  },
  marker: {
    backgroundColor: colors.offWhite,
    padding: getWidth(dimens.marginS),
    borderRadius: 8,
    flexDirection: 'row',
    width: '66%',
    gap: getHeight(10),
  },
  doctorIcon: {
    width: getWidth(dimens.imageS),
    height: getHeight(dimens.imageS),
    resizeMode: 'cover',
    borderRadius: getHeight(dimens.imageS),
  },
  doctorName: {
    fontSize: getHeight(fontSize.textS),
  },
  doctoraddress: {
    fontSize: getHeight(fontSize.textS),
    width: '50%',
  },
  imageContainer: {
    marginRight: getHeight(dimens.paddingXs),
    alignItems: 'center',
    justifyContent: 'center',
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
    width: getWidth(dimens.marginL + dimens.borderBold),
    height: getWidth(dimens.marginL + dimens.borderBold),
  },
});
