import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { lazy, useState } from 'react';
import NavigationRoutes from './NavigationRoutes';
// import { ClientUserContext, onboardStep } from 'contexts/UseClientUserContext';
import { defaultHeaderStyle } from 'components/common/Header';
import OrderDetails from '../screens/client/OrderDetails';
import HomeScreen from '../screens/client/HomeScreen';

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
        options={{ headerShown: false }}
        name={NavigationRoutes.ClientHome}
        component={HomeScreen}
        // component={lazy(() => import('..//screens/client/HomeScreen'))}
      />
      {/* /> */}
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
      <Stack.Screen
        name={NavigationRoutes.SearchDoctor}
        options={defaultHeaderStyle}
        component={lazy(() => import('../screens/client/SearchDoctor'))}
      />
      <Stack.Screen
        name={NavigationRoutes.TreatmentCompleted}
        options={{ headerShown: false }}
        component={lazy(
          () => import('../screens/client/TreatmentCompletedScreen'),
        )}
      />
      <Stack.Screen
        name={NavigationRoutes.HealerHome}
        options={{ headerShown: false }}
        component={lazy(() => import('../screens/client/HealerHomeView'))}
      />
    </Stack.Navigator>
  );
};

export default ClientStackNavigator;
