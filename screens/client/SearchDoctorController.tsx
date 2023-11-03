import { useNavigation } from "@react-navigation/native";
import { Banner } from "libs/types/ProvierTypes";
import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Keyboard, Linking } from "react-native";
import { providerList } from '../../libs/types/ProvierTypes'
import { home } from '../../strings/en.json'

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

  return {
    permissionHelper,
    forceAlert
  };
};

export default SearchDoctorController;
