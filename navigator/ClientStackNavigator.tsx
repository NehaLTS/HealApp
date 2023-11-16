import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { lazy, useState } from 'react';
import NavigationRoutes from './NavigationRoutes';
// import { ClientUserContext, onboardStep } from 'contexts/UseClientUserContext';
import { defaultHeaderStyle } from 'components/common/Header';
import OrderDetails from '../screens/client/OrderDetails';

const Stack = createNativeStackNavigator();

const ClientStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={NavigationRoutes.ClientLogin}>
      <Stack.Screen
        options={defaultHeaderStyle}
        name={NavigationRoutes.ClientLogin}
        component={lazy(
          () => import('../screens/authenticator/ClientAuthenticatorView'),
        )}
      />
      <Stack.Screen
        options={defaultHeaderStyle}
        name={NavigationRoutes.ClientHome}
        component={lazy(() => import('..//screens/client/HomeScreen'))}
      />
      <Stack.Screen
        name={NavigationRoutes.OnboardDetails}
        options={defaultHeaderStyle}
        component={lazy(() => import('../screens/client/OnboardDetails'))}
      />
      <Stack.Screen
        name={NavigationRoutes.OrderDetails}
        options={defaultHeaderStyle}
        // component={lazy(() => import('../screens/client/OrderDetails'))}
        component={OrderDetails}
      />
    </Stack.Navigator>
  );
};

export default ClientStackNavigator;
