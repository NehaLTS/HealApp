import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { lazy } from 'react';
import NavigationRoutes from './NavigationRoutes';
const Stack = createNativeStackNavigator();

const ClientStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NavigationRoutes.ClientLogin}>
      <Stack.Screen
        name={NavigationRoutes.ClientLogin}
        component={lazy(() => import("../screens/authenticator/AuthenticatorView"))}
      />
      <Stack.Screen
        name={NavigationRoutes.ClientHome}
        component={lazy(() => import("../components/client/home/HomeView"))}
      />
    </Stack.Navigator>
  )
}

export default ClientStackNavigator
