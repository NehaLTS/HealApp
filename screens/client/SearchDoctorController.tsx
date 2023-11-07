import { useNavigation } from "@react-navigation/native";
import { Banner } from "libs/types/ProvierTypes";
import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, DeviceEventEmitter, Keyboard, Linking } from "react-native";
import { providerList } from '../../libs/types/ProvierTypes'
import { home } from '../../strings/en.json'
import messaging from '@react-native-firebase/messaging'
import { getLocalData, setLocalData } from "libs/datastorage/useLocalStorage";

const SearchDoctorController = () => {
  const permissionHelper = {
    title: 'Location Permission',
    message: 'This app requires access to your location.',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  };
  
  // functions
const forceAlert = () => {
    Alert.alert(
     'Location access required',
      'Kindly allow location access in settings or turn on gps and restart app',
      [{text:'OK', onPress: () => Linking.openSettings()}],
      {cancelable: false},
    );
  };
  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  const getToken = async () => {
    let fcmToken = await getLocalData('USERPROFILE')?.deviceToken;
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log("tokenDecice",fcmToken )
        await setLocalData('USERPROFILE', {deviceToken:fcmToken});
      }
    }
  };

  const createNotificationListeners = () => {
    // Handle incoming messages in the foreground
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      const { notification } = remoteMessage;
      console.log('messagesOnMessageTextDatat', remoteMessage);
      DeviceEventEmitter.emit("DriverNotification",remoteMessage )
      console.log('messagesOnMessageremoteMessage', remoteMessage)
      // showAlert(notification.title, notification.body);
    });

    // Handle notification when app is in the background
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(remoteMessage => {
      const { notification } = remoteMessage;
      console.log('messagesOnMessageTextDatat', remoteMessage);
      DeviceEventEmitter.emit("DriverNotification",remoteMessage )
    });

    // Handle notification when app is in the closed state
    const unsubscribeOnInitialNotification = messaging()
      .getInitialNotification()
      .then(remoteMessage => {
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

  


  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      getToken();
    } catch (error) {
      console.log('Permission rejected');
    }
  };







  return {
    permissionHelper,
    forceAlert,
    checkPermission,
    createNotificationListeners
  };
};

export default SearchDoctorController;
