import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { lazy } from "react";
import NavigationRoutes from "./NavigationRoutes";
import { UserContext, UserType } from "contexts/useUserContext";
import { getLocalData } from "libs/datastorage/useLocalStorage";
import { defaultHeaderStyle } from "components/common/Header";
import ClientAuthenticatorView from "../screens/authenticator/ClientAuthenticatorView";
const Stack = createNativeStackNavigator();

const ClientStackNavigator = () => {

  const [userData, setUserData] = React.useState<Partial<UserType>>({});
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Stack.Navigator initialRouteName={NavigationRoutes.ClientLogin}>
        <Stack.Screen
          options={defaultHeaderStyle}
          name={NavigationRoutes.ClientLogin}
          component={ClientAuthenticatorView}
        />
        <Stack.Screen
          options={defaultHeaderStyle}
          name={NavigationRoutes.ClientHome}
          component={lazy(() => import("../components/client/home/HomeView"))}
        />
        <Stack.Screen
          name={"BasicInfo"}
          options={defaultHeaderStyle}
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
