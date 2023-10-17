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
import SplashScreen from 'react-native-splash-screen'



const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
const App = () => {
  const [languageCode, setLanguageCode] = React.useState<string>("en");
  /** To Initialize Google SDk */
  GoogleSignin.configure({
    webClientId: "843919956986-js10nj0llot1b7r4ileqhkurco4tqo75.apps.googleusercontent.com",
  });
  const onNavigationReady = () => {
    setTimeout(() => {
      SplashScreen.hide() // NOTE: just hide the splash screen after navigation ready
    }, 200)
  }
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationContext.Provider value={{ languageCode, setLanguageCode }}>
        <NavigationContainer onReady={onNavigationReady} >
          <Stack.Navigator initialRouteName={NavigationRoutes.IntroStack} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationRoutes.IntroStack} component={IntroStackNavigator} />
            <Stack.Screen
              name={NavigationRoutes.ClientStack}
              component={lazy(
                () => import("navigator/ClientStackNavigator")
              )}
            />
            <Stack.Screen
              name={NavigationRoutes.ProviderStack}
              component={lazy(
                () => import("./navigator/ProviderStackNavigator")
              )}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TranslationContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
