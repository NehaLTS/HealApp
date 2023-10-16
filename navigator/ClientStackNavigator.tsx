import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { lazy } from "react";
import NavigationRoutes from "./NavigationRoutes";
import { UserContext, UserType } from "contexts/useUserContext";
import HomeView from "components/client/home/HomeView";
import { getLocalData } from "libs/datastorage/useLocalStorage";
const Stack = createNativeStackNavigator();

const ClientStackNavigator = () => {
  const [userData, setUserData] = React.useState<Partial<UserType>>({});
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Stack.Navigator initialRouteName={getLocalData('USER')?.token ? NavigationRoutes.ClientHome : NavigationRoutes.ClientLogin}>
        <Stack.Screen
          name={NavigationRoutes.ClientLogin}
          component={lazy(
            () => import("../screens/authenticator/ClientAuthenticatorView")
          )}
        />
        <Stack.Screen
          name={NavigationRoutes.ClientHome}
          component={lazy(() => import("../components/client/home/HomeView"))}
        />
        <Stack.Screen
          name={"BasicInfo"}
          component={lazy(
            () =>
              import("../components/client/registration/views/BasicInformation")
          )}
        />
      </Stack.Navigator>
    </UserContext.Provider>
  );
};

export default ClientStackNavigator;
