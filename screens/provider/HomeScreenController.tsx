import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import {
  deleteLocalData,
  getLocalData,
  setLocalData,
} from 'libs/datastorage/useLocalStorage';
import { Location } from 'libs/types/UserType';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { cleanSingle } from 'react-native-image-crop-picker';
import * as Sentry from '@sentry/react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationRoutes from 'navigator/NavigationRoutes';

const HomeScreenControlller = () => {
  const order = getLocalData('PROVIDERORDER');
  const navigation = useNavigation();

  const [acceptOrder, setAcceptOrder] = useState(order?.extraData?.orderAccepted ?? false);
  const { userId, providerProfile } = UseProviderUserContext();
  const { currentLocationOfUser } = UseClientUserContext();
  const token = getLocalData('USER')?.deviceToken;
  const [authToken, setAuthToken] = useState(null);
  const [providerLocation, setProviderLocation] = useState<Location>({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
    timestamp: 0,
  });

  const { OrderRequst, UpdateProviderLocation, providerAvailabilityStatus, TreatementEnded, } =
    AuthServicesProvider();

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

  const updateLocation = () => {
    console.log('updateDtaaApiFunction');

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
        setTimeout(() => {


          UpdateProviderLocation({
            provider_id: userId,
            order_id: order?.orderId ?? '1',
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }).then((res) => {
            Sentry.captureMessage(
              `Provider notification event 'update location api response' for:-${providerProfile?.firstName}---- ${res}`,
            );
            Alert.alert('Api update Location hit');
            console.log('gurepeet', res);
            // Alert.alert(
            //   'dataUpdate after getihng response' + JSON.stringify(res),
            // );
          });
        }, 5000); // setLocation({ latitude, longitude });
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

  };
  console.log('order?.eventData?.providerId', userId);
  console.log('order?.eventData?.orderId', order);
  const OnPressTakeOrder = () => {
    // Geolocation.watchPosition(
    //     (position) => {
    setAcceptOrder(true);
    OrderRequst({
      status: 'accept',
      provider_id: userId,
      order_id: order?.orderId ?? '1',
      latitude: currentLocationOfUser?.latitude?.toString() ?? '',
      longitude: currentLocationOfUser?.longitude?.toString() ?? '',
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
              orderAccepted: true
            }
          })
        } else {
          Sentry.captureMessage(
            `Provider notification event 'order accept response failed' for:-${providerProfile?.firstName}---- ${res}`,
          );
        }

        Alert.alert('ordereAccepted' + res?.status);
      })
      .catch((error) => {
        Sentry.captureMessage(
          `Provider notification event orderRequest api error for:-${providerProfile?.firstName}---- ${error}`,
        );
        Alert.alert('Some error is occur', error);
      });
    //  }, );
  };
  const onLogoutButtonPress = () => {
    deleteLocalData();
    navigation.navigate(NavigationRoutes.IntroStack);
  };
  //  const ProviderAvailability=()=>{
  //   providerAvailabilityStatus( {provider_id:order?.eventData?.providerId})
  //  }
  return {
    OnPressTakeOrder,
    acceptOrder,
    updateLocation,
    providerLocation,
    setAcceptOrder,
    onLogoutButtonPress,
    TreatementEnded
    // ProviderAvailability
  };
};

export default HomeScreenControlller;
