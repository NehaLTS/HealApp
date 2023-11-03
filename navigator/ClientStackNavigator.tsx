import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { lazy,useState } from "react";
import NavigationRoutes from "./NavigationRoutes";
import { ClientUserContext, onboardStep } from "contexts/UseClientUserContext";
import { defaultHeaderStyle } from "components/common/Header";

const Stack = createNativeStackNavigator();

const ClientStackNavigator = () => {

  return (
      <Stack.Navigator initialRouteName={NavigationRoutes.ClientHome}>
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
          component={lazy(() => import("..//screens/client/HomeScreen"))}
        />
        <Stack.Screen
          name={NavigationRoutes.OnboardDetails}
          options={defaultHeaderStyle}
          component={lazy(
            () =>
              import("../screens/client/OnboardDetails")
          )}
        />
        <Stack.Screen
          name={NavigationRoutes.OrderDetails}
          options={defaultHeaderStyle}
          component={lazy(
            () =>
              import("../screens/client/OrderDetails")
          )}
        />
           <Stack.Screen
          name={NavigationRoutes.SearchDoctor}
          options={defaultHeaderStyle}
          component={lazy(
            () =>
              import("../screens/client/SearchDoctor")
          )}
        />
      </Stack.Navigator>
  
  );
};

export default ClientStackNavigator;
