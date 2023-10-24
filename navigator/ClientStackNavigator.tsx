import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { lazy,useState } from "react";
import NavigationRoutes from "./NavigationRoutes";
import { ClientUserContext, onboardStep } from "contexts/UseClientUserContext";
import { defaultHeaderStyle } from "components/common/Header";
import { ClientProfile } from "libs/types/UserType";
const Stack = createNativeStackNavigator();

const ClientStackNavigator = () => {

   const [userProfile, setUserProfile]=useState<ClientProfile>(null)
  const [userId, setUserId]=useState('')
  const [token, setToken]=useState<string>('')
   const [currentStep, setCurrentStep]=useState<onboardStep>('details')
  return (
     <ClientUserContext.Provider value={{currentStep, setCurrentStep,userId,setUserId,token,setToken,userProfile,setUserProfile}}>
      <Stack.Navigator initialRouteName={NavigationRoutes.ClientLogin}>
        <Stack.Screen
          options={defaultHeaderStyle}
          name={NavigationRoutes.ClientLogin}
          component={lazy(
            () => import("../screens/authenticator/ClientAuthenticatorView")
          )}
        />
        <Stack.Screen
          options={defaultHeaderStyle}
          name={NavigationRoutes.ClientHome}
          component={lazy(() => import("../components/client/home/HomeView"))}
        />
        <Stack.Screen
          name={"OnboardDetails"}
          options={defaultHeaderStyle}
          component={lazy(
            () =>
              import("../screens/client/OnboardDetails")
          )}
        />
      </Stack.Navigator>
  </ClientUserContext.Provider>
  );
};

export default ClientStackNavigator;
