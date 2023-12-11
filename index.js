/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';
import './i18n.tsx';
import fb from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
enableScreens(true);

const config = {
  appId: '1:843919956986:android:5e20e185d5b7459e8fe243',
  apiKey: 'AIzaSyBDCuh_lOpBak7wYMg5FtoHWhUCaWUDNPY',
  databaseURL: 'https://heal-app-ccd03.firebaseio.com',
  projectId: 'heal-app-ccd03',
  client_id: '110506724703725934792',
  messagingSenderId: '843919956986',
  storageBucket: 'heal-app-ccd03.appspot.com',
  authDomain: 'heal-app-ccd03.firebaseapp.com',
};

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  console.log('notification', pressAction);
  console.log('type', type);
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    // Update external API
    await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
      method: 'POST',
    });

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

// notifee.onBackgroundEvent(async ({ type, detail }) => {
//   const { notification, pressAction } = detail;

//   console.log('object', type, 'hello', detail);
//   if (type === EventType.ACTION_PRESS && pressAction.id === 'location') {
//     // Update external API
//     await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
//       method: 'POST',
//     });

//     // Create a trigger to keep the notification persistent
//     const trigger = notifee.triggerForegroundEvent(notification.id, {
//       // Define the condition to remove the trigger (e.g., when certain action happens)
//       condition: notifee.TriggerCondition.PAST_TRIGGER_DATE,
//     });

//     // Update the existing notification with the trigger
//     const updatedNotification = {
//       ...notification,
//       android: {
//         ...notification.android,
//         priority: notifee.AndroidNotificationPriority.HIGH,
//       },
//     };

//     await notifee.updateNotification(notification.id, updatedNotification);
//   }
// });

let app;
if (fb.apps.length === 0) {
  fb.initializeApp(config);
} else {
  fb.app();
}

// if (!fb.apps.length) {

//   console.log("init firebase ")
//   fb.initializeApp(config)
// }

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
