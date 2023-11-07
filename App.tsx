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
  ProviderProfile,
  ProviderServices,
  onboardStep,
} from 'libs/types/UserType';
import { ClientUserContext, OrderDetail } from 'contexts/UseClientUserContext';
import { ProviderUserContext } from 'contexts/UseProviderUserContext';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { StatusBar } from 'react-native';
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
  /** To Initialize Google SDk */
  GoogleSignin.configure({
    webClientId:
      '843919956986-js10nj0llot1b7r4ileqhkurco4tqo75.apps.googleusercontent.com',
  });

  const requestLocationPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        console.log('permissionResult', result);

        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // setLocation({ latitude, longitude });
          },
          (error) => {
            console.log('Error getting location: ' + error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      } else {
        const permissionResult = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        if (permissionResult === RESULTS.GRANTED) {
          console.log('permissionResult', permissionResult);
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
      <StatusBar barStyle="dark-content" hidden={true} translucent={true} />
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
            <NavigationContainer>
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
