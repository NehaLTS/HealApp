import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { Location } from 'libs/types/UserType';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { cleanSingle } from 'react-native-image-crop-picker';
import * as RNFS from 'react-native-fs';
const HomeScreenControlller = () => {
  const order = getLocalData('ORDER');
  const [acceptOrder, setAcceptOrder] = useState(order?.orderAccepted ?? false);
  const { userId } = UseProviderUserContext();
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

  const { OrderRequst, UpdateProviderLocation, providerAvailabilityStatus } =
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

    Geolocation.watchPosition(
      (position) => {
        Alert.alert('WatchPostion');
        // setProviderLocation({
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        //   latitudeDelta: 0.02,
        //   longitudeDelta: 0.02,
        //   timestamp: position.timestamp
        // })
        // Call the function to send the FCM message
        // sendFCMMessage();
        UpdateProviderLocation({
          provider_id: userId,
          order_id: order?.eventData?.orderId,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }).then((res) => {
          Alert.alert(
            'dataUpdate after getihng response' + JSON.stringify(res),
          );
        }); // setLocation({ latitude, longitude });
      },
      (error) => {
        console.log('Error getting location: ' + error.message);
      },
      {
        enableHighAccuracy: true,
      },
    );
  };
  console.log('order?.eventData?.providerId', order?.eventData?.providerId);
  console.log('order?.eventData?.orderId', order);
  const OnPressTakeOrder = () => {
    // Geolocation.watchPosition(
    //     (position) => {
    OrderRequst({
      status: 'accept',
      provider_id: order?.eventData?.providerId,
      order_id: order?.eventData?.orderId,
      latitude: currentLocationOfUser?.latitude?.toString() ?? '',
      longitude: currentLocationOfUser?.longitude?.toString() ?? '',
    })
      .then((res) => {
        console.log('ordereAcceptedRes', res);
        if (!res?.message) {
          setAcceptOrder(true);
          setLocalData('ORDER', {
            orderAccepted: true,
          });
        }
        Alert.alert('ordereAccepted' + res?.status);
      })
      .catch((error) => {
        Alert.alert('Some error is occur', error);
      });
    //  }, );
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
    // ProviderAvailability
  };
};

export default HomeScreenControlller;
