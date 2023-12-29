/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { lazy, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TranslationContext } from './contexts/UseTranslationsContext';
import IntroStackNavigator from './navigator/IntroStackNavigator';
import NavigationRoutes from './navigator/NavigationRoutes';
import {
  ClientProfile,
  OrderDetail,
  ProviderProfile,
  ProviderServices,
  onboardStep,
  userLocation,
  RemaingTime,
} from 'libs/types/UserType';
import { ClientUserContext } from 'contexts/UseClientUserContext';
import { ProviderUserContext } from 'contexts/UseProviderUserContext';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import SplashScreen from 'react-native-splash-screen';
import * as Sentry from '@sentry/react-native';
import { Alert } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { useCurrentAddress } from 'libs/useCurrentAddress';
import { Platform } from 'react-native';
import { treatment } from 'libs/types/ProvierTypes';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
const App = () => {
  const [languageCode, setLanguageCode] = React.useState<string>('en');
  const [userProfile, setUserProfile] = useState<ClientProfile>(null);
  const [providerProfile, setProviderProfile] = useState<ProviderProfile>(null);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<onboardStep>('details');
  const [providerServices, setProviderServices] =
    useState<ProviderServices>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetail>(null);
  const [userLocation, setUserLocation] =
    useState<userLocation>(null);
  const [remainingTime, setRemainingTime] = useState<RemaingTime>(null);
  const [treatmentsMenu, setTreatmentsMenu] = useState<treatment>(null);
  const [walletAmount, setWalletAmount] = useState<string>('0')
  /** To Initialize Google SDk */
  GoogleSignin.configure({
    webClientId:
      '843919956986-js10nj0llot1b7r4ileqhkurco4tqo75.apps.googleusercontent.com',
  });

  Sentry.init({
    dsn: 'https://8145cfca103e5af396371f473add7b83@o4506268496560128.ingest.sentry.io/4506268523167744',
  });
  Geocoder.init('AIzaSyDwwnPwWC3jWCPDnwB7tA8yFiDgGjZLo9o');

  const getCurrentLocation = () => {
    Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation((prevState) => ({
          ...prevState,
          currentLocation: {
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          },
          onboardingLocation: prevState?.onboardingLocation
        }));
      },
      (error) => {
        console.log('Error getting location: ' + error.message);
      },
      {
        enableHighAccuracy: true,
      },
    );
  };
  const requestLocationPermission = async () => {
    try {
      const result = await check(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_ALWAYS,
      );

      console.log('permisison check platform ', result);
      if (result === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        const permissionResult = await request(
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            : PERMISSIONS.IOS.LOCATION_ALWAYS,
        );
        if (permissionResult === RESULTS.GRANTED) {
          getCurrentLocation();
        }
      }
    } catch (err) {
      console.log('Error checking location permission: ' + err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationContext.Provider value={{ languageCode, setLanguageCode }}>
        <ClientUserContext.Provider
          value={{
            currentStep,
            setCurrentStep,
            userId,
            setUserId,
            token,
            setToken,
            userProfile,
            setUserProfile,
            orderDetails,
            setOrderDetails,
            setUserLocation,
            userLocation,
            setRemainingTime,
            remainingTime,
            treatmentsMenu,
            setTreatmentsMenu,
            walletAmount,
            setWalletAmount

          }}
        >
          <ProviderUserContext.Provider
            value={{
              currentStep,
              setCurrentStep,
              userId,
              setUserId,
              token,
              setToken,
              providerProfile,
              setProviderProfile,
              providerServices,
              setProviderServices,
              setUserLocation,
              userLocation,
            }}
          >
            <NavigationContainer
              onReady={() => {
                SplashScreen.hide();
              }}
            >
              <Stack.Navigator
                initialRouteName={NavigationRoutes.IntroStack}
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen
                  name={NavigationRoutes.IntroStack}
                  component={IntroStackNavigator}
                />
                <Stack.Screen
                  name={NavigationRoutes.ClientStack}
                  component={lazy(
                    () => import('navigator/ClientStackNavigator'),
                  )}
                />
                <Stack.Screen
                  name={NavigationRoutes.ProviderStack}
                  component={lazy(
                    () => import('./navigator/ProviderStackNavigator'),
                  )}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ProviderUserContext.Provider>
        </ClientUserContext.Provider>
      </TranslationContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
