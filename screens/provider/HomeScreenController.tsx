import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import {
  deleteLocalData,
  getLocalData,
  setLocalData,
} from 'libs/datastorage/useLocalStorage';
import {
  Location,
  ProviderProfile,
  ProviderServices,
} from 'libs/types/UserType';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import * as Sentry from '@sentry/react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { ProviderHomeDetails } from 'libs/types/ProvierTypes';
import React from 'react';

const HomeScreenControlller = () => {
  const order = getLocalData('PROVIDERORDER');
  const navigation = useNavigation<any>();
  const [servicesFromApi, setServicesFromAPi] = useState<ProviderServices[]>(
    [],
  );
  const { GetProviderProfiles } = AuthServicesProvider();

  const [acceptOrder, setAcceptOrder] = useState(
    order?.extraData?.orderAccepted ?? false,
  );
  const {
    userId,
    providerProfile,
    token,
    setProviderProfile,
    setProviderServices,
  } = UseProviderUserContext();
  const { userLocation } = UseClientUserContext();
  const [providerDaySummary, setProviderDaySummary] =
    useState<ProviderHomeDetails>();
  const [showSidebar, setShowSidebar] = useState(false);


  React.useMemo(async () => {
    const res = await GetProviderProfiles(userId);
    console.log('gurepreet', res);
    if (res?.firstname) {
      const response = res;
      setProviderServices(response?.modifiedServices);
      setProviderProfile({
        ...providerProfile,
        profilePicture: response?.profile_picture,
      });
      setLocalData('PROVIDERSERVICES', response?.modifiedServices);
      setLocalData('USERPROFILE', {
        profilePicture: response?.profile_picture,
        // firstName: response?.firstname,
        // lastName: response?.lastname,
      } as ProviderProfile);
    }
  }, []);

  const {
    OrderRequst,
    UpdateProviderLocation,
    providerAvailabilityStatus,
    TreatementEnded,
    getProviderDaySummary,
    onGetProviderService,
  } = AuthServicesProvider();

  const sendFCMMessage = async () => {
    const url =
      'https://fcm.googleapis.com/v1/projects/heal-app-ccd03/messages:send';

    const headers = {
      Authorization: `Bearer AAAAxH2Mm_o:APA91bExnW_nsCdGtMb0PM6fQTkzp8P0iHqStuTL7ex-qjRg1CYHV2DEJA5Rud4jPTqMps0t6SoXpnNtoQro4wHI6Y7HezkB6iSMfOU7ARDKbu2ZM3-1tBN0Vy1K78IVKv-e9Fvq32ul`,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      message: {
        topic: 'healApp',
        notification: {
          body: 'This is a Firebase Cloud Messaging Topic Message!',
          title: 'FCM Message',
        },
      },
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('FCM Message sent successfully:', result);
    } catch (error) {
      console.error('Error sending FCM Message:', error);
    }
  };

  useEffect(() => {
    getSummaryofDay();
  }, []);

  const getSummaryofDay = async () => {
    let currentdate = new Date();
    let dateMDY = `${currentdate.getFullYear()}-${currentdate.getMonth() + 1
      }-${currentdate.getDate()}`;

    let daySummary = await getProviderDaySummary(
      {
        provider_id: userId,
        created_date_time: dateMDY,
      },
      token,
    );
    console.log('daySummary123', daySummary);

    setProviderDaySummary(daySummary);
  };

  const getProviderServices = async () => {
    let response = await onGetProviderService(
      {
        provider_id: providerProfile?.provider?.id,
        specialty_id: providerProfile?.speciality?.id,
      },
      token,
    );
    console.log('newSevices', response);
    if (response && response.services) {
      setServicesFromAPi(response.services);
      Sentry.captureMessage(
        `Provider flow GET ALL RELATED SERVICES onGetProviderService(API) for:-${providerProfile?.firstName ?? ''
        }---- ${response.services}`,
      );
    }
  };

  const manuallUpadteLocaion = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        // Alert.alert('WatchPostion');
        // setProviderLocation({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        //   latitudeDelta: 0.02,
        //   longitudeDelta: 0.02,
        //   timestamp: position.timestamp
        // })
        // Call the function to send the FCM message
        // sendFCMMessage();
        Sentry.captureMessage(
          `Provider notification event watchPosition check for:-${providerProfile?.firstName}---- `,
        );

        UpdateProviderLocation({
          provider_id: userId,
          order_id: order?.orderId ?? '1',
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }).then((res) => {
          Sentry.captureMessage(
            `Provider notification event 'update location api response' for:-${providerProfile?.firstName}---- ${res}`,
          );
          console.log('gurepeet', res);

        });
      },
      (error) => {
        Sentry.captureMessage(
          `Provider notification event 'update location api error' for:-${providerProfile?.firstName}---- ${error.message}`,
        );
        console.log('Error getting location: ' + error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 4, // Minimum distance (in meters) to trigger an update
        showLocationDialog: true, // Show a dialog if location services are not enabled
        forceRequestLocation: true, // Force a location request, even if permissions are not granted
        forceLocationManager: false, // Use the LocationManager on Android, even if Google Play Services are available
      },
    );
  }

  const updateArrivedStatusDynamical = () => {

    Geolocation.watchPosition(
      (position) => {

        Sentry.captureMessage(
          `Provider notification event watchPosition check for:-${providerProfile?.firstName}---- `,
        );

        UpdateProviderLocation({
          provider_id: userId,
          order_id: order?.orderId ?? '1',
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }).then((res) => {
          Sentry.captureMessage(
            `Provider notification event 'update location api response' for:-${providerProfile?.firstName}---- ${res}`,
          );
          console.log('gurepeet', res);

        });
      },
      (error) => {
        Sentry.captureMessage(
          `Provider notification event 'update location api error' for:-${providerProfile?.firstName}---- ${error.message}`,
        );
        console.log('Error getting location: ' + error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 4, // Minimum distance (in meters) to trigger an update
        interval: 1000, // Minimum time interval (in milliseconds) to trigger an update
        fastestInterval: 500, // Maximum time interval (in milliseconds) between updates
        showLocationDialog: true, // Show a dialog if location services are not enabled
        forceRequestLocation: true, // Force a location request, even if permissions are not granted
        forceLocationManager: false, // Use the LocationManager on Android, even if Google Play Services are available
        showsBackgroundLocationIndicator: true,
      },
    );
  }
  const updateLocation = (mannualUpdate?: boolean) => {
    if (mannualUpdate) {
      manuallUpadteLocaion()
    } else {
      updateArrivedStatusDynamical
    }
  };
  console.log('order?.eventData?.providerId', userId);
  console.log('order?.eventData?.orderId', order);
  const OnPressTakeOrder = () => {
    // Geolocation.watchPosition(
    //     (position) => {
    setAcceptOrder(true);
    OrderRequst({
      orderStatus: 'accept',
      provider_id: userId,
      order_id: order?.orderId ?? '1',
      latitude: userLocation.currentLocation?.latitude ?? '',
      longitude: userLocation.currentLocation?.longitude ?? '',
    })
      .then((res) => {
        console.log('ordereAcceptedRes', res);
        if (!res?.message) {
          Sentry.captureMessage(
            `Provider notification event 'order accept response' for:-${providerProfile?.firstName}---- ${res}`,
          );
          setAcceptOrder(true);

          setLocalData('PROVIDERORDER', {
            extraData: {
              orderAccepted: true,
            },
          });
        } else {
          Sentry.captureMessage(
            `Provider notification event 'order accept response failed' for:-${providerProfile?.firstName}---- ${res}`,
          );
        }

        // Alert.alert('ordereAccepted' + res?.status);
      })
      .catch((error) => {
        Sentry.captureMessage(
          `Provider notification event orderRequest api error for:-${providerProfile?.firstName}---- ${error}`,
        );
        Alert.alert('Some error is occur', error);
      });
    //  }, );
  };
  // const onLogoutButtonPress = () => {
  //   deleteLocalData();
  //   setProviderProfile({} as ProviderProfile);
  //   navigation.navigate(NavigationRoutes.IntroStack);
  //   onPressToggle()
  // };
  //  const ProviderAvailability=()=>{
  //   providerAvailabilityStatus( {provider_id:order?.eventData?.providerId})
  //  }

  const onPressProfileTab = (title: string) => {
    console.log('title', title);
    setShowSidebar(false);
    navigation.navigate(NavigationRoutes.ProviderProfile, {
      screen: title,
    });
  };

  return {
    OnPressTakeOrder,
    acceptOrder,
    updateLocation,
    setAcceptOrder,
    navigation,
    TreatementEnded,
    providerDaySummary,
    getSummaryofDay,
    setProviderProfile,
    servicesFromApi,
    getProviderServices,
    onPressProfileTab,
    showSidebar,
    setShowSidebar,
  };
};

export default HomeScreenControlller;
