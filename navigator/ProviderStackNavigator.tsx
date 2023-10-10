import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContextProvider, UserTypeProvider } from 'contexts/useUserContextProvider';
import React, { lazy } from 'react';
import NavigationRoutes from './NavigationRoutes';
const Stack = createNativeStackNavigator();
const ProviderStackNavigator = () => {
  const [userDataProvider, setUserDataProvider] = React.useState<Partial<UserTypeProvider>>({});

  return (
<<<<<<< HEAD
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
=======
    <UserContextProvider.Provider value={{ userDataProvider, setUserDataProvider }}>
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
    </UserContextProvider.Provider>
>>>>>>> 0039df2dce422dab31fa8c3206da02b6e8164402
  )
}

export default ProviderStackNavigator