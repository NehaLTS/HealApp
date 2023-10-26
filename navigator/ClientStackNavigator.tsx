import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { lazy,useState } from "react";
import NavigationRoutes from "./NavigationRoutes";
import { defaultHeaderStyle } from "components/common/Header";

const Stack = createNativeStackNavigator();

const ClientStackNavigator = () => {

  return (
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
          name={NavigationRoutes.OnboardDetails}
          options={defaultHeaderStyle}
          component={lazy(
            () =>
              import("../screens/client/OnboardDetails")
          )}
        />
      </Stack.Navigator>
  
  );
};

export default ClientStackNavigator;
