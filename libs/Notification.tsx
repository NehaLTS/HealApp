import messaging from '@react-native-firebase/messaging';
import { getLocalData, setLocalData } from 'libs/datastorage/useLocalStorage';
import { DeviceEventEmitter } from 'react-native';

const requestPermission = async () => {
  try {
    await messaging().requestPermission();
    getToken();
  } catch (error) {
    console.log('Permission rejected');
  }
};

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
    console.log('messagesOnMessageTextDatat', remoteMessage.data);

    DeviceEventEmitter.emit('DoctorNotification', remoteMessage.data);
    console.log('messagesOnMessageremoteMessage', remoteMessage);
    // showAlert(notification.title, notification.body);
  });

  // Handle notification when app is in the background
  const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
    (remoteMessage) => {
      console.log('messagesOnMessageTextDatat', remoteMessage);
      DeviceEventEmitter.emit('DoctorNotification', remoteMessage.data);
    },
  );

  // Handle notification when app is in the closed state
  const unsubscribeOnInitialNotification = messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        const { notification } = remoteMessage;
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
