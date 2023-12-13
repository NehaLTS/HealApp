import messaging from '@react-native-firebase/messaging';
import { sentryTraceGesture } from '@sentry/react-native';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { DeviceEventEmitter } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';

const requestPermission = async () => {
  try {
    await messaging().requestPermission();
    getToken();
  } catch (error) {
    console.log('Permission rejected');
  }
};
const { providerProfile } = UseProviderUserContext();

const getToken = async () => {
  let fcmToken = await getLocalData('USER')?.deviceToken;

  if (!fcmToken) {
    fcmToken = await messaging().getToken();

    console.log('fcmToken is ', fcmToken);
    if (fcmToken) {
      console.log('tokenDecice', fcmToken);
      await setLocalData('USER', { deviceToken: fcmToken });
    }
  }
};
export const checkPermission = async () => {
  console.log('permission is ');
  const enabled = await messaging().hasPermission();

  console.log('permission is ', enabled);
  if (enabled) {
    getToken();
  } else {
    requestPermission();
  }
};

export const createNotificationListeners = () => {
  // Handle incoming messages in the foreground
  const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
    const { notification } = remoteMessage;
    Sentry.captureMessage(
      `first notification ---- ${JSON.stringify(remoteMessage)}`,
    );
    if (notification?.title === "Provider Notification") {
      DeviceEventEmitter.emit('ProviderOrderListener', remoteMessage);
      console.log("ProviderOrderListener")
    } else if (notification?.title === "Client Notification") {
      console.log("ClientORder")
      DeviceEventEmitter.emit('ClientOrderListener', remoteMessage);
    } else {

      DeviceEventEmitter.emit('ProviderOrderListener', remoteMessage);
      DeviceEventEmitter.emit('ClientOrderListener', remoteMessage);
    }




    console.log('messagesOnMessageremoteMessage', remoteMessage);
    // showAlert(notification.title, notification.body);
  });
  messaging()
    .subscribeToTopic('weather')
    .then(() => console.log('Subscribed to topic!'));
  // Handle notification when app is in the background
  const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
    (remoteMessage) => {
      console.log('messagesOnMessageTextDatat', remoteMessage);
      Sentry.captureMessage(
        `second notification ---- ${JSON.stringify(remoteMessage)}`,
      );
      //GURPREET TO ADD NOTIFICATION CAPTURE MESSAGE
      if (remoteMessage.notification?.title === "Provider Notification") {
        DeviceEventEmitter.emit('ProviderOrderListener', remoteMessage);
      } else if (remoteMessage.notification?.title === "Client Notification") {
        DeviceEventEmitter.emit('ClientOrderListener', remoteMessage);
      } else {
        DeviceEventEmitter.emit('ProviderOrderListener', remoteMessage);
        DeviceEventEmitter.emit('ClientOrderListener', remoteMessage);
      }

    },
  );

  // Handle notification when app is in the closed state
  const unsubscribeOnInitialNotification = messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        const { notification } = remoteMessage;

        //GURPREET TO ADD NOTIFICATION CAPTURE MESSAGE

        Sentry.captureMessage(
          `third notification ---- ${JSON.stringify(remoteMessage)}`,
        );

        // showAlert(notification.title, notification.body);
      }
    });

  return () => {
    // Unsubscribe from the event listeners when the component unmounts
    unsubscribeOnMessage();
    unsubscribeOnNotificationOpened();
    unsubscribeOnInitialNotification;
  };
};
