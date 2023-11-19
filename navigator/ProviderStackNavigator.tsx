import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { defaultHeaderStyle } from 'components/common/Header';
import React, { lazy } from 'react';
import NavigationRoutes from './NavigationRoutes';
const Stack = createNativeStackNavigator();
const ProviderStackNavigator = () => {

  return (

      <Stack.Navigator initialRouteName={NavigationRoutes.ProviderLogin}>
        <Stack.Screen
          name={NavigationRoutes.ProviderLogin}
          component={lazy(
            () => import('../screens/authenticator/ProviderAuthenticatorView'),
          )}
          options={defaultHeaderStyle}
        />
        {/* <Stack.Screen
          name={NavigationRoutes.ProviderRegistration}
          component={lazy(() => import("../components/provider/registration/views/BasicInformation"))}
          options={defaultHeaderStyle}
        /> */}

        <Stack.Screen
          name={NavigationRoutes.ProviderOnboardDetails}
          options={defaultHeaderStyle}
          component={lazy(() => import('../screens/provider/OnboardDetails'))}
        />

        <Stack.Screen
          name={NavigationRoutes.ProviderHome}
          component={lazy(() => import('../components/provider/home/HomeView'))}
          options={defaultHeaderStyle}
        />
        <Stack.Screen
          name={NavigationRoutes.ProviderConfirmation}
          component={lazy(
            () =>
              import(
                '../components/provider/registration/views/ProviderConfirmation'
              ),
          )}
        />
      </Stack.Navigator>
   
  );
};

export default ProviderStackNavigator;
