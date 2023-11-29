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
  currentLocationOfUser,
  RemaingTime
} from 'libs/types/UserType';
import { ClientUserContext } from 'contexts/UseClientUserContext';
import { ProviderUserContext } from 'contexts/UseProviderUserContext';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import SplashScreen from 'react-native-splash-screen';
import * as Sentry from '@sentry/react-native';
import { Alert } from 'react-native';
import Geocoder from 'react-native-geocoding';


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
  const [currentLocationOfUser, setCurrentLocationOfUser]= useState<currentLocationOfUser>(null);
  const [permissonGrant, setPermissonGrant]=useState(false)
  const [ providerStatus,setProviderStatus] = useState<string>('Estimated arrival');
  const [remainingTime, setRemainingTime]=useState<RemaingTime>(null)
 
  /** To Initialize Google SDk */
  GoogleSignin.configure({
    webClientId:
      '843919956986-js10nj0llot1b7r4ileqhkurco4tqo75.apps.googleusercontent.com',
  });

  Sentry.init({
    dsn: 'https://5bf4a6ef5ed5d3ff62d62d7de134f8d6@o4506076220817408.ingest.sentry.io/4506076223242240',
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    // tracesSampleRate: 1.0,
  });
  Geocoder.init('AIzaSyDwwnPwWC3jWCPDnwB7tA8yFiDgGjZLo9o')
  
  const getCurrentLocation=()=>{
    Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocationOfUser({latitude:latitude.toString() , longitude:longitude.toString()})
      },
      (error) => {
        console.log('Error getting location: ' + error.message);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }
  const requestLocationPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        getCurrentLocation()
      } else {
        const permissionResult = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        if (permissionResult === RESULTS.GRANTED) {
          getCurrentLocation()
        }
      }
    } catch (err) {
      console.log('Error checking location permission: ' + err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, [permissonGrant]);

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
            setCurrentLocationOfUser,
            currentLocationOfUser,
            setProviderStatus,
            providerStatus,
            setRemainingTime,
            remainingTime
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
