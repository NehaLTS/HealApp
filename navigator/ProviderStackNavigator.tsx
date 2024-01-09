import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import { UserContextProvider } from 'contexts/useUserContextProvider';
import NavigationRoutes from './NavigationRoutes';
import { getHeight } from 'libs/StyleHelper';
import { colors } from 'designToken/colors';
import { defaultHeaderStyle } from 'components/common/Header';

const Stack = createNativeStackNavigator();

type ComponentType = React.ComponentType<any> | null;

interface Components {
  ProviderAuthenticatorView: ComponentType;
  OnboardDetails: ComponentType;
  HomeScreen: ComponentType;
  ProviderProfile: ComponentType;
}
const LoadingView = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
    }}
  >
    <Text style={{ fontSize: getHeight(20), textAlign: 'center' }}>
      {" Please wait,\nwe're getting everything ready for you..."}
    </Text>
  </View>
);

const ProviderStackNavigator = () => {
  const [userDataProvider, setUserDataProvider] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [components, setComponents] = useState<Components>({
    ProviderAuthenticatorView: null,
    OnboardDetails: null,
    HomeScreen: null,
    ProviderProfile: null,
  });

  useEffect(() => {
    Promise.all([
      import('../screens/authenticator/ProviderAuthenticatorView'),
      import('../screens/provider/OnboardDetails'),
      import('../screens/provider/HomeScreen'),
      import('../screens/profile/ProviderProfile'),
    ]).then((modules) => {
      setComponents({
        ProviderAuthenticatorView: modules[0].default,
        OnboardDetails: modules[1].default,
        HomeScreen: modules[2].default,
        ProviderProfile: modules[3].default,
      });
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <LoadingView />;
  }

  const {
    ProviderAuthenticatorView,
    OnboardDetails,
    HomeScreen,
    ProviderProfile,
  } = components;

  return (
    <UserContextProvider.Provider
      value={{ userDataProvider, setUserDataProvider }}
    >
      <Stack.Navigator initialRouteName={NavigationRoutes.ProviderLogin}>
        <Stack.Screen
          name={NavigationRoutes.ProviderLogin}
          component={ProviderAuthenticatorView!}
          options={defaultHeaderStyle}
        />
        <Stack.Screen
          name={NavigationRoutes.ProviderOnboardDetails}
          options={defaultHeaderStyle}
          component={OnboardDetails!}
        />
        <Stack.Screen
          name={NavigationRoutes.ProviderHome}
          component={HomeScreen!}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={NavigationRoutes.ProviderProfile}
          component={ProviderProfile!}
        />
      </Stack.Navigator>
    </UserContextProvider.Provider>
  );
};

export default ProviderStackNavigator;
