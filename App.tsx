/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { lazy } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { TranslationContext } from "./contexts/UseTranslationsContext";
import IntroScreen from "./screens/intro/IntroScreen";
import OnboardView from './screens/onboarding/OnboadrView';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient()
const App = () => {
  const [languageCode, setLanguageCode] = React.useState<string>('en')
  /** To Initialize Google SDk */
  GoogleSignin.configure({
    webClientId: process.env.GOOGLE_WEBVIEW_CLIENT_ID,
  });
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationContext.Provider value={{ languageCode, setLanguageCode }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false, }}>
            {/* <Stack.Screen name="Intro" component={IntroScreen} /> */}
             <Stack.Screen name="Onboard" component={OnboardView} />
            {/* <Stack.Screen name="Login" component={lazy(() => import("./screens/authenticator/AuthenticatorView"))} /> */}
            {/* <Stack.Screen name="HomeView" component={lazy(() => import("./components/client/home/HomeView"))} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </TranslationContext.Provider>
    </QueryClientProvider >

  );
};

export default App;
