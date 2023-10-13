/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { lazy } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { TranslationContext } from "./contexts/UseTranslationsContext";
import IntroStackNavigator from "./navigator/IntroStackNavigator";
import NavigationRoutes from "./navigator/NavigationRoutes";
import { getLocalData } from "libs/datastorage/useLocalStorage";
import ClientStackNavigator from "navigator/ClientStackNavigator";
import { Platform } from 'react-native';
import { check, request, PERMISSIONS } from 'react-native-permissions';



const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
const App = () => {
  const [languageCode, setLanguageCode] = React.useState<string>("en");
  //TO Check Current Latlng 
  /** To Initialize Google SDk */
  GoogleSignin.configure({
    webClientId: "843919956986-js10nj0llot1b7r4ileqhkurco4tqo75.apps.googleusercontent.com",
  });

  // Check and request location permissions
  if (Platform.OS === 'android') {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        if (result === 'granted') {
          // You have permission
        } else {
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((requestResult) => {
            if (requestResult === 'granted') {
              // You now have permission
            }
          });
        }
      });
  }
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationContext.Provider value={{ languageCode, setLanguageCode }}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName={getLocalData('USER')?.token ? NavigationRoutes.ClientStack : NavigationRoutes.IntroStack} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationRoutes.IntroStack} component={IntroStackNavigator} />

            <Stack.Screen
              name={NavigationRoutes.ClientStack}
              // component={lazy(
              //   () => import("navigator/ClientStackNavigator")
              // )}
              component={ClientStackNavigator}
            />
            <Stack.Screen
              name={NavigationRoutes.ProviderStack}
              component={lazy(
                () => import("./navigator/ProviderStackNavigator")
              )}
            />
            <Stack.Screen
              name={'HomeView'}
              component={lazy(
                () => import("./components/client/home/HomeView")
              )}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TranslationContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
