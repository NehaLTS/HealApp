/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { lazy, useEffect } from "react";
import IntroScreen from "./screens/intro/IntroScreen";
import { TranslationContext } from "./contexts/UseTranslationsContext";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEBVIEW_CLIENT_ID } from "./libs/Utils";
import { QueryClient, QueryClientProvider } from 'react-query';
const Stack = createNativeStackNavigator();
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

const queryClient = new QueryClient()
const App = () => {
  const [languageCode, setLanguageCode] = React.useState<string>('en')

/** To Initialize Google SDk */
  GoogleSignin.configure({
    webClientId: GOOGLE_WEBVIEW_CLIENT_ID,
  });
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationContext.Provider value={{ languageCode, setLanguageCode }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false, }}>
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="SignIn" component={lazy(() => import("./component/client/login/LoginView"))} />
            <Stack.Screen name="HomeView" component={lazy(() => import("./component/client/home/HomeView"))} />

          </Stack.Navigator>
        </NavigationContainer>
      </TranslationContext.Provider>
    </QueryClientProvider >

  );
};

export default App;
