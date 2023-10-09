import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { lazy } from 'react';
import NavigationRoutes from './NavigationRoutes';
const Stack = createNativeStackNavigator();
const ProviderStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NavigationRoutes.ProviderLogin}>
      <Stack.Screen
        name={NavigationRoutes.ProviderLogin}
        component={lazy(() => import("../screens/authenticator/ProviderAuthenticatorView"))}
      />
      <Stack.Screen
        name={NavigationRoutes.ProviderHome}
        component={lazy(() => import("../components/provider/home/HomeView"))}
      />
    </Stack.Navigator>
  )
}

export default ProviderStackNavigator