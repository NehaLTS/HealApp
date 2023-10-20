import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { defaultHeaderStyle } from 'components/common/Header';
import { UserContextProvider, UserTypeProvider } from 'contexts/useUserContextProvider';
import React, { lazy } from 'react';
import ProviderAuthenticatorView from '../screens/authenticator/ProviderAuthenticatorView';
import NavigationRoutes from './NavigationRoutes';
const Stack = createNativeStackNavigator();
const ProviderStackNavigator = () => {
  const [userDataProvider, setUserDataProvider] = React.useState<Partial<UserTypeProvider>>({});

  return (
    <UserContextProvider.Provider value={{ userDataProvider, setUserDataProvider }}>
      <Stack.Navigator initialRouteName={NavigationRoutes.ProviderLogin}>
        <Stack.Screen
          name={NavigationRoutes.ProviderLogin}
          component={ProviderAuthenticatorView}
          options={defaultHeaderStyle}
        />
        <Stack.Screen
          name={NavigationRoutes.ProviderRegistration}
          component={lazy(() => import("../components/provider/registration/views/BasicInformation"))}
          options={defaultHeaderStyle}
        />
        <Stack.Screen
          name={NavigationRoutes.ProviderHome}
          component={lazy(() => import("../components/provider/home/HomeView"))}
          options={defaultHeaderStyle}
        />
        <Stack.Screen
          name={NavigationRoutes.ProviderConfirmation}
          component={lazy(() => import("../components/provider/registration/views/ProviderConform"))}
        />
      </Stack.Navigator>
    </UserContextProvider.Provider>
  )
}

export default ProviderStackNavigator



