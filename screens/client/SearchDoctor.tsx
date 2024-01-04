import { useNavigation, useRoute } from '@react-navigation/native';
import arrowBack from 'assets/icon/arrowBack.png';
import AddPaymentToWallet from 'components/client/home/AddPaymentToWallet';
import DoctorDetailCard from 'components/client/home/DoctorDetailCard';
import ArrivalTime from 'components/common/ArrivalTime';
import Button from 'components/common/Button';
import { RNHeader } from 'components/common/Header';
import { LoaderLarge } from 'components/common/Loader';
import Text from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import useToast from 'components/common/useToast';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontFamily } from 'designToken/fontFamily';
import { fontSize } from 'designToken/fontSizes';
import { createNotificationListeners } from 'libs/Notification';
import { getHeight, getWidth } from 'libs/StyleHelper';
import useUpdateEffect from 'libs/UseUpdateEffect';
import {
  ARRIVED,
  ESTIMATE_ARRIVAL,
  ON_THE_WAY,
  ORDER_ACCEPTED,
} from 'libs/constants/Constant';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { Location } from 'libs/types/UserType';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  I18nManager,



  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import SearchDoctorController from './SearchDoctorController';
import { calculateTime } from 'libs/utility/Utils';

const SearchDoctor = () => {
  const navigation = useNavigation();

  const route = useRoute<any>();

  //TODO: Vandana why this is used?
  const previousScreen = route?.params?.previousScreen;

  const { t } = useTranslation();
  const { setUserLocation, userProfile, userLocation } = UseClientUserContext();
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const {
    handleNextButtonPress,
    showRateAlert,
    currentOrder,
    showLoader,
    providerLocation,
    setProviderLocation,
    showTimer,
    providerStatus,
    isBookOrder,
    setIsBookOrder,
    showDoctor,
    setShowDoctor,
    focusOnPath,
    showAddToWallet,
    providerNotFound,
    orderCancel,
  } = SearchDoctorController();
  console.log('providerStatus 111', providerStatus);
  const [showCancelTextButton, setShowCancelTextButton] = useState(true);
  const [secondLoader, setSecondLoader] = useState(false);
  const { renderToast } = useToast();

  const headerLeft = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );

  const providerStatusOnHeader = (statusOfArriving: string) => {
    switch (statusOfArriving) {
      case ARRIVED:
        return t('has_arrived');
      case ON_THE_WAY:
        return t('on_way');
      case ORDER_ACCEPTED:
        return t('on_way');
      case ESTIMATE_ARRIVAL:
        return t('found');
      default:
        return null;
    }
  };

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
        // setOrder((prevOrder) => ({
        //   ...prevOrder,
        //   reason: updatedSelectedResourceType,
        // })
        setUserLocation((prevState) => ({
          ...prevState,
          currentLocation: {
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
            address: prevState?.currentLocation?.address,
          },
          onboardingLocation: prevState?.onboardingLocation,
        }));
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

  useEffect(() => {
    console.log('userProfile.address?.latitude', userProfile.address);
    createNotificationListeners();

    // //TODO: Vandana why this is used?
    // //NOTE: We need to show provider location which is store in local at else provider is not shown when we coming from HOME
    // if (previousScreen === 'HOME_CLIENT') {
    //   setProviderLocation({
    //     latitude: parseFloat(localData?.eventData?.latitude ?? 0.0),
    //     longitude: parseFloat(localData?.eventData?.longitude ?? 0.0),
    //   });
    // }
  }, []);

  const onPressOrder = () => {
    setSecondLoader(true);
    setIsBookOrder(true);
    if (!showLoader) {
      handleNextButtonPress();
    } else {
      setLocalData('ORDER', {
        orderId: ''
      })
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
          {showTimer && providerStatus !== ARRIVED && (
            <ArrivalTime totalTime={Math.round(calculateTime(route?.params?.currentOrder).minutes)} />
          )}
          <Text
            style={styles.lookingDoctor}
            title={
              (providerLocation !== undefined &&
                providerLocation.latitude === 0.0) ||
                showLoader
                ? t('looking_doctor')
                : providerNotFound
                  ? t('provider_not_found')
                  : `${t('provider_text')}${' '}${providerStatusOnHeader(
                    providerStatus,
                  )}`
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
            region={
              providerLocation
                ? focusOnPath
                : userLocation.onboardingLocation &&
                  userLocation.onboardingLocation?.latitude &&
                  userLocation.onboardingLocation?.longitude
                  ? {
                    latitude: parseFloat(
                      userLocation.onboardingLocation?.latitude,
                    ),
                    longitude: parseFloat(
                      userLocation.onboardingLocation?.longitude,
                    ),
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                    title: 'Client',
                  }
                  : currentLocation
            }
            style={{ flex: 1 }}
          >
            {userProfile && userProfile?.address && (
              <Marker
                coordinate={{
                  latitude:
                    userLocation &&
                      userLocation?.onboardingLocation &&
                      userLocation.onboardingLocation?.latitude
                      ? parseFloat(userLocation.onboardingLocation?.latitude)
                      : currentLocation?.latitude ?? 0.0,
                  longitude:
                    userLocation &&
                      userLocation?.onboardingLocation &&
                      userLocation.onboardingLocation?.longitude
                      ? parseFloat(userLocation.onboardingLocation?.longitude)
                      : currentLocation?.longitude ?? 0.0,
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
                            numberOfLines={2}
                          />
                          <Text
                            style={styles.doctoraddress}
                            title={`${currentOrder.providerDetails?.providerAddress}`}
                            numberOfLines={2}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                </Marker>
              )}
            {/* {currentLocation !== undefined &&
              userLocation.onboardingLocation && userLocation.onboardingLocation?.latitude && userLocation.onboardingLocation?.longitude &&
              providerLocation &&
              providerLocation.latitude !== 0.0 &&
              !showLoader && (
                <MapViewDirections
                  strokeWidth={5}


                  strokeColor={colors.invalid}
                  geodesic
                  optimizeWaypoints
                  origin={providerLocation}
                  destination={{ latitude: parseFloat(userLocation.onboardingLocation?.latitude), longitude: parseFloat(userLocation.onboardingLocation?.longitude) }}
                  apikey={'AIzaSyDwwnPwWC3jWCPDnwB7tA8yFiDgGjZLo9o'}
                />
              )} */}
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
                status={`${t('provider_text')}${' '}${providerStatusOnHeader(
                  providerStatus,
                )}`}
                showProvider={providerLocation != undefined}
                time={calculateTime(route?.params?.currentOrder)}
                providerData={currentOrder.providerDetails}
              />
            </View>
          ) : null}
        </View>

        {providerStatus !== ARRIVED && (
          <View>
            <Button
              title={
                providerLocation !== undefined &&
                  providerLocation.latitude !== 0.0 &&
                  !showLoader
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
            {!showLoader && (

              <>
                <TextButton
                  style={{ alignSelf: 'center' }}
                  title={t('cancel')}
                  onPress={() => { orderCancel() }}
                  fontSize={getHeight(fontSize.textXl)}
                />
              </>
            )}
            <Text
              style={styles.noFee}
              title={
                (providerLocation !== undefined &&
                  providerLocation.latitude === 0.0) ||
                  showLoader
                  ? t('no_fee_collected')
                  : showCancelTextButton
                    ? t('3_minutes_to_cancel')
                    : ''
              }
            />
          </View>
        )}
        {
          showAddToWallet && <AddPaymentToWallet isShowInputView={false} fromMap={true} />
        }
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
    transform: [{ rotate: I18nManager.isRTL ? '180deg' : '0deg' }],
  },
  header: {
    backgroundColor: colors.white,
  },
  lookingDoctor: {
    fontSize: getHeight(20),
    fontFamily: fontFamily.semiBold,
    marginBottom: getHeight(dimens.marginM),
  },
  noFee: {
    marginVertical: getHeight(dimens.borderBold),
    fontSize: getHeight(fontSize.textM),
    fontFamily: fontFamily.light,
  },
  text: {
    fontSize: getHeight(fontSize.textS),
    marginTop: getWidth(4),
  },
  mapContainer: {
    height: getHeight(500),
    width: '100%',
    marginBottom: getHeight(50),
  },
  marker: {
    backgroundColor: colors.offWhite,
    padding: getWidth(dimens.marginS),
    borderRadius: 8,
    flexDirection: 'row',
    width: '90%',
    gap: getHeight(10),
  },
  doctorIcon: {
    width: getHeight(dimens.imageS),
    height: getHeight(dimens.imageS),
    resizeMode: 'center',
    borderRadius: getHeight(dimens.imageS),
  },
  doctorName: {
    fontSize: getHeight(fontSize.textS),
    width: '100%',
  },
  doctoraddress: {
    fontSize: getHeight(fontSize.textS),
    width: '100%',
    flexWrap: 'wrap',
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
    width: '70%',
    maxWidth: '70%',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column-reverse',
    maxWidth: '90%',
  },
  locationMarker: {
    width: getWidth(dimens.marginL + dimens.borderBold),
    height: getWidth(dimens.marginL + dimens.borderBold),
  },
});
