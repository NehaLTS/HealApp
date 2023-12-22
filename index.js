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
import { DeviceEventEmitter, Vibration, Platform } from 'react-native';

enableScreens(true)

const config = {
  appId: '1:843919956986:android:5e20e185d5b7459e8fe243',
  apiKey: 'AIzaSyBDCuh_lOpBak7wYMg5FtoHWhUCaWUDNPY',
  databaseURL: 'https://heal-app-ccd03.firebaseio.com',
  projectId: 'heal-app-ccd03',
  client_id: "110506724703725934792",
  messagingSenderId: '843919956986',
  storageBucket: 'heal-app-ccd03.appspot.com',
  authDomain: 'heal-app-ccd03.firebaseapp.com'
}


let app;
if (fb.apps.length === 0) {
  fb.initializeApp(config)
} else {
  fb.app()
}

// if (!fb.apps.length) {

//   console.log("init firebase ")
//   fb.initializeApp(config)
// }

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  const { notification } = remoteMessage;

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


});


AppRegistry.registerComponent(appName, () => App);
