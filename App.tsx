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

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
const App = () => {
  const [languageCode, setLanguageCode] = React.useState<string>("en");
  /** To Initialize Google SDk */
  GoogleSignin.configure({
    webClientId: process.env.GOOGLE_WEBVIEW_CLIENT_ID,
  });
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationContext.Provider value={{ languageCode, setLanguageCode }}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName={NavigationRoutes.IntroStack}  screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NavigationRoutes.IntroStack} component={IntroStackNavigator} />
            <Stack.Screen
              name={NavigationRoutes.ClientStack}
              component={lazy(
                () => import("./navigator/ClientStackNavigator")
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
