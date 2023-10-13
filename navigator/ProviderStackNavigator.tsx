import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContextProvider, UserTypeProvider } from 'contexts/useUserContextProvider';
import React, { lazy } from 'react';
import NavigationRoutes from './NavigationRoutes';
const Stack = createNativeStackNavigator();
const ProviderStackNavigator = () => {
  const [userDataProvider, setUserDataProvider] = React.useState<Partial<UserTypeProvider>>({});

  return (
    <UserContextProvider.Provider value={{ userDataProvider, setUserDataProvider }}>
      <Stack.Navigator initialRouteName={NavigationRoutes.ProviderLogin}>
      {/* <Stack.Screen
          name={NavigationRoutes.ProviderLogin}
          component={lazy(() => import("../screens/authenticator/ProviderAuthenticatorView"))}

/>  */}
        <Stack.Screen
          name={NavigationRoutes.ProviderRegistration}
          component={lazy(() => import("../components/provider/registration/views/BasicInformation"))}
        />
        <Stack.Screen
          name={NavigationRoutes.ProviderHome}
          component={lazy(() => import("../components/provider/home/HomeView"))}
        />
        <Stack.Screen
          name={NavigationRoutes.ProviderRegistration}
          component={lazy(() => import("../components/provider/registration/views/BasicInformation"))}
        />
      </Stack.Navigator>
    </UserContextProvider.Provider>
  )
}

export default ProviderStackNavigator



