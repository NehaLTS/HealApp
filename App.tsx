/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { lazy,useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { TranslationContext } from "./contexts/UseTranslationsContext";
import IntroStackNavigator from "./navigator/IntroStackNavigator";
import NavigationRoutes from "./navigator/NavigationRoutes";
import { ClientProfile } from "libs/types/UserType";
import { ClientUserContext, onboardStep } from "contexts/UseClientUserContext";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
const App = () => {
  const [languageCode, setLanguageCode] = React.useState<string>("en");
     const [userProfile, setUserProfile]=useState<ClientProfile>(null)
  const [userId, setUserId]=useState('')
  const [token, setToken]=useState<string>('')
   const [currentStep, setCurrentStep]=useState<onboardStep>('details')
  /** To Initialize Google SDk */
  GoogleSignin.configure({
    webClientId: "843919956986-js10nj0llot1b7r4ileqhkurco4tqo75.apps.googleusercontent.com",
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationContext.Provider value={{ languageCode, setLanguageCode }}>
         <ClientUserContext.Provider value={{currentStep, setCurrentStep,userId,setUserId,token,setToken,userProfile,setUserProfile}}>
        <NavigationContainer >
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
        </ClientUserContext.Provider>
      </TranslationContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
